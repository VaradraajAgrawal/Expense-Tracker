import {
  Anchor,
  ArrowDownToLine,
  ArrowUpFromLine,
  Compass,
  Crown,
  RefreshCw,
  Receipt,
  ShipWheel,
  Sparkles,
  Wallet,
} from "lucide-react";

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
    dashboardUpdate,
  } = useDashboard();

  if (initialLoad) {
    return <Loader />;
  }

  const transactionCount = Array.isArray(transaction) ? transaction.length : 0;

  const budgetLimit = budget?.summary?.Budget ?? budget?.budget ?? 0;
  const totalIncome = budget?.summary?.totalIncome ?? 0;
  const totalExpense = budget?.summary?.totalExpense ?? 0;

  // The backend now defines remaining budget as:
  // budget limit - total expense.
  const remainingBudget =
    budget?.summary?.remainingBudget ??
    Math.max(Number(budgetLimit) - Number(totalExpense), 0);

  const expensePercentage =
    budget?.summary?.expensePercentage ??
    (budgetLimit > 0
      ? Number(((totalExpense / budgetLimit) * 100).toFixed(2))
      : 0);

  // These are optional so the page keeps working until the GET budget
  // service exposes the active cycle dates.
  const budgetStartDate =
    budget?.summary?.startDate ?? budget?.startDate ?? budget?.currentStartDate;

  const budgetEndDate =
    budget?.summary?.endDate ?? budget?.endDate ?? budget?.currentEndDate;

  const formatBudgetDate = (value) => {
    if (!value) return null;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const budgetPeriod =
    budgetStartDate && budgetEndDate
      ? `${formatBudgetDate(budgetStartDate)} → ${formatBudgetDate(
          budgetEndDate,
        )}`
      : "Current budget cycle";

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      {/* Ocean background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <main className="relative mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* =========================================
            HEADER
        ========================================= */}
        <header className="mb-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Anchor className="h-4 w-4 text-amber-400" />

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
                  LogBook • Grand Line
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Captain's Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Keep your treasure, voyages, and expenses under control.
              </p>
            </div>

            <button
              type="button"
              onClick={refreshClicked}
              disabled={isRefreshing}
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400 px-5 py-3 text-sm font-bold text-[#07111f] shadow-lg shadow-amber-500/10 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  isRefreshing
                    ? "animate-spin"
                    : "transition-transform group-hover:rotate-180"
                }`}
              />

              {isRefreshing ? "Refreshing Dashboard..." : "Refresh Dashboard"}
            </button>
          </div>
        </header>

        {/* =========================================
            REFRESH STATUS
        ========================================= */}
        {isRefreshing && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3">
            <RefreshCw className="h-4 w-4 animate-spin text-cyan-300" />

            <p className="text-sm font-medium text-cyan-200">
              The dashboard is being refreshed...
            </p>
          </div>
        )}

        {/* =========================================
            CAPTAIN CARD
        ========================================= */}
        <section className="mb-6 overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-[#17283b] to-[#0c1929] shadow-2xl">
          <div className="relative p-5 sm:p-7">
            {/* Decorative compass */}
            <Compass className="absolute -right-8 -top-8 h-40 w-40 rotate-12 text-amber-400/5" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 shadow-lg sm:h-20 sm:w-20">
                  <Crown className="h-8 w-8 text-amber-400 sm:h-10 sm:w-10" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                    Captain
                  </p>

                  <h2 className="mt-1 truncate text-xl font-black sm:text-2xl">
                    {user?.name || "Unknown Captain"}
                  </h2>

                  <p className="mt-1 truncate text-sm text-slate-400">
                    {user?.email || "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
                <ShipWheel className="h-6 w-6 text-amber-400" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    LogBook Status
                  </p>

                  <p className="text-sm font-semibold text-emerald-400">
                    All systems sailing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            STAT CARDS
        ========================================= */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Budget */}
          <div className="rounded-2xl border border-white/5 bg-[#101e2f] p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Treasure Limit
                </p>

                <h3 className="mt-2 text-2xl font-black text-white">
                  ₹{budgetLimit.toLocaleString("en-IN")}
                </h3>
              </div>

              <div className="rounded-xl bg-amber-400/10 p-3">
                <Wallet className="h-5 w-5 text-amber-400" />
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-amber-400 transition-all"
                style={{
                  width: `${Math.min(expensePercentage, 100)}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              {expensePercentage}% of the current budget cycle spent
            </p>
          </div>

          {/* Remaining */}
          <div className="rounded-2xl border border-white/5 bg-[#101e2f] p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Remaining Treasure
                </p>

                <h3 className="mt-2 text-2xl font-black text-emerald-400">
                  ₹{remainingBudget.toLocaleString("en-IN")}
                </h3>
              </div>

              <div className="rounded-xl bg-emerald-400/10 p-3">
                <Sparkles className="h-5 w-5 text-emerald-400" />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Available for your next voyage.
            </p>
          </div>

          {/* Income */}
          <div className="rounded-2xl border border-white/5 bg-[#101e2f] p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Treasure In
                </p>

                <h3 className="mt-2 text-2xl font-black text-cyan-300">
                  ₹{totalIncome.toLocaleString("en-IN")}
                </h3>
              </div>

              <div className="rounded-xl bg-cyan-400/10 p-3">
                <ArrowDownToLine className="h-5 w-5 text-cyan-300" />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Total income recorded.
            </p>
          </div>

          {/* Expense */}
          <div className="rounded-2xl border border-white/5 bg-[#101e2f] p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Treasure Spent
                </p>

                <h3 className="mt-2 text-2xl font-black text-rose-300">
                  ₹{totalExpense.toLocaleString("en-IN")}
                </h3>
              </div>

              <div className="rounded-xl bg-rose-400/10 p-3">
                <ArrowUpFromLine className="h-5 w-5 text-rose-300" />
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Total expenses recorded.
            </p>
          </div>
        </section>

        {/* =========================================
            CURRENT BUDGET CYCLE
        ========================================= */}
        <section className="mt-6 rounded-3xl border border-amber-400/15 bg-[#101e2f] p-5 shadow-xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Active Budget Cycle
              </p>

              <h2 className="mt-1 text-xl font-black">{budgetPeriod}</h2>

              <p className="mt-2 text-sm text-slate-500">
                Only transactions inside this active cycle contribute to the
                current budget calculation.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                Available
              </p>

              <p className="mt-1 text-lg font-black text-emerald-300">
                ₹{remainingBudget.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================
            VOYAGE / TRANSACTION SECTION
        ========================================= */}
        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Transaction overview */}
          <div className="rounded-3xl border border-white/5 bg-[#101e2f] p-5 shadow-xl sm:p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Current Cycle Activity
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Transaction Activity
                </h2>
              </div>

              <div className="rounded-xl bg-cyan-400/10 p-3">
                <ShipWheel className="h-5 w-5 text-cyan-300" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {transactionCount === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-black/10 px-5 py-10 text-center">
                  <div className="rounded-full bg-amber-400/10 p-4">
                    <Anchor className="h-7 w-7 text-amber-400" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold">
                    No transactions recorded yet
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Your recent transactions will appear here.
                  </p>
                </div>
              ) : (
                transaction.map((item) => {
                  const isIncome = item.type === "Income";

                  return (
                    <div
                      key={item._id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/10 p-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`shrink-0 rounded-xl p-3 ${
                            isIncome ? "bg-cyan-400/10" : "bg-rose-400/10"
                          }`}
                        >
                          {isIncome ? (
                            <ArrowDownToLine className="h-5 w-5 text-cyan-300" />
                          ) : (
                            <ArrowUpFromLine className="h-5 w-5 text-rose-300" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-bold text-white">
                            {item.category || "Uncategorized"}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {item.type || "Transaction"}{" "}
                            {item.createdAt
                              ? `• ${new Date(
                                  item.createdAt,
                                ).toLocaleDateString("en-IN")}`
                              : ""}
                          </p>
                        </div>
                      </div>

                      <p
                        className={`shrink-0 text-sm font-black sm:text-base ${
                          isIncome ? "text-cyan-300" : "text-rose-300"
                        }`}
                      >
                        {isIncome ? "+" : "-"}₹
                        {Number(item.amount || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Transaction count */}
          <div className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400 to-amber-500 p-6 text-[#07111f] shadow-xl">
            <Compass className="absolute -bottom-8 -right-8 h-36 w-36 rotate-12 opacity-10" />

            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">
                Current Bounty
              </p>

              <h2 className="mt-3 text-6xl font-black">{transactionCount}</h2>

              <p className="mt-2 font-bold">Transactions in your LogBook</p>

              <div className="mt-8 flex items-center gap-2 text-sm font-semibold">
                <Receipt className="h-4 w-4" />
                Keep your records clean, Captain.
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 pb-4 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-600">
            Set sail. Track wisely. Protect your treasure.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
