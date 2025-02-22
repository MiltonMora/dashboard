"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/storage/authStore";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { DecodedToken } from "@/app/dashboard/layout";
import {
  list,
  UserFormData,
  User,
  userCreate,
  changeStatus,
} from "@/api/userService";
import Toast from "@/components/Toast";
import Loading from "@/components/Loading";
import FloatingButton from "@/components/FloatingButton";
import BasicCard from "@/components/BasicCard";
import Fixed from "@/components/Fixed";
import { FaTrash } from "react-icons/fa";
import ConfirmDialog from "@/components/ConfirmDialog";

type UserList = User[];

const Index: React.FC = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: "negative" | "positive" | "information";
  } | null>(null);
  const formReset = {
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  };
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState<UserList>();
  const [actualUser, setActualUser] = useState<User | null>();
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [formData, setFormData] = useState<UserFormData>(formReset);
  const { token } = useAuthStore();

  const fetchData = async () => {
    setLoading(true);
    try {
      const users = await list();
      setUsersData(users);
    } catch (error) {
      setToast({
        message: "Error al obtener los datos. " + error,
        type: "negative",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      redirect("/");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      if (!decoded.roles.includes("ROLE_ADMIN")) {
        redirect("/");
        return;
      }
    } catch (error) {
      redirect("/");
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.id === "fixed-element") {
      setOpenModal(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    if (!form.reportValidity()) {
      return;
    }
    setLoading(true);
    setToast(null);
    try {
      await userCreate(formData);
      fetchData();
      setToast({
        message: "Nuevo usuario creado correctamente",
        type: "positive",
      });
      setFormData(formReset);
      setOpenModal(false);
    } catch (error) {
      setToast({
        message: "Error al crear nuevo usuario. Intenta de nuevo." + error,
        type: "negative",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = (user:User) => {
    setActualUser(user);
    setOpenConfirm(true)
  }

  const handleDelete = async (id: string) => {
    setLoading(true);
    setToast(null);
    setOpenConfirm(false);
    try {
      await changeStatus(id);
      fetchData();
      setToast({
        message: "Usuario Eliminado correctamente",
        type: "positive",
      });
    } catch (error) {
      setToast({
        message: "Error al Eliminar el usuario. Intenta de nuevo." + error,
        type: "negative",
      });
    } finally {
      setActualUser(null);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setActualUser(null);
    setOpenConfirm(false);
  }

  return (
    <main className="flex flex-col w-full p-3">
      {openModal && openModal && (
        <Fixed onClick={handleClick}>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
          <BasicCard className="w-11/12 md:w-1/2 z-40">
            <form
              onSubmit={handleCreate}
              className="p-6 space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              <input
                placeholder="Name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border-b-2 bg-inherit"
                required
              />
              <input
                placeholder="Sur Name"
                type="text"
                value={formData.surname}
                onChange={(e) =>
                  setFormData({ ...formData, surname: e.target.value })
                }
                className="w-full px-4 py-2 border-b-2 bg-inherit"
                required
              />
              <input
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border-b-2 bg-inherit"
                required
              />
              <div className="relative flex items-center space-x-2">
                <input
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Password"
                  type="text"
                  className="w-full px-4 py-2 border-b-2 bg-inherit"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 rounded lg:col-span-2"
              >
                Create
              </button>
            </form>
          </BasicCard>
        </Fixed>
      )}
      {loading && <Loading />}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      { openConfirm && actualUser && <ConfirmDialog
        message={`Estas Seguro de Inactivar al usurio ${actualUser.name}`} 
        onConfirm={() => handleDelete(actualUser.id)}
        onCancel={handleCancel}
      />}
      <BasicCard className="w-full">
        <p className="m-2 font-bold">Users</p>
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-[var(--table-bg)] border border-[var(--border)]">
            <thead>
              <tr className="font-bold">
                <th className="px-4 py-2 border border-[var(--border)]">
                  Nombre
                </th>
                <th className="px-4 py-2 border border-[var(--border)]">
                  Email
                </th>
                <th className="px-4 py-2 border border-[var(--border)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData?.map((user) => (
                <tr
                  key={user.id}
                  className="text-center border border-[var(--border)] hover:bg-[var(--hover)]"
                >
                  <td className="px-4 py-2 border border-[var(--border)] truncate">{`${user.name} ${user.surNames}`}</td>
                  <td className="px-4 py-2 border border-[var(--border)] truncate">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border border-[var(--border)] truncate">
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => handleConfirm(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BasicCard>
      <FloatingButton onClick={() => setOpenModal(true)} />
    </main>
  );
};

export default Index;
