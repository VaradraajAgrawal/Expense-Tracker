import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#07111f]">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
