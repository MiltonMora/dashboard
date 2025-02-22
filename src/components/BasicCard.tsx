import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const BasicCard: React.FC<CardProps> = ({ children, className }) => {
  return (
    <main
      className={`mt-2 text-center p-2 bg-[var(--contrast-bg)] mx-auto rounded-xl overflow-hidden border border-[var(--border)] ${className}`}
      id='basic-card'
    >
      {children}
    </main>
  );
};

export default BasicCard;