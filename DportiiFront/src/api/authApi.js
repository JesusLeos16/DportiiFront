import api from "./axios";
export const loginRequest = async (email, password) => {
  const response = await api.post("auth/login", {
    email,
    password,
  });
  return response.data;
};

export const getUsersRequest = async () => {
  const response = await api.get("/users");
  return response.data;
};
