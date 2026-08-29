import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../Components/Features/LayoutComp/NavBar";
import SideBar from "../Components/Features/LayoutComp/SideBar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#07111f]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-[#0b1828]/95 backdrop-blur-md">
        <NavBar />
      </header>

      {/* Main application area */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0b1828] lg:block xl:w-72">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <SideBar />
          </div>
        </aside>

        {/* Page Content */}
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
