import api from "../../api/Interceptor";

export const getTransaction = async ({ signal, query } = {}) => {
  try {
    const { data } = await api.get("/Transaction", {
      signal,
      params: {
        min: query.minAmount,
        max: query.maxAmount,
        category: query.category,
        type: query.type,
        thisMonth: query.thisMonth,
        startDate: query.startDate,
        endDate: query.endDate,
        sort: query.sort,
        page: query.page,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};
