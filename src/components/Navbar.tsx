"use client";

import React, { useState } from "react";
import {
  FaUserCircle,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import Link from "next/link";

interface NavbarProps {
  roles: string[];
}

const Navbar = ({ roles }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).id !== "lateral-menu") {
      setMenuOpen(false);
    }
  };

  return (
    <div className="flex fixed min-h-screen">
      <div
        className={`bg-black bg-opacity-50 fixed w-full top-0 left-0 h-full transition-transform duration-300 ease-in-out ${
          menuOpen ? "transform-none" : "-translate-x-full"
        } lg:translate-x-0 lg:w-52`}
        onClick={handleClick}
        id="menu-container"
      >
        <div
          className="flex bg-[var(--navbar-bg)] flex-col items-start w-52 h-full p-4"
          id="lateral-menu"
        >
          <nav className="space-y-4 mt-12">
            <ul>
              <li>
                <Link href="/dashboard" className="text-lg">
                  Inicio
                </Link>
              </li>
              {roles.includes("ROLE_ADMIN") && (
                <li>
                  <Link href="/dashboard/users" className="text-lg">
                    Users
                  </Link>
                </li>
              )}
              <li>
                <Link href="#" className="text-lg">
                  Settings
                </Link>
              </li>
              <li>
                <Link href="#" className="text-lg">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex-1">
        <section className="flex fixed flex-col items-center justify-center py-2 bg-[var(--navbar-bg)] w-full">
          <div className="flex justify-between w-full px-1 lg:justify-end">
            {menuOpen ? (
              <FaAngleDoubleLeft
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer text-3xl pl-2 lg:hidden"
              />
            ) : (
              <FaAngleDoubleRight
                onClick={() => setMenuOpen(true)}
                className="cursor-pointer text-3xl pl-2 lg:hidden"
              />
            )}
            <div className="flex items-center space-x-2">
              <div className="flex items-center mr-2">
                <FaUserCircle size={40} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
