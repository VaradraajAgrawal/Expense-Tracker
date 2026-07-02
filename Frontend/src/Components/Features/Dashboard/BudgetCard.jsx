import React from "react";

const BudgetCard = ({ budget, onEdit }) => {
  const { remaining, title, budgets, percentage } = budget;
  return (
    <div className="flex flex-col items-center justify-between w-[280px] h-[340px] bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      {/* Top Section: Title & Main Amount */}
      <div className="text-center w-full">
        <h2 className="text-gray-500 font-medium text-sm tracking-wide">
          {title}
        </h2>
        <h1 className="text-3xl font-black text-slate-800 mt-2">₹{budgets}</h1>
      </div>

      {/* Middle Section: Remaining Balance & Visual Progress Bar */}
      <div className="w-full flex flex-col items-center gap-3">
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
            Remaining
          </p>
          <p className="text-xl font-bold text-emerald-600 mt-0.5">
            ₹{remaining}
          </p>
        </div>

        {/* Progress Bar & Percentage Label */}
        <div className="w-full mt-2">
          <div className="w-full bg-gray-100 h-3 rounded-full">
            {/* Width hardcoded to 63% matching the design layout */}
            <div className="bg-indigo-600 h-full w-[63%] rounded-full" />
          </div>
          <div className="flex justify-end mt-1.5">
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              {percentage}% Used
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Aesthetic Button Template */}
      <div className="w-full text-center py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200 select-none">
        Edit Budget
      </div>
    </div>
  );
};

export default BudgetCard;
