import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const routes = {
  TORNEO: "/torneos",
  REGISTROS: "/registros",
  COMBATE: "/combate",
  MATCHUP: "/matchup",
};
export const NavGroup = () => {
  const links = ["TORNEO", "REGISTROS", "COMBATE", "MATCHUP"];
  const location = window.location.pathname;
  const navigate = useNavigate();
  return (
    <div className="flex justify-center gap-8">
      {links.map((link, index) => {
        const isActive = location.startsWith(routes[link]);
        return (
          <span
            key={index}
            onClick={() => navigate(routes[link])}
            className={`text-sm font-bold cursor-pointer transition-all pb-1 border-b-2 
              ${
                isActive
                  ? "text-blue-700 border-blue-700"
                  : "text-gray-400 border-transparent hover:text-gray-600 hover:border-gray-300"
              }`}
          >
            {link}
          </span>
        );
      })}
    </div>
  );
};
