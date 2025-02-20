"use client"; // Asegura que el código se ejecute en el cliente

import React from "react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "@/components/Navbar";

interface DecodedToken {
  exp: number;
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

      setIsAuthenticated(true);
    } catch (error) {
      sessionStorage.removeItem("jwt");
      redirect("/");
    }
  }, []);

  if (!isAuthenticated) return null;

  return (
    <Navbar>
      <section className="flex justify-center m-auto lg:ml-64">{children}</section>
    </Navbar>
  );
};

export default DashboardLayout;
