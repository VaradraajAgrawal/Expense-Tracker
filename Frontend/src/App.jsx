import { useEffect, useState } from "react";
import "./App.css";
import MainLayout from "./Components/Layout/MainLayout";
import api from "./api/Interceptor";

function App() {
  useEffect(() => {
    const test = async () => {
      try {
        const response = await api.get("/Transaction/stats");
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    test();
  }, []);
  return (
    <div className="flex w-screen h-screen">
      <MainLayout />
    </div>
  );
}

export default App;
