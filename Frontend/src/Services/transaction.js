import api from "../api/Interceptor";
export const getTransaction = async ({ signal } = {}) => {
  console.log("1. getting called");
  try {
    const { data } = await api.get("/Transaction", { signal });
    console.log("2.actual data", data);
    return data;
  } catch (err) {
    console.log("3. something", err);
  }
};
