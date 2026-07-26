import "./App.css";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "./Layout/PublicLayout";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AppLayout from "./Layout/AppLayout";
import Dashboard from "./Pages/Dashboard";
import Transaction from "./Pages/Transaction";
import Budget from "./Pages/Budget";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      {/* ProctedRoute */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/budget" element={<Budget />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
