import React from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiHome } from "react-icons/fi";

export const RegistrosPage = () => {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-950 tracking-tight">
          Registros
        </h1>
        <p className="text-gray-500 mt-2">
          Selecciona el módulo que deseas administrar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/peleadores"
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-all hover:-translate-y-1 group"
        >
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <FiUsers size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Peleadores</h2>
          <p className="text-sm text-gray-500 text-center">
            Gestiona la lista de competidores y sus datos
          </p>
        </Link>

        <Link
          to="/academias"
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-all hover:-translate-y-1 group"
        >
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <FiHome size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Academias</h2>
          <p className="text-sm text-gray-500 text-center">
            Administra las escuelas y equipos participantes
          </p>
        </Link>
      </div>
    </div>
  );
};
