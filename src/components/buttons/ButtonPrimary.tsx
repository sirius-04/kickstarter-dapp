import React from "react";

type ButtonPrimaryProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function ButtonPrimary({ children, ...props }: ButtonPrimaryProps) {
  return (
    <button {...props} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 font-mono cursor-pointer transition duration-300">
      {children}
    </button>
  );
}