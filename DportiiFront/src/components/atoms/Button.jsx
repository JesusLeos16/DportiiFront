export const Button = ({ 
  children, 
  variant = 'primary',
  className = '', 
  type = 'button', 
  onClick, 
  ...props 
}) => {

  const baseClasses = "px-6 py-2.5 rounded-lg font-bold transition-all duration-200 flex justify-center items-center gap-2 text-sm";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outlined: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};