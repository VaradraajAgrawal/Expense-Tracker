import api from "../../api/Interceptor";
export const getTransaction = async ({ signal } = {}) => {
  try {
    const { data } = await api.get("/Transaction", { signal });
    return data;
  } catch (err) {
    console.log(err);
  }
};
