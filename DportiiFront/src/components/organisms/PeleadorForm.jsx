import { useState, useEffect } from "react";
import { getAcademiasRequest } from "../../api/academiaApi";
import { FormField } from "../molecules/FormField";
import { SelectField } from "../molecules/SelectField";
import { peleadorRequest } from "../../api/peleadorApi";
import { useNavigate } from "react-router-dom";

export const PeleadorForm = () => {
  const [nombre, setNombre] = useState("");
  const [apodo, setApodo] = useState("");
  const [peso, setPeso] = useState("");
  const [nivel, setNivel] = useState("");
  const [telefono, setTelefono] = useState("");
  const [idAcademia, setIdAcademia] = useState("");
  const [academias, setAcademias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cargarAcademias = async () => {
      try {
        const data = await getAcademiasRequest();
        setAcademias(data);
      } catch (error) {
        console.error("No se pudieron cargar las academias", error);
      }
    };
    cargarAcademias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    try {
      if (!nombre.trim() || !idAcademia) {
        setMensaje("El nombre y la academia son obligatorios");
        return;
      }
      await peleadorRequest(nombre, apodo, peso, nivel, telefono, idAcademia);
      setMensaje("Peleador registrado con éxito");
      setTimeout(() => {
        navigate("/peleadores");
      }, 1500);
    } catch (error) {
      setMensaje(error.response?.data?.error || "Error al registrar el peleador.");
    }
  };

  const opcionesAcademias = academias.map((academia) => ({
    value: academia.idAcademia,
    label: academia.nombre,
  }));

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Registrar Peleador</h2>

      <FormField label="Nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <FormField label="Apodo" type="text" value={apodo} onChange={(e) => setApodo(e.target.value)} />
      <FormField label="Peso" type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
      <FormField label="Nivel" type="text" value={nivel} onChange={(e) => setNivel(e.target.value)} />
      <FormField label="Teléfono" type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

      <SelectField 
        label="Academia"
        options={opcionesAcademias}
        value={idAcademia}
        onChange={(e) => setIdAcademia(e.target.value)}
        required
      />

      <div className="mt-6">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          Guardar Peleador
        </button>
        {mensaje && (
          <div className="mt-4 text-center">
            <p className="text-green-700 font-bold">{mensaje}</p>
          </div>
        )}
      </div>
    </form>
  );
};
