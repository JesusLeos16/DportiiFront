import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const routes = {
  "TORNEO": "/torneos",
  "ACADEMIAS": "/academias",
  "PARTICIPANTES": "/participantes",
  "COMBATE": "/combate",
  "MATCHUP": "/matchup"
};
export const NavGroup = () => {

  const links = ["TORNEO", "PARTICIPANTES", "COMBATE", "MATCHUP", "ACADEMIAS"];
  const [activeTab, setActiveTab] = useState("TORNEO");
  const navigate = useNavigate();
  return (
    <div className="flex justify-center gap-10 py-3 border-b border-gray-100">
      {links.map((link, index) => (
        <span
          key={index}
          onClick={() => {
            setActiveTab(link);
            navigate(routes[link]);
          }}
          className={`text-sm font-bold cursor-pointer transition-all pb-2 border-b-4 
            ${
              activeTab === link
                ? "text-blue-700 border-blue-700"
                : "text-gray-400 border-transparent hover:text-gray-600"
            }`}
        >
          {link}
        </span>
      ))}
    </div>
  );
};
