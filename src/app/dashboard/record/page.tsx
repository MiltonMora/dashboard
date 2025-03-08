"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/storage/authStore";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { DecodedToken } from "@/app/dashboard/layout";
import { list, MedicalRecord } from "@/api/medicalRecordService";
import Toast from "@/components/Toast";
import Loading from "@/components/Loading";
import BasicCard from "@/components/BasicCard";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

type medicalRecords = MedicalRecord[];

const Index: React.FC = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: "negative" | "positive" | "information";
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState<medicalRecords>();
  const { token } = useAuthStore();

  const fetchData = async () => {
    setLoading(true);
    try {
      const medicalRecords = await list();
      setMedicalRecords(medicalRecords);
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
      if (!decoded.roles.includes("ROLE_DOCTOR") && !decoded.roles.includes("ROLE_SUPER_ADMIN")) {
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
      <BasicCard className="w-full">
        <p className="m-2 font-bold">Historias</p>
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-[var(--table-bg)] border border-[var(--border)] rounded-lg overflow-hidden">
            <thead>
              <tr className="font-bold bg-[var(--header-bg)]">
                <th className="px-6 py-3 border-b border-[var(--border)]">
                  Cliente
                </th>
                <th className="px-6 py-3 border-b border-[var(--border)]">
                  Doctor
                </th>
                <th className="px-6 py-3 border-b border-[var(--border)]">
                  Diagnostico
                </th>
                <th className="px-6 py-3 border-b border-[var(--border)]">
                  Tratamiento
                </th>
                <th className="px-6 py-3 border-b border-[var(--border)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {medicalRecords?.map((medicalRecord) => (
                <tr
                  key={medicalRecord.id}
                  className="text-center border-t-2 border-[var(--border)] hover:bg-[var(--hover)] transition-colors duration-300 ease-in-out"
                >
                  <td className="px-6 py-3">{`${medicalRecord.patient.name} ${medicalRecord.patient.surnames}`}</td>
                  <td className="px-6 py-3">{`${medicalRecord.doctor.name} ${medicalRecord.doctor.surnames}`}</td>
                  <td className="px-6 py-3">{medicalRecord.diagnosis}</td>
                  <td className="px-6 py-3">{medicalRecord.treatment}</td>
                  <td className="px-6 py-3">
                    <div className="flex justify-center gap-4">
                      <FaTrash
                        className="cursor-pointer"
                        onClick={() => console.log(medicalRecord)}
                      />
                      <FaPencilAlt
                        className="cursor-pointer"
                        onClick={() => console.log(medicalRecord)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BasicCard>
    </main>
  );
};

export default Index;
