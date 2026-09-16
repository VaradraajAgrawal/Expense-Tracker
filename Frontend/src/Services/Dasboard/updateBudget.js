import api from "../../api/Interceptor";
export const getUpdateBudgetService = async ({ limit, currentDate } = {}) => {
  try {
    const { data } = await api.patch("/Budget", { limit, currentDate });
    return data;
  } catch (err) {
    throw err;
  }
};
