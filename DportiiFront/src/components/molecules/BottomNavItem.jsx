import React from "react";
import { Link, useLocation } from "react-router-dom";

export const BottomNavItem = ({ to, label, Icon, customClass, iconClass }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={customClass || `flex flex-col items-center justify-center w-full py-2 transition-colors duration-200 ${
        isActive ? "text-blue-700" : "text-gray-400 hover:text-gray-600"
      }`}
    >
      <Icon className={iconClass || `text-2xl mb-1 ${isActive ? "scale-110" : ""}`} />
      {label && (
        <span className={`text-[10px] font-bold ${isActive ? "opacity-100" : "opacity-80"}`}>
          {label}
        </span>
      )}
    </Link>
  );
};
