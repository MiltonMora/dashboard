import React from "react";
import { FaPlusCircle } from "react-icons/fa";

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return (
    <FaPlusCircle
      onClick={onClick}
      className="fixed bottom-4 right-4 text-[var(--foreground)] cursor-pointer rounded-full shadow-lg size-14"
    />
  );
};

export default FloatingButton;
