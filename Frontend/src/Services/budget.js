import api from "../api/Interceptor";
export const getBudget = async ({ signal } = {}) => {
  const { data } = await api.get("/Budget", { signal });
  return data;
};
