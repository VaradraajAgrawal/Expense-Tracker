import React, { useState, useEffect } from "react";
import SummaryCard from "../Dashboard/SummaryCard";
import TransactionList from "../Dashboard/TransactionList";

const Dashboard = () => {
  // These would eventually come from your GlobalContext or Backend
  const [balance, setBalance] = useState(1500000); // 1.5M Berries
  const [income, setIncome] = useState(2000000);
  const [expense, setExpense] = useState(500000);

  return (
    <div className="min-h-screen bg-[#f4e4bc] p-4 md:p-8 font-sans text-[#2c3e50]">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8 border-b-2 border-[#d4c49c] pb-4">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-widest text-[#e74c3c]">
            Grand Line Tracker
          </h1>
          <p className="italic text-[#7f8c8d]">
            "Managing the crew's treasure since Loguetown"
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-bold">Monkey D. Luffy</p>
            <p className="text-xs bg-[#e67e22] text-white px-2 py-0.5 rounded">
              Captain
            </p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-[#e74c3c] overflow-hidden bg-white">
            {/* Placeholder for Luffy Avatar */}
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Luffy"
              alt="avatar"
            />
          </div>
        </div>
      </header>

      {/* Bounty Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <SummaryCard
          title="Total Bounty"
          amount={balance}
          color="text-[#d4af37]"
          label="Available Berries"
        />
        <SummaryCard
          title="Loot Acquired"
          amount={income}
          color="text-[#27ae60]"
          label="Income"
        />
        <SummaryCard
          title="Treasure Spent"
          amount={expense}
          color="text-[#c0392b]"
          label="Expenses"
        />
      </div>

      {/* Main Content: History and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#fff9eb] rounded-lg shadow-xl border border-[#d4c49c] p-6">
          <h2 className="text-2xl font-bold mb-4 border-b border-[#eee]">
            The Voyage Log
          </h2>
          <TransactionList />
        </div>

        {/* Placeholder for Page 2 Visual/Chart */}
        <div className="bg-[#fff9eb] rounded-lg shadow-xl border border-[#d4c49c] p-6 flex flex-col items-center justify-center border-dashed">
          <p className="text-[#95a5a6] italic">
            Strategizing for the New World...
          </p>
          <div className="w-32 h-32 mt-4 opacity-20">
            {/* Imaginary Compass/Log Pose Icon */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/3246/3246328.png"
              alt="Log Pose"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
