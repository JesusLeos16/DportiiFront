import { FormField } from "../molecules/FormField";
import { useState } from "react";
import { academiaRequest } from "../../api/academiaApi";
import { useNavigate } from "react-router-dom";

export const AcademyForm = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [entrenador, setEntrenador] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      if(!nombre.trim() || !direccion.trim() || !telefono.trim() || !entrenador.trim()){
        setMensaje("Todos los campos son obligatorios");
        return;
      }
      await academiaRequest(nombre, entrenador, direccion, telefono);
      setMensaje("Academia creada con exito:");
      setTimeout(()=>{
        navigate("/academias");
      },1500);
    }catch(error){
      setMensaje(error.response?.data?.error || "Error al crear la academia");
    }
  }


return(
  <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Crear academia
      </h2>
      <FormField
        label="Nombre de la Academia"
        type="text"
        placeholder="Ingrese el nombre de la academia"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <FormField
        label="direccion"
        type="text"
        placeholder="Ingrese la direccion de la academia"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
      />
      <FormField
        label="Telefono"
        type="text"
        placeholder="Ingrese el telefono de la academia"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />
      <FormField
        label="Entrenador"
        type="text"
        placeholder="Ingrese el nombre del entrenador"
        value={entrenador}
        onChange={(e) => setEntrenador(e.target.value)}
        required
      />
      <div className="mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Academia
        </button>
        <div className="mt-6">
          <p className="text-green-700 font-bold">{mensaje}</p>
        </div>
      </div>
    </form>
)

};
