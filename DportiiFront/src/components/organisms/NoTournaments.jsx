import React from "react";
import { FiInbox } from "react-icons/fi";
import { Button } from "../atoms/Button"; // Reutilizamos tu botón

export const NoTournaments = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 mt-10">
      <div className="bg-blue-50 p-6 rounded-full text-blue-300">
        <FiInbox size={64} />
      </div>
      <div className="flex flex-col gap-2 max-w-sm">
        <h2 className="text-2xl font-bold text-blue-950">Aún no hay torneos</h2>
        <p className="text-gray-600">Organiza tu primer torneo</p>
      </div>
      <Button variant="primary" onClick={onAddClick}>
        Crear mi primer Torneo
      </Button>
    </div>
  );
};
