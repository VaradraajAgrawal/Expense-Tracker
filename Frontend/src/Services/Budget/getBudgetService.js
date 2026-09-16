import api from "../../api/Interceptor";

export const getBudgetService = async ({ signal } = {}) => {
  try {
    console.log("Started");
    const { data } = await api.get("/Budget", { signal });
    console.log("data service", data);
    return data;
  } catch (err) {
    console.log(err);
    throw Error("Error:", err);
  }
};
