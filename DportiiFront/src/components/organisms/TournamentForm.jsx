import { FormField } from "../molecules/FormField";
import { useState } from "react";
import { torneoRequest } from "../../api/torneoApi";
import { useNavigate } from "react-router-dom";

export const TournamentForm = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [competidores, setCompetidores] = useState("");
  const [mensaje, setMensaje] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    try {
      if (!nombre.trim() || !fecha.trim() || !competidores.trim()) {
        setMensaje("Todos los campos son obligatorios");
        return;
      }
      await torneoRequest(nombre, fecha, competidores);
      setMensaje("Torneo creado con exito");
      setTimeout(() => {
        navigate("/torneo");
      }, 1500);
    } catch (error) {
      setMensaje(
        error.response?.data?.error ||
          "Error al crear el torneo. Inténtalo de nuevo.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Crear Torneo
      </h2>
      <FormField
        label="Nombre del Torneo"
        type="text"
        placeholder="Ingrese el nombre del torneo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <FormField
        label="Fecha"
        type="date"
        placeholder="Seleccione la fecha"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
      <FormField
        label="Competidores"
        type="number"
        placeholder="Ingrese numero maximo de competidores"
        value={competidores}
        onChange={(e) => setCompetidores(e.target.value)}
        required
      />
      <div className="mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Torneo
        </button>
        <div className="mt-6">
          <p className="text-green-700 font-bold">{mensaje}</p>
        </div>
      </div>
    </form>
  );
};
