import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import SummaryCard from "../Features/Dashboard/SummaryCard";
const MainLayout = () => {
  const summary = {
    id: 1,
    title: "Balance",
    value: 42560,
    subtitle: "vs last month",
    trend: "up",
    icon: "💰",
  };
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
            <SummaryCard summary={summary} />
            <h1 className="text-3xl text-black">Content</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
