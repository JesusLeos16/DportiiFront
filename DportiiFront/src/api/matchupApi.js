import api from "./axios";

export const getBracket = async (idTorneo, categoria, nivel) => {
  const response = await api.get(`/matchup/bracket/${idTorneo}/${categoria}/${nivel}`);
  return response.data;
};

export const generarMatchup = async (idTorneo, categoria, nivel) => {
  const response = await api.post("/matchup/generar", { idTorneo, categoria, nivel });
  return response.data;
};

export const swapMatchup = async (idMatchup1, idMatchup2) => {
  const response = await api.put("/matchup/swap", { idMatchup1, idMatchup2 });
  return response.data;
};
