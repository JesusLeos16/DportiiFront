import api from "./axios";
export const academiaRequest = async (nombre, entrenador, direccion, telefono) => {
  const response = await api.post("academia", {
    nombre,
    entrenador,
    direccion,
    telefono,
  });
  return response.data;
};