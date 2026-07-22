import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/Interceptor";
import { clearToken, setToken } from "../api/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const value = { loading, user, authenticated };

  const initializeAuth = async () => {
    try {
      let response = await api.post("/user/refresh");
      setToken(response.data.token);
      setUser(response.data.user);
      setAuthenticated(true);
    } catch (error) {
      console.log(error.message);
      clearToken();
      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credential) => {
    let res = await api.post("/user/login", credential);
    setToken(res.token);
    setUser(res.updatedUser);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
