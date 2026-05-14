import React from "react";
import { FiCalendar, FiMapPin, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

export const TournamentCard = ({ id, name, Date, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-blue-950">{name}</h3>

        <div className="flex items-center gap-6 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-blue-600" />
            <span>{Date}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Link
          to={`/torneos/${id}`}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mr-2 bg-blue-50 px-4 py-2 rounded-lg"
        >
          Ver Torneo
        </Link>
        <button
          onClick={onEdit}
          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-blue-700 transition-colors"
        >
          <FiEdit2 size={18} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};
