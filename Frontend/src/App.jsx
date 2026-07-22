import { useEffect, useState } from "react";
import "./App.css";
import MainLayout from "./Components/Layout/MainLayout";
import api from "./api/Interceptor";
import { setToken } from "./api/axios";

function App() {
  useEffect(() => {
    const logIn = async () => {
      let response = await api.post("user/login", {
        email: "new@gmail.com",
        password: "1234",
      });
      setToken(response.data.token);
      const responses = await api.get("/Transaction/stats");
      console.log(responses.data);
    };

    logIn();
  }, []);
  return (
    <div className="flex w-screen h-screen">
      <MainLayout />
    </div>
  );
}

export default App;
