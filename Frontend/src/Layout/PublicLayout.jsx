import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
