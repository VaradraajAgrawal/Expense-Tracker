import api from "../../api/Interceptor";
export const updateTransactionService = async ({ data, id }) => {
  try {
    console.log(`update service id ${id}`);
    console.log(`update service data`, data);
    const response = await api.patch(`/Transaction/${id}`, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
