import api from "../../api/Interceptor";
export const createTransactionService = async ({ amount, type, category }) => {
  try {
    const { data } = await api.post("/Transaction", { amount, type, category });
    return data;
  } catch (err) {
    throw err;
  }
};
