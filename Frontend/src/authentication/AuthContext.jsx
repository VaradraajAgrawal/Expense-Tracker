import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/Interceptor";
import { clearToken, setToken } from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
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
    try {
      let res = await api.post("/user/login", credential);
      setToken(res.data.token);
      setUser(res.data.user);
      setAuthenticated(true);
    } catch (error) {
      console.log(error.message);
      setAuthenticated(false);
      setUser(null);
      throw error;
    }
  };
  const logout = () => {
    clearToken();
    setAuthenticated(false);
    setUser(null);
  };

  const value = { loading, user, authenticated, logout, login };

  useEffect(() => {
    initializeAuth();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
