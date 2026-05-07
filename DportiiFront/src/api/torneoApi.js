import api from "./axios";
export const torneoRequest = async (nombre, fecha, competidores) => {
  const response = await api.post("torneo", {
    nombre,
    fecha,
    competidores,
  });
  return response.data;
};