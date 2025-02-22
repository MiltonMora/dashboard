"use client"; // Asegura que el código se ejecute en el cliente

import React from "react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "@/components/Navbar";

export interface DecodedToken {
  exp: number;
  roles: string[];
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<DecodedToken>();

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");

    if (!token) {
      redirect("/");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        sessionStorage.removeItem("jwt");
        redirect("/");
        return;
      }

      setAuthData(decoded);
    } catch (error) {
      sessionStorage.removeItem("jwt");
      redirect("/");
    }
  }, []);

  if (!authData || Object.keys(authData).length === 0) return null;

  return (
    <main>
      <Navbar roles={authData.roles} />
      <section className="flex justify-center m-auto lg:ml-52 pt-12">{children}</section>
    </main>
  );
};

export default DashboardLayout;
