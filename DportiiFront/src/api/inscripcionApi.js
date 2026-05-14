import api from "./axios";

export const getInscritosPorTorneo = async (idTorneo) => {
  const response = await api.get(`/inscripcion/torneo/${idTorneo}`);
  return response.data;
};

export const inscribirPeleador = async (data) => {
  const response = await api.post("/inscripcion", data);
  return response.data;
};

export const eliminarInscripcion = async (idInscripcion) => {
  const response = await api.delete(`/inscripcion/${idInscripcion}`);
  return response.data;
};
