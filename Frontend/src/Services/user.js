import api from "../api/Interceptor";

export const getUser = async ({ signal } = {}) => {
  console.log("1. getUser CALLED");

  try {
    const { data } = await api.get("/user", { signal });

    console.log("2. USER DATA:", data);

    return data;
  } catch (error) {
    console.log("3. getUser ERROR:", error);
    console.log("4. STATUS:", error.response?.status);
    console.log("5. RESPONSE:", error.response?.data);

    throw error;
  }
};
