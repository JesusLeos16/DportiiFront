import React, { useState } from "react";
import { BottomNavItem } from "../molecules/BottomNavItem";
import { 
  IconTrophy, 
  IconFolder, 
  IconSwords, 
  IconMatchup 
} from "../atoms/Icon";
import { FiMoreHorizontal, FiX } from "react-icons/fi";

export const BottomNav = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 px-2 pb-safe">
        <div className="grid grid-cols-3 items-center h-16">
          <BottomNavItem to="/registros" label="Registros" Icon={IconFolder} />
          <BottomNavItem to="/torneos" label="Torneos" Icon={IconTrophy} />
          
          <button 
            onClick={() => setShowMore(!showMore)}
            className={`flex flex-col items-center justify-center py-2 transition-colors duration-200 ${showMore ? 'text-blue-700' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <FiMoreHorizontal className={`text-2xl mb-1 ${showMore ? "scale-110" : ""}`} />
            <span className="text-[10px] font-bold">Más</span>
          </button>
        </div>
      </div>

      {/* Menú "Más" Desplegable */}
      {showMore && (
        <div className="md:hidden fixed inset-0 z-40 flex items-end justify-center bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setShowMore(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6 pb-24 shadow-2xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-blue-950">Más Módulos</h3>
              <button onClick={() => setShowMore(false)} className="bg-gray-100 p-2 rounded-full text-gray-500">
                <FiX size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <BottomNavItem to="/combate" label="Combate (Próximamente)" Icon={IconSwords} />
              <BottomNavItem to="/matchup" label="Matchup (Próximamente)" Icon={IconMatchup} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
