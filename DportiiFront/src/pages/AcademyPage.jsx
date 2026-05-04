import React, { useState } from 'react';
import { Button } from '../components/atoms/Button';
import { AcademyCard } from '../components/organisms/AcademyCard';
import { NoAcademies } from '../components/organisms/NoAcademies';

export const AcademyPage = () => {
  const [academies, setAcademies] = useState([
    //pruebas miadas
    { 
      idAcademia: 1, 
      nombre: 'Cobra Kai Dojo', 
      entrenador: 'Johnny Lawrence', 
      direccion: 'Reseda, CA', 
      telefono: '555-123-4567' 
    },
    { 
      idAcademia: 2, 
      nombre: 'Miyagi-Do Karate', 
      entrenador: 'Daniel LaRusso', 
      direccion: 'Encino, CA', 
      telefono: '555-987-6543' 
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);

  const handleAddAcademy = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  if (showForm) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
         <Button variant="secondary" onClick={handleCloseForm} className="mb-6">
           &larr; Volver a la lista
         </Button>
         <div className="bg-white p-10 rounded-xl shadow border border-gray-100 text-center">
            <h2 className="text-xl font-bold text-gray-500">Aquí irá el formulario de registro de Academia...</h2>
         </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10 border-b pb-6 border-gray-100">
        <h1 className="text-3xl font-extrabold text-blue-950">Gestión de Academias</h1>
        
        {academies.length > 0 && (
          <Button variant="primary" onClick={handleAddAcademy}>
            + Registrar Academia
          </Button>
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
              onEdit={() => console.log('Editando', academia.nombre)}
              onDelete={() => console.log('Borrando', academia.nombre)}
            />
          ))}
        </div>
      )}
    </div>
  );
};