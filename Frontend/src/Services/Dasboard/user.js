import api from "../../api/Interceptor";

export const getUser = async ({ signal } = {}) => {
  try {
    const { data } = await api.get("/user", { signal });
    return data;
  } catch (error) {
    throw error;
  }
};
