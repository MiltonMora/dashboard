"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/storage/authStore";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { DecodedToken } from "@/app/dashboard/layout";
import { list, User, changeStatus } from "@/api/userService";
import Toast from "@/components/Toast";
import Loading from "@/components/Loading";
import FloatingButton from "@/components/FloatingButton";
import BasicCard from "@/components/BasicCard";
import Fixed from "@/components/Fixed";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import ConfirmDialog from "@/components/ConfirmDialog";
import UserForm from "@/components/users/UserForm";

type UserList = User[];
type FormType = "Create" | "Edited" | false;

const Index: React.FC = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: "negative" | "positive" | "information";
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState<UserList>();
  const [filteredUsers, setFilteredUsers] = useState<UserList>();
  const [searchTerm, setSearchTerm] = useState("");
  const [actualUser, setActualUser] = useState<User | null>(null);
  const [openModal, setOpenModal] = useState<FormType>(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { token } = useAuthStore();

  const fetchData = async () => {
    setLoading(true);
    try {
      const users = await list();
      setUsersData(users);
      setFilteredUsers(users);
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
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      redirect("/");
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(usersData);
    } else {
      setFilteredUsers(
        usersData?.filter((user) =>
          `${user.name} ${user.surname}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, usersData]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.id === "fixed-element") {
      setOpenModal(false);
      setActualUser(null);
    }
  };

  const handleConfirm = (user: User) => {
    setActualUser(user);
    setOpenConfirm(true);
  };

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
  };

  return (
    <main className="flex flex-col w-full p-3">
      {openModal && (
        <Fixed onClick={handleClick}>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
          <BasicCard className="w-11/12 md:w-1/2 z-40">
            <UserForm
              mode={openModal}
              user={actualUser}
              setLoading={setLoading}
              setToast={setToast}
              fetchData={fetchData}
              setOpenModal={setOpenModal}
            />
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
      {openConfirm && actualUser && (
        <ConfirmDialog
          message={`Estas Seguro de Inactivar al usurio ${actualUser.name}`}
          onConfirm={() => handleDelete(actualUser.id)}
          onCancel={handleCancel}
        />
      )}

      <BasicCard className="w-full">
        <p className="m-2 font-bold">Users</p>
        <div className="overflow-x-auto p-4">
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="p-2 m-2 border-b-2 bg-inherit left-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="min-w-full bg-[var(--table-bg)] border border-[var(--border)] rounded-lg overflow-hidden">
            <thead>
              <tr className="font-bold bg-[var(--header-bg)]">
                <th className="px-6 py-3 border-b border-[var(--border)] text-left">
                  Nombre
                </th>
                <th className="px-6 py-3 border-b border-[var(--border)] text-left">
                  Email
                </th>
                <th className="px-6 py-3 border-b border-[var(--border)] text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr
                  key={user.id}
                  className="text-center border-t-2 border-[var(--border)] hover:bg-[var(--hover)] transition-colors duration-300 ease-in-out"
                >
                  <td className="px-6 py-3">{`${user.name} ${user.surname}`}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center gap-4">
                      <FaTrash
                        className="cursor-pointer"
                        onClick={() => handleConfirm(user)}
                      />
                      <FaPencilAlt
                        className="cursor-pointer"
                        onClick={() => {
                          setActualUser(user);
                          setOpenModal("Edited");
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BasicCard>
      <FloatingButton onClick={() => setOpenModal("Create")} />
    </main>
  );
};

export default Index;
