import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Dashboard from "../../Pages/Dashboard";
const MainLayout = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col bg-black w-full h-full">
        <div className="flex bg-gray-300 w-full h-[8vh] rounded-b-2xl">
          <NavBar />
        </div>
        {/* Bottom Part from Navbar */}
        <div className="flex bg-red-300 w-full h-[92vh]">
          {/* SideBar */}
          <div className="w-[25vw] h-full bg-amber-50 ">
            <SideBar />
          </div>
          <div className="flex justify-center items-center w-full gap-9 h-full">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
