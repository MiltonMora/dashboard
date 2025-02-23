"use client";

import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "negative" | "positive" | "information";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case "negative":
        return "bg-red-500 text-white"; // Rojo
      case "positive":
        return "bg-green-500 text-white"; // Verde
      case "information":
        return "bg-white text-black border border-gray-400"; // Blanco con borde
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div
      className={`fixed z-50 top-5 right-5 px-4 py-2 rounded shadow-md transition-all duration-300 ease-in-out
        ${getBackgroundColor()} 
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
      `}
    >
      {message}
    </div>
  );
};

export default Toast;
