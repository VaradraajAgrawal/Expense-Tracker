import api from "../../api/Interceptor";

const getTransaction = async ({
  signal,
  amountMin,
  amountMax,
  category,
  type,
  thisMonth,
  startDate,
  endDate,
  sort,
  page,
} = {}) => {
  try {
    const { data } = await api.get("/Transaction", {
      signal,
      params: {
        min: amountMin,
        max: amountMax,
        category,
        type,
        thisMonth,
        startDate,
        endDate,
        sort,
        page,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};
