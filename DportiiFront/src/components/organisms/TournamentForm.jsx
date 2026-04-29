import { FormField } from "../molecules/FormField";
export const TournamentForm = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Crear Torneo
      </h2>
      <FormField
        label="Nombre del Torneo"
        type="text"
        placeholder="Ingrese el nombre del torneo"
      />
      <FormField
        label="Fecha"
        type="date"
        placeholder="Seleccione la fecha"
      />
      <FormField
        label="Competidores"
        type="number"
        placeholder="Ingrese numero maximo de competidores"
      />
      <div className="mt-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Crear Torneo
        </button>
      </div>
    </div>
  );
};
