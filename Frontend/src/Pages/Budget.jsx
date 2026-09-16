import {
  Anchor,
  ArrowDownToLine,
  ArrowUpFromLine,
  CalendarDays,
  ChevronRight,
  Compass,
  Crown,
  Edit3,
  History,
  ShipWheel,
  Settings2,
  Sparkles,
  Wallet,
} from "lucide-react";
import { getUpdateBudgetService } from "../Services/Dasboard/updateBudget";
import { useBudget } from "../Hook/BudgetHook";

const Budget = () => {
  // Temporary UI data
  const budget = 30000;
  const spent = 11550;
  const remaining = budget - spent;
  const income = 25000;

  const spentPercentage = (spent / budget) * 100;

  const transactions = [
    {
      id: 1,
      category: "Food",
      date: "Today",
      amount: 450,
      type: "Expense",
    },
    {
      id: 2,
      category: "Groceries",
      date: "Yesterday",
      amount: 820,
      type: "Expense",
    },
    {
      id: 3,
      category: "Salary",
      date: "Sep 10",
      amount: 25000,
      type: "Income",
    },
    {
      id: 4,
      category: "Electronics",
      date: "Sep 8",
      amount: 2400,
      type: "Expense",
    },
  ];

  const budgetHistory = [
    {
      start: "5 Aug 2026",
      end: "5 Sep 2026",
      amount: 25000,
      status: "Completed",
    },
    {
      start: "5 Sep 2026",
      end: "5 Oct 2026",
      amount: 30000,
      status: "Active",
    },
  ];

  const { budgetData, error } = useBudget();
  console.log("Budget page data: ", budgetData, error);

  return (
    <div className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 animate-pulse rounded-full bg-cyan-500/10 blur-[120px]" />

        <div
          className="absolute -bottom-40 -right-40 h-96 w-96 animate-pulse rounded-full bg-amber-400/10 blur-[120px]"
          style={{ animationDuration: "5s" }}
        />

        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <main className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-amber-400" />

                <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">
                  LogBook • Treasury
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Budget Command
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Manage your treasure and keep your spending on course.
              </p>
            </div>

            <button
              className="
                group
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-amber-400
                px-5
                py-3
                text-sm
                font-black
                text-[#07111f]
                shadow-lg
                shadow-amber-500/10
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-amber-300
                hover:shadow-amber-400/20
              "
            >
              <Edit3 className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              Edit Budget
            </button>
          </div>
        </header>

        {/* =====================================================
            MAIN BUDGET CARD
        ===================================================== */}

        <section
          className="
            group
            relative
            mb-6
            overflow-hidden
            rounded-[2rem]
            border
            border-amber-400/20
            bg-gradient-to-br
            from-[#17283b]
            via-[#101e2f]
            to-[#0b1727]
            p-6
            shadow-2xl
            transition-all
            duration-500
            hover:border-amber-400/30
            sm:p-8
          "
        >
          {/* Decorative elements */}

          <Compass
            className="
              absolute
              -right-20
              -top-20
              h-72
              w-72
              animate-[spin_35s_linear_infinite]
              text-amber-400/[0.035]
            "
          />

          <ShipWheelDecoration />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            {/* LEFT SIDE */}

            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />

                <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
                  Current Treasure
                </span>
              </div>

              <h2 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
                ₹{budget.toLocaleString("en-IN")}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Total budget for your current cycle
              </p>

              {/* Current status */}

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                <span className="text-xs font-black text-emerald-300">
                  On Course
                </span>

                <span className="text-xs text-slate-600">•</span>

                <span className="text-xs text-slate-400">
                  Treasury is looking healthy
                </span>
              </div>

              {/* Bottom stats */}

              <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
                <BudgetMiniStat
                  label="Spent"
                  value={`₹${spent.toLocaleString("en-IN")}`}
                  icon={<ArrowUpFromLine />}
                  type="expense"
                />

                <BudgetMiniStat
                  label="Remaining"
                  value={`₹${remaining.toLocaleString("en-IN")}`}
                  icon={<Sparkles />}
                  type="remaining"
                />
              </div>
            </div>

            {/* CIRCULAR PROGRESS */}

            <div className="flex justify-center">
              <div className="relative h-56 w-56">
                {/* Glow */}

                <div className="absolute inset-0 animate-pulse rounded-full bg-amber-400/10 blur-3xl" />

                <svg
                  viewBox="0 0 200 200"
                  className="relative h-full w-full -rotate-90"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="76"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-slate-800"
                  />

                  <circle
                    cx="100"
                    cy="100"
                    r="76"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="
                      text-amber-400
                      transition-all
                      duration-[1500ms]
                      ease-out
                    "
                    strokeDasharray={2 * Math.PI * 76}
                    strokeDashoffset={
                      2 * Math.PI * 76 * (1 - spentPercentage / 100)
                    }
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black">
                    {spentPercentage.toFixed(0)}%
                  </span>

                  <span className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    Used
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard
            title="Treasure In"
            value={income}
            description="Total income this cycle"
            icon={<ArrowDownToLine />}
            color="cyan"
          />

          <SummaryCard
            title="Treasure Out"
            value={spent}
            description={`${spentPercentage.toFixed(1)}% of budget used`}
            icon={<ArrowUpFromLine />}
            color="rose"
          />

          <SummaryCard
            title="Treasure Left"
            value={remaining}
            description={`${((remaining / budget) * 100).toFixed(1)}% available`}
            icon={<Sparkles />}
            color="emerald"
          />
        </section>

        {/* =====================================================
            BUDGET CYCLE
        ===================================================== */}

        <section className="mt-6 rounded-3xl border border-amber-400/10 bg-[#101e2f] p-6 shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-amber-400" />

                  <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-400">
                    Active Voyage
                  </span>
                </div>

                <h2 className="mt-2 text-xl font-black">
                  Current Budget Cycle
                </h2>
              </div>

              <div className="hidden rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-right sm:block">
                <p className="text-[9px] font-black uppercase tracking-widest text-amber-400">
                  Remaining
                </p>

                <p className="mt-1 text-lg font-black text-amber-300">
                  20 Days
                </p>
              </div>
            </div>

            {/* Timeline */}

            <div className="relative px-2 py-5">
              <div className="absolute left-4 right-4 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    via-amber-400
                    to-amber-500
                    transition-all
                    duration-[1500ms]
                  "
                  style={{
                    width: `${spentPercentage}%`,
                  }}
                />
              </div>

              <div className="relative flex justify-between">
                <CyclePoint
                  icon={<Anchor />}
                  date="5 Aug 2026"
                  label="Cycle Start"
                />

                <CyclePoint
                  icon={<Crown />}
                  date="5 Sep 2026"
                  label="Today"
                  active
                />

                <CyclePoint
                  icon={<Compass />}
                  date="5 Oct 2026"
                  label="Cycle End"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ACTIVITY + SETTINGS
        ===================================================== */}

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* RECENT ACTIVITY */}

          <div className="rounded-3xl border border-white/5 bg-[#101e2f] p-6 shadow-xl lg:col-span-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Recent Voyages
                </p>

                <h2 className="mt-1 text-xl font-black">Spending Activity</h2>
              </div>

              <div className="rounded-xl bg-cyan-400/10 p-3">
                <Wallet className="h-5 w-5 text-cyan-300" />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              {transactions.map((item, index) => {
                const isIncome = item.type === "Income";

                return (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between rounded-2xl border border-transparent p-3 transition-all duration-300 hover:border-white/5 hover:bg-white/[0.025]"
                    style={{
                      animation: `slideUp .5s ease-out ${index * 0.08}s both`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-xl p-3 transition-all duration-300 group-hover:scale-110 ${
                          isIncome ? "bg-cyan-400/10" : "bg-rose-400/10"
                        }`}
                      >
                        {isIncome ? (
                          <ArrowDownToLine className="h-4 w-4 text-cyan-300" />
                        ) : (
                          <ArrowUpFromLine className="h-4 w-4 text-rose-300" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-bold">{item.category}</p>

                        <p className="mt-1 text-[10px] text-slate-600">
                          {item.date}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`text-sm font-black ${
                        isIncome ? "text-cyan-300" : "text-rose-300"
                      }`}
                    >
                      {isIncome ? "+" : "-"}₹
                      {item.amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SETTINGS */}

          <div className="rounded-3xl border border-white/5 bg-[#101e2f] p-6 shadow-xl lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Treasury Rules
                </p>

                <h2 className="mt-1 text-xl font-black">Budget Settings</h2>
              </div>

              <Settings2 className="h-5 w-5 text-amber-400" />
            </div>

            <div className="mt-6 space-y-3">
              <SettingRow
                label="Budget Limit"
                value={`₹${budget.toLocaleString("en-IN")}`}
              />

              <SettingRow label="Cycle Start" value="5th of every month" />

              <SettingRow label="Cycle" value="Monthly" />
            </div>

            <button className="group mt-5 flex w-full items-center justify-between rounded-xl border border-white/5 bg-black/10 px-4 py-3 text-sm font-bold text-slate-300 transition-all duration-300 hover:border-amber-400/20 hover:bg-amber-400/5 hover:text-amber-300">
              Configure Treasury
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </section>

        {/* =====================================================
            BUDGET HISTORY
        ===================================================== */}

        <section className="mt-6 rounded-3xl border border-white/5 bg-[#101e2f] p-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-400/10 p-3">
              <History className="h-5 w-5 text-amber-400" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                LogBook
              </p>

              <h2 className="mt-1 text-xl font-black">Budget History</h2>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {budgetHistory.map((item, index) => (
              <div
                key={index}
                className="
                  group
                  grid
                  grid-cols-1
                  gap-3
                  rounded-2xl
                  border
                  border-white/[0.03]
                  bg-black/10
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-white/10
                  hover:bg-white/[0.02]
                  sm:grid-cols-[1.5fr_1fr_1fr_auto]
                  sm:items-center
                "
                style={{
                  animation: `slideUp .5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div>
                  <p className="text-sm font-bold text-slate-300">
                    {item.start}
                    <span className="mx-2 text-slate-700">→</span>
                    {item.end}
                  </p>
                </div>

                <p className="text-sm font-black">
                  ₹{item.amount.toLocaleString("en-IN")}
                </p>

                <div>
                  {item.status === "Active" ? (
                    <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black text-emerald-300">
                      Active
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-600">
                      Completed
                    </span>
                  )}
                </div>

                <ChevronRight className="hidden h-4 w-4 text-slate-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-400 sm:block" />
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="py-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
            Set sail • Track wisely • Protect your treasure
          </p>
        </footer>
      </main>

      {/* =====================================================
          LOCAL ANIMATIONS
      ===================================================== */}

      <style>{`

        @keyframes slideUp {

          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

      `}</style>
    </div>
  );
};

/* =========================================================
   COMPONENTS
========================================================= */

const SummaryCard = ({ title, value, description, icon, color }) => {
  const styles = {
    cyan: {
      border: "border-cyan-400/10 hover:border-cyan-400/30",
      icon: "bg-cyan-400/10 text-cyan-300",
      value: "text-cyan-300",
    },

    rose: {
      border: "border-rose-400/10 hover:border-rose-400/30",
      icon: "bg-rose-400/10 text-rose-300",
      value: "text-rose-300",
    },

    emerald: {
      border: "border-emerald-400/10 hover:border-emerald-400/30",
      icon: "bg-emerald-400/10 text-emerald-300",
      value: "text-emerald-300",
    },
  };

  const style = styles[color];

  return (
    <div
      className={`
        group
        rounded-2xl
        border
        bg-[#101e2f]
        p-5
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
        ${style.border}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">
            {title}
          </p>

          <p className={`mt-3 text-2xl font-black ${style.value}`}>
            ₹{Number(value).toLocaleString("en-IN")}
          </p>
        </div>

        <div
          className={`
            rounded-xl
            p-3
            transition-all
            duration-500
            group-hover:scale-110
            group-hover:rotate-6
            ${style.icon}
          `}
        >
          {icon}
        </div>
      </div>

      <p className="mt-5 text-xs text-slate-500">{description}</p>
    </div>
  );
};

const BudgetMiniStat = ({ label, value, icon, type }) => {
  const isExpense = type === "expense";

  return (
    <div className="group rounded-2xl border border-white/5 bg-black/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-black/20">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          {label}
        </p>

        <div
          className={`rounded-lg p-2 ${
            isExpense
              ? "bg-rose-400/10 text-rose-300"
              : "bg-emerald-400/10 text-emerald-300"
          }`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xl font-black">{value}</p>
    </div>
  );
};

const CyclePoint = ({ icon, date, label, active = false }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          bg-[#101e2f]
          transition-all
          duration-500
          hover:scale-125
          ${
            active
              ? "border-amber-400/50 bg-amber-400/10 shadow-lg shadow-amber-400/10"
              : "border-white/10"
          }
        `}
      >
        <span className={active ? "text-amber-400" : "text-slate-600"}>
          {icon}
        </span>
      </div>

      <p className="mt-2 text-xs font-bold text-slate-400">{date}</p>

      <p className="mt-1 text-[9px] font-black uppercase tracking-widest text-slate-600">
        {label}
      </p>
    </div>
  );
};

const SettingRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.03] bg-black/10 px-4 py-3 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.025]">
      <span className="text-sm text-slate-500">{label}</span>

      <span className="text-sm font-bold text-slate-300">{value}</span>
    </div>
  );
};

const ShipWheelDecoration = () => {
  return (
    <ShipWheel
      className="
        absolute
        -bottom-20
        -left-20
        h-64
        w-64
        animate-[spin_45s_linear_infinite_reverse]
        text-cyan-400/[0.025]
      "
    />
  );
};

export default Budget;
