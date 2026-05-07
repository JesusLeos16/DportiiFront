import api from "./axios";
export const academiaRequest = async (name, email, password) => {
  const response = await api.post("academia", {
    name,
    email,
    password,
  });
  return response.data;
};