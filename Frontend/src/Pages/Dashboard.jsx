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
import { useDashboard } from "../Hook/DashBoardService";
import Loader from "./Loader";
const Dashboard = () => {
  const {
    budget,
    transaction,
    user,
    error,
    isRefreshing,
    initialLoad,
    refreshClicked,
  } = useDashboard();

  // Initial request: no dashboard data exists yet.
  if (initialLoad) {
    return <Loader />;
  }

  console.log("All Details", user.name, user.email, budget, transaction);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Welcome back, {user?.name || "User"}
            </p>
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={refreshClicked}
            disabled={isRefreshing}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isRefreshing && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-white" />
            )}

            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </header>

        {/* Refresh status */}
        {isRefreshing && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />

            <p className="text-sm font-medium text-blue-700">
              Updating your dashboard...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-red-700">
              {error?.message || "Something went wrong."}
            </p>
          </div>
        )}

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* User */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Account</p>

            <h2 className="mt-2 text-xl font-semibold text-gray-900">
              {user?.name || "—"}
            </h2>

            <p className="mt-1 break-all text-sm text-gray-500">
              {user?.email || "—"}
            </p>
          </div>

          {/* Budget */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Budget</p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {budget?.budget ?? "—"}
            </h2>
          </div>

          {/* Transactions */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Transactions</p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {Array.isArray(transaction) ? transaction.length : "—"}
            </h2>
          </div>
        </section>

        {/* Existing dashboard UI */}
        <section className="mt-6">
          {/* Your existing charts / transaction list / budget UI */}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
