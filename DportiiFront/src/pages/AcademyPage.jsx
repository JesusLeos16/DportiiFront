import React, { useState } from "react";
import { Button } from "../components/atoms/Button";
import { AcademyCard } from "../components/organisms/AcademyCard";
import { NoAcademies } from "../components/organisms/NoAcademies";
import { AcademyForm } from "../components/organisms/AcademyForm";
import { academiaRequest } from "../api/academiaApi";
import { getAcademiasRequest } from "../api/academiaApi";
import { useEffect } from "react";

export const AcademyPage = () => {
  const [academies, setAcademies] = useState([]);

  useEffect(() => {
    const cargarAcademias = async () => {
      try {
        const data = await getAcademiasRequest();
        setAcademies(data);
      } catch (error) {
        console.error("Error al cargar academias:", error);
      }
    };
    cargarAcademias();
  }, []);

  const [showForm, setShowForm] = useState(false);
  const handleAddAcademy = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  if (showForm) {
    return (
      <div>
        <Button variant="secondary" onClick={handleCloseForm}>
          Volver
        </Button>
        <AcademyForm />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10 border-b pb-6 border-gray-100">
        <h1 className="text-3xl font-extrabold text-blue-950">
          Gestión de Academias
        </h1>

        {academies.length > 0 && (
          <a href="/AcademyForm" variant="primary" onClick={handleAddAcademy}>
            + Registrar Academia
          </a>
        )}
      </div>

      {academies.length === 0 ? (
        <NoAcademies onAddClick={handleAddAcademy} />
      ) : (
        <div className="flex flex-col gap-4">
          {academies.map((academia) => (
            <AcademyCard
              key={academia.idAcademia}
              nombre={academia.nombre}
              entrenador={academia.entrenador}
              direccion={academia.direccion}
              telefono={academia.telefono}
            />
          ))}
        </div>
      )}
    </div>
  );
};
