type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

const BASE_CLASSES = `font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer transition duration-300`;

const VARIANT_CLASSES = {
  primary: `text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`,
  secondary: `text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-2 focus:outline-none focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 font-mono`,
  danger: `text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 font-mono`,
};

export default function Button({ children, variant='primary', ...props }: ButtonProps) {
  return (
    <button
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
