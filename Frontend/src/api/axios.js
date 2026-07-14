let token;

export const setToken = (data) => {
  token = data;
  return token;
};

export const getToken = () => {
  return token;
};

export const clearToken = () => {
  token = null;
  return token;
};
