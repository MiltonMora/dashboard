"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaUsersCog,
  FaHome,
  FaSignOutAlt,
  FaCog,
  FaFileMedicalAlt,
} from "react-icons/fa";
import Link from "next/link";

interface NavbarProps {
  roles: string[];
}

const Navbar = ({ roles }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleCloseMenu = () => {
    if (window.innerWidth < 1024) setMenuOpen(false);
  };

  return (
    <div className="flex">
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--contrast-bg)] shadow-md transition-transform duration-300 ease-in-out z-40 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-56 lg:border-r lg:border-[var(--border)]`}
      >
        <div className="flex flex-col h-full p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Menú</h2>
            <FaTimes
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer text-2xl lg:hidden"
            />
          </div>
          <nav className="mt-10 space-y-4">
            <ul>
              <NavItem
                href="/dashboard"
                icon={<FaHome />}
                text="Inicio"
                active={pathname === "/dashboard"}
                onClick={handleCloseMenu}
              />
              {roles.includes("ROLE_ADMIN") || roles.includes("ROLE_SUPER_ADMIN") && (
                <NavItem
                  href="/dashboard/users"
                  icon={<FaUsersCog />}
                  text="Usuarios"
                  active={pathname === "/dashboard/users"}
                  onClick={handleCloseMenu}
                />
              )}
              {roles.includes("ROLE_DOCTOR") || roles.includes("ROLE_SUPER_ADMIN") && (
                <NavItem
                  href="/dashboard/record"
                  icon={<FaFileMedicalAlt />}
                  text="Medical Recors"
                  active={pathname === "/dashboard/record"}
                  onClick={handleCloseMenu}
                />
              )}
              <NavItem
                href="#"
                icon={<FaCog />}
                text="Configuración"
                active={pathname === "/settings"}
                onClick={handleCloseMenu}
              />
              <NavItem
                href="/"
                icon={<FaSignOutAlt />}
                text="Cerrar sesión"
                active={false}
                onClick={handleCloseMenu}
              />
            </ul>
          </nav>
        </div>
      </aside>
      <header className="fixed w-full bg-[var(--contrast-bg)] border-b border-[var(--border)] shadow-sm z-30">
        <div className="flex items-center justify-between lg:justify-end px-4 py-3">
          <FaBars
            onClick={() => setMenuOpen(true)}
            className="cursor-pointer text-2xl lg:hidden"
          />
          <div className="flex items-center space-x-3">
            <FaUserCircle size={32} />
          </div>
        </div>
      </header>
    </div>
  );
};

const NavItem = ({
  href,
  icon,
  text,
  active,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 mb-1 text-lg font-medium p-2 rounded-md transition-all duration-300 ${
        active ? "bg-[var(--hover)]" : "hover:bg-[var(--hover)] hover:scale-105"
      }`}
    >
      {icon}
      {text}
    </Link>
  </li>
);

export default Navbar;
