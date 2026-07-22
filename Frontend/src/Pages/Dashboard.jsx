import React from "react";
import SummaryCard from "../Components/Features/Dashboard/SummaryCard";
import {
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Receipt,
} from "lucide-react";
import BudgetCard from "../Components/Features/Dashboard/BudgetCard";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api/Interceptor";
import { setToken } from "../api/axios";
const Dashboard = () => {
  const [data, setData] = useState(null);
  const summaryData = [
    {
      id: 1,
      title: "Balance",
      value: "₹42,560",
      subtitle: "Current Balance",
      trend: "+12%",
      icon: Wallet,
    },
    {
      id: 2,
      title: "Income",
      value: "₹58,000",
      subtitle: "This Month",
      trend: "+5%",
      icon: ArrowDownToLine,
    },
    {
      id: 3,
      title: "Expense",
      value: "₹15,440",
      subtitle: "This Month",
      trend: "-8%",
      icon: ArrowUpFromLine,
    },
    {
      id: 4,
      title: "Transactions",
      value: "132",
      subtitle: "This Month",
      trend: "+18",
      icon: Receipt,
    },
  ];
  const budgets = {
    title: "Monthly Budget",
    remaining: 12000,
    budgets: 30000,
    percentage: 63,
  };

  return (
    <>
      <div className="flex gap-5 bg-red-600">
        {summaryData.length > 0 ? (
          summaryData.map((content) => (
            <div className="h-[200px] w-[200px] bg-amber-300 flex p-3  rounded-xl shadow">
              <SummaryCard summary={content} />
            </div>
          ))
        ) : (
          <h1 className="text-3xl text-black">No Content</h1>
        )}
      </div>
      <div>
        <BudgetCard budget={budgets} />
      </div>
      <div>
        {/* <button
          onClick={() => logIn()}
          className="bg-green-300 p-2 rounded-full w-[200px] h-12"
        >
          {" "}
          Log In
        </button> */}
      </div>
    </>
  );
};

export default Dashboard;
