import React, { useState } from "react";
import { Button } from "../components/atoms/Button";
import { TournamentCard } from "../components/organisms/TournamentCard";
import { NoTournaments } from "../components/organisms/NoTournaments";
import { TournamentForm } from "../components/organisms/TournamentForm";

export const TournamentPage = () => {
  const [tournaments, setTournaments] = useState([
    //pruebasasasasassa
     { name: "Torneo de fortnite puro pro cawn", Date: "2006-07-16" },
     { name: "Torneo de fortnite para mancos", Date: "0000-00-00" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const handleAddTournament = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  if (showForm) {
    return (
      <div className="p-6">
        <Button variant="secondary" onClick={handleCloseForm} className="mb-6">
          &larr; Volver a la lista
        </Button>
        <TournamentForm />
      </div>
    );
  }
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10 border-b pb-6 border-gray-100">
        <h2 className="text-3xl font-extrabold text-blue-950">
          Gestión de Torneos
        </h2>
        {tournaments.length > 0 && (
          <Button variant="primary" onClick={handleAddTournament}>
            + Agregar Torneo
          </Button>
        )}
      </div>
      {tournaments.length === 0 ? (
        <NoTournaments onAddClick={handleAddTournament} />
      ) : (
        <div className="flex flex-col gap-4">
          {tournaments.map((torneo, index) => (
            <TournamentCard
              key={index}
              name={torneo.name}
              Date={torneo.Date}
              onEdit={() => console.log("Editando", torneo.name)}
              onDelete={() => console.log("Borrando", torneo.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
