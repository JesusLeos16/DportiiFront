import React, { useState } from "react";
export const NavGroup = () => {
  const links = ["TORNEO", "PARTICIPANTES", "COMBATE", "MATCHUP", "ACADEMIAS"];
  const [activeTab, setActiveTab] = useState('TORNEO');
  return (
    <div className="flex justify-center gap-10 py-3 border-b border-gray-100">
      {links.map((link, index) => (
        <span
          key={index}
          onClick={() => setActiveTab(link)}
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
