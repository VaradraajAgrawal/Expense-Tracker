import api from "../api/Interceptor";
export const getUser = async ({ signal } = {}) => {
  const { data } = await api.get("/user", { signal });
  return data;
};
