"use client";

import React, { useState } from "react";
import {
  FaUserCircle,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`bg-[var(--navbar-bg)] w-64 fixed top-0 left-0 h-full p-4 transition-transform duration-300 ease-in-out ${
          menuOpen ? "transform-none" : "-translate-x-full"
        } lg:translate-x-0 lg:w-52`}
      >
        <div className="flex flex-col items-center lg:items-start">
          <div className="mb-6">
            <FaUserCircle size={40} />
          </div>
          <nav className="space-y-4">
            <ul>
              <li>
                <a href="#" className="text-lg">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-lg">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="text-lg">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="text-lg">
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex-1">
        <section className="flex fixed flex-col items-center justify-center py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white w-full">
          <div className="flex justify-between w-full px-1">
            {menuOpen ? (
              <FaAngleDoubleLeft
                onClick={toggleMenu}
                className="cursor-pointer text-xl lg:hidden"
              />
            ) : (
              <FaAngleDoubleRight
                onClick={toggleMenu}
                className="cursor-pointer text-xl lg:hidden"
              />
            )}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <FaUserCircle size={40} />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
