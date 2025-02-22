"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/storage/authStore";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { DecodedToken } from "@/app/dashboard/layout";
import { list } from "@/api/userService";
import Toast from "@/components/Toast";
import Loading from "@/components/Loading";

interface User {
  id: string;
  name: string;
  surNames: string;
  email: string;
  roles: string[];
  isActive: boolean;
}

type UserList = User[];

const Index: React.FC = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: "negative" | "positive" | "information";
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState<UserList>();
  const { token } = useAuthStore();
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

    fetchData();
  }, []);

  return (
    <main className="flex flex-col w-full p-3">
      {loading && <Loading />}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="w-full mt-2 p-2 bg-[var(--contrast-bg)] mx-auto rounded-xl overflow-hidden border border-[var(--border)]">
      <p className="m-2 font-bold">Users</p>
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-[var(--table-bg)] border border-[var(--border)]">
            <thead>
              <tr className="font-bold">
                <th className="px-4 py-2 border border-[var(--border)]">Nombre</th>
                <th className="px-4 py-2 border border-[var(--border)]">Email</th>
              </tr>
            </thead>
            <tbody>
              {usersData?.map((row) => (
                <tr
                  key={row.id}
                  className="text-center border border-[var(--border)] hover:bg-[var(--hover)]"
                >
                  <td className="px-4 py-2 border border-[var(--border)] truncate">{`${row.name} ${row.surNames}`}</td>
                  <td className="px-4 py-2 border border-[var(--border)] truncate">{row.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Index;
