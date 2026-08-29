import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/Interceptor";
// import { clearToken, setToken } from "../api/axios";
import { clearToken, setToken } from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const initializeAuth = async () => {
    try {
      let response = await api.get("/user/refresh");
      setToken(response.data.accessToken);
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
      setToken(res.data.accessToken);
      setUser(res.data.user);
      setAuthenticated(true);
      navigate("/dashboard");
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
