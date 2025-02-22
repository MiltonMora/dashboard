import React from "react";

interface CardProps {
  children: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Fixed: React.FC<CardProps> = ({ children, onClick }) => {
  return (
    <main
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    onClick={onClick}
    id='fixed-element'
    >
      {children}
    </main>
  );
};

export default Fixed;