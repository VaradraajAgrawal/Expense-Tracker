import api from "../../api/Interceptor";
export const deleteTransactionService = async ({ id }) => {
  try {
    const { data } = await api.delete(`/Transaction/${id}`);
    return data;
  } catch (err) {
    throw err;
  }
};
