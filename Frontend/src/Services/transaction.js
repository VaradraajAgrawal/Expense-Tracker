import api from "../api/Interceptor";
export const getTransaction = async ({ signal } = {}) => {
  const { data } = await api.get("/Transaction", { signal });
  return data;
};
