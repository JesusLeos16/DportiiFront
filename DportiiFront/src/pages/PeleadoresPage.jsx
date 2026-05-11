import React, { useState, useEffect } from "react";
import { Button } from "../components/atoms/Button";
import { PeleadorForm } from "../components/organisms/PeleadorForm";
import { getPeleadoresRequest } from "../api/peleadorApi";

export const PeleadoresPage = () => {
  const [peleadores, setPeleadores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    const cargarPeleadores = async () => {
      try {
        const data = await getPeleadoresRequest();
        setPeleadores(data);
        setTimeout(() => {
          cargarPeleadores();
        }, 2000);
      } catch (error) {
        console.error("Error al cargar peleadores:", error);
      }
    };
    cargarPeleadores();
  }, []);

  const handleAddPeleador = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  if (showForm) {
    return (
      <div className="p-6">
        <Button variant="secondary" onClick={handleCloseForm} className="mb-6">
          &larr; Volver a la lista
        </Button>
        <PeleadorForm />
      </div>
    );
  }
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10 border-b pb-6 border-gray-100">
        <h1 className="text-3xl font-extrabold text-blue-950">
          Gestión de Peleadores
        </h1>
        <Button variant="primary" onClick={handleAddPeleador}>
          + Registrar Peleador
        </Button>
      </div>

      {peleadores.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          Aún no hay peleadores registrados. ¡Crea el primero!
        </p>
      ) : (
        <div className="flex flex-col gap-4 border-b pb-6 border-gray-100">
          {peleadores.map((peleador) => (
            <div
              key={peleador.idPeleador}
              className="p-4  rounded-xl shadow-sm hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-bold text-blue-950">
                {peleador.nombre} "{peleador.apodo}"
              </h3>
              <p className="text-blue-950">
                Peso: {peleador.peso}kg | Nivel: {peleador.nivel}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
