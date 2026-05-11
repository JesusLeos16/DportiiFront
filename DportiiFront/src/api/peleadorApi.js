import api from "./axios";

export const peleadorRequest = async (nombre, apodo, peso, nivel, telefono, idAcademia) => {
  const response = await api.post("peleador", {
    nombre,
    apodo,
    peso,
    nivel,
    telefono,
    idAcademia,
  });
  return response.data;
};

export const getPeleadoresRequest = async () => {
  const response = await api.get("peleador");
  return response.data;
};
