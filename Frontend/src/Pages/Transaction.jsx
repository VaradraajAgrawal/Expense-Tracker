import React, { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Skull,
  Trash2,
  X,
} from "lucide-react";

import { useTransaction } from "../Hook/TransactionHook";
const categories = [
  "Electronics",
  "Rent",
  "Food",
  "Salary",
  "Daily",
  "Groceries",
];

const types = ["Income", "Expense"];

const sortOptions = ["Latest", "Oldest", "Highest", "Lowest"];

const emptyForm = {
  amount: "",
  type: "Expense",
  category: "Food",
};

const Transaction = () => {
  const {
    transaction,
    totalDocuments,
    maxPage,
    isRefreshing,
    error,

    draftFilters,
    setDraftFilters,
    appliedFilters,

    applyFilters,
    refetchAppliedRequest,

    createTransaction,
    updateTransaction,
    deleteTransaction,

    changePage,
  } = useTransaction();

  const [showFilters, setShowFilters] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [editingTransaction, setEditingTransaction] = useState(null);

  const [deletingTransaction, setDeletingTransaction] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [formError, setFormError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==========================================
  // Helpers
  // ==========================================

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const currentPage = appliedFilters?.page ?? 1;

  // ==========================================
  // Filter handling
  // ==========================================

  const updateDraftFilter = (field, value) => {
    setDraftFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setDraftFilters({
      minAmount: null,
      maxAmount: null,
      type: null,
      sort: null,
      category: null,
      startDate: null,
      endDate: null,
      thisMonth: null,
    });
  };

  const handleApplyFilters = () => {
    applyFilters();
    setShowFilters(false);
  };

  // ==========================================
  // Form handling
  // ==========================================

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openCreateModal = () => {
    setForm(emptyForm);
    setFormError("");
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    if (isSubmitting) return;

    setShowCreateModal(false);
    setFormError("");
  };

  const openEditModal = (item) => {
    setEditingTransaction(item);

    setForm({
      amount: item.amount ?? "",
      type: item.type ?? "Expense",
      category: item.category ?? "Food",
    });

    setFormError("");
  };

  const closeEditModal = () => {
    if (isSubmitting) return;

    setEditingTransaction(null);
    setFormError("");
  };

  // ==========================================
  // CREATE
  // ==========================================

  const handleCreate = async (e) => {
    e.preventDefault();

    setFormError("");

    if (!form.amount || Number(form.amount) <= 0) {
      setFormError("Enter a valid amount.");
      return;
    }

    if (!form.type || !form.category) {
      setFormError("Please select type and category.");
      return;
    }

    try {
      setIsSubmitting(true);

      await createTransaction({
        amount: Number(form.amount),
        type: form.type,
        category: form.category,
      });

      setForm(emptyForm);
      setShowCreateModal(false);
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to create transaction.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // UPDATE
  // ==========================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingTransaction) return;

    setFormError("");

    if (!form.amount || Number(form.amount) <= 0) {
      setFormError("Enter a valid amount.");
      return;
    }

    try {
      setIsSubmitting(true);

      await updateTransaction({
        id: editingTransaction._id,
        data: {
          amount: Number(form.amount),
          type: form.type,
          category: form.category,
        },
      });

      setEditingTransaction(null);
      setForm(emptyForm);
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to update transaction.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async () => {
    if (!deletingTransaction) return;

    try {
      setIsSubmitting(true);

      await deleteTransaction({
        id: deletingTransaction._id,
      });

      setDeletingTransaction(null);
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to delete transaction.",
      );

      setDeletingTransaction(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // Shared form
  // ==========================================

  const transactionForm = (
    <form
      onSubmit={editingTransaction ? handleUpdate : handleCreate}
      className="space-y-5"
    >
      {/* Amount */}

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Amount
        </label>

        <input
          type="number"
          name="amount"
          min="1"
          value={form.amount}
          onChange={handleFormChange}
          placeholder="Enter amount"
          className="w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-yellow-400"
        />
      </div>

      {/* Type */}

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Transaction Type
        </label>

        <div className="grid grid-cols-2 gap-2">
          {types.map((type) => {
            const selected = form.type === type;

            return (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    type,
                  }))
                }
                className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                  selected
                    ? type === "Income"
                      ? "border-emerald-400 bg-emerald-400/10 text-emerald-400"
                      : "border-red-400 bg-red-400/10 text-red-400"
                    : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category */}

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
          Category
        </label>

        <select
          name="category"
          value={form.category}
          onChange={handleFormChange}
          className="w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3 text-sm text-white outline-none focus:border-yellow-400"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {formError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-300">{formError}</p>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={editingTransaction ? closeEditModal : closeCreateModal}
          className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-400 hover:bg-white/5 disabled:opacity-40"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}

          {editingTransaction ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen w-full bg-[#07111f] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {/* ==========================================
            HEADER
        =========================================== */}

        <header className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Skull className="h-5 w-5 text-yellow-400" />

                <span className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">
                  Grand Line Ledger
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Transaction Log
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Track every Berry earned and spent on your journey.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-yellow-300 sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              Add Transaction
            </button>
          </div>
        </header>

        {/* ==========================================
            SUMMARY
        =========================================== */}

        <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0d1b2a] p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Records
            </p>

            <p className="mt-2 text-2xl font-black">{totalDocuments ?? 0}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0d1b2a] p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Current Page
            </p>

            <p className="mt-2 text-2xl font-black text-yellow-400">
              {currentPage}
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-white/10 bg-[#0d1b2a] p-4 sm:col-span-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Pages
            </p>

            <p className="mt-2 text-2xl font-black">{maxPage ?? 1}</p>
          </div>
        </section>

        {/* ==========================================
            TOOLBAR
        =========================================== */}

        <section className="mb-5 rounded-2xl border border-yellow-500/20 bg-[#0b1726] p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10">
                <Filter className="h-5 w-5 text-yellow-400" />
              </div>

              <div>
                <p className="font-bold">Transaction Filters</p>

                <p className="text-xs text-slate-500">
                  Select your filters and apply them together.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => refetchAppliedRequest()}
                disabled={isRefreshing}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300 hover:bg-white/10 disabled:opacity-40 sm:flex-none"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </button>

              <button
                type="button"
                onClick={() => setShowFilters((prev) => !prev)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-300 hover:bg-white/10 sm:flex-none"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          {/* FILTER PANEL */}

          {showFilters && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Type */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Type
                  </label>

                  <select
                    value={draftFilters.type ?? ""}
                    onChange={(e) =>
                      updateDraftFilter("type", e.target.value || null)
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#07111f] px-3 py-3 text-sm text-white outline-none focus:border-yellow-400"
                  >
                    <option value="">All Types</option>

                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Category
                  </label>

                  <select
                    value={draftFilters.category ?? ""}
                    onChange={(e) =>
                      updateDraftFilter("category", e.target.value || null)
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#07111f] px-3 py-3 text-sm text-white outline-none focus:border-yellow-400"
                  >
                    <option value="">All Categories</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Sort
                  </label>

                  <select
                    value={draftFilters.sort ?? ""}
                    onChange={(e) =>
                      updateDraftFilter("sort", e.target.value || null)
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#07111f] px-3 py-3 text-sm text-white outline-none focus:border-yellow-400"
                  >
                    <option value="">Latest</option>

                    {sortOptions.map((sort) => (
                      <option key={sort} value={sort}>
                        {sort}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Minimum */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Minimum Amount
                  </label>

                  <input
                    type="number"
                    value={draftFilters.minAmount ?? ""}
                    onChange={(e) =>
                      updateDraftFilter(
                        "minAmount",
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    placeholder="Minimum"
                    className="w-full rounded-xl border border-white/10 bg-[#07111f] px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-yellow-400"
                  />
                </div>

                {/* Maximum */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Maximum Amount
                  </label>

                  <input
                    type="number"
                    value={draftFilters.maxAmount ?? ""}
                    onChange={(e) =>
                      updateDraftFilter(
                        "maxAmount",
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    placeholder="Maximum"
                    className="w-full rounded-xl border border-white/10 bg-[#07111f] px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-yellow-400"
                  />
                </div>

                {/* This Month */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Time
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      updateDraftFilter(
                        "thisMonth",
                        draftFilters.thisMonth
                          ? null
                          : new Date().toISOString(),
                      )
                    }
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      draftFilters.thisMonth
                        ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                        : "border-white/10 bg-[#07111f] text-slate-400"
                    }`}
                  >
                    <span>This Month</span>

                    <CalendarDays className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-bold text-slate-400 hover:bg-white/5"
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-black text-slate-950 hover:bg-yellow-300"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </section>

        {/* ==========================================
            REFRESHING
        =========================================== */}

        {isRefreshing && (
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-3">
            <RefreshCw className="h-4 w-4 animate-spin text-yellow-400" />

            <p className="text-sm font-medium text-yellow-300">
              Updating the transaction log...
            </p>
          </div>
        )}

        {/* ==========================================
            ERROR
        =========================================== */}

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-300">
              {error?.response?.data?.message ||
                error?.message ||
                "Unable to load transactions."}
            </p>
          </div>
        )}

        {/* ==========================================
            TRANSACTION LIST
        =========================================== */}

        <section className="overflow-hidden rounded-2xl border border-yellow-500/10 bg-[#0b1726] shadow-2xl">
          {/* Desktop heading */}

          <div className="hidden grid-cols-[1.5fr_1fr_1fr_auto] gap-4 border-b border-white/10 bg-black/20 px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 sm:grid">
            <span>Transaction</span>
            <span>Category</span>
            <span>Date</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Empty */}

          {(!transaction || transaction.length === 0) && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400/10">
                <Skull className="h-8 w-8 text-yellow-400" />
              </div>

              <h2 className="text-lg font-bold">No treasure found</h2>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                No transactions match your current log.
              </p>

              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-black text-slate-950 hover:bg-yellow-300"
              >
                <Plus className="h-4 w-4" />
                Add First Transaction
              </button>
            </div>
          )}

          {/* Transaction rows */}

          {transaction?.map((item) => {
            const isIncome = item.type === "Income";

            return (
              <article
                key={item._id}
                className="border-b border-white/5 px-4 py-4 transition hover:bg-white/[0.03] sm:px-5"
              >
                {/* Mobile */}

                <div className="flex items-start justify-between gap-3 sm:hidden">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        isIncome
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-red-400/10 text-red-400"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpFromLine className="h-5 w-5" />
                      ) : (
                        <ArrowDownToLine className="h-5 w-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-bold text-white">
                        {item.category}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.type} • {formatDate(item.createdAt)}
                      </p>

                      <p
                        className={`mt-1 text-sm font-black ${
                          isIncome ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatAmount(item.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-white/10 hover:text-yellow-400"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingTransaction(item)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-400/10 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Desktop */}

                <div className="hidden grid-cols-[1.5fr_1fr_1fr_auto] items-center gap-4 sm:grid">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isIncome
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-red-400/10 text-red-400"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpFromLine className="h-5 w-5" />
                      ) : (
                        <ArrowDownToLine className="h-5 w-5" />
                      )}
                    </div>

                    <div>
                      <p className="font-bold text-white">{item.type}</p>

                      <p
                        className={`text-sm font-black ${
                          isIncome ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatAmount(item.amount)}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm text-slate-400">
                    {item.category}
                  </span>

                  <span className="text-sm text-slate-400">
                    {formatDate(item.createdAt)}
                  </span>

                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-yellow-400/10 hover:text-yellow-400"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingTransaction(item)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-400/10 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* ==========================================
            PAGINATION
        =========================================== */}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Page <span className="font-bold text-slate-300">{currentPage}</span>{" "}
            of <span className="font-bold text-slate-300">{maxPage ?? 1}</span>
          </p>

          <div className="flex justify-between gap-2 sm:justify-end">
            <button
              type="button"
              disabled={currentPage <= 1 || isRefreshing}
              onClick={() => changePage(currentPage - 1)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0d1b2a] px-4 py-2.5 text-sm font-bold text-slate-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-yellow-400 px-3 text-sm font-black text-slate-950">
              {currentPage}
            </div>

            <button
              type="button"
              disabled={currentPage >= (maxPage ?? 1) || isRefreshing}
              onClick={() => changePage(currentPage + 1)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0d1b2a] px-4 py-2.5 text-sm font-bold text-slate-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================
          CREATE MODAL
      =========================================== */}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-yellow-500/20 bg-[#0b1726] p-5 shadow-2xl sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-400">
                  New Entry
                </p>

                <h2 className="mt-1 text-xl font-black">Add Transaction</h2>
              </div>

              <button
                type="button"
                onClick={closeCreateModal}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {transactionForm}
          </div>
        </div>
      )}

      {/* ==========================================
          EDIT MODAL
      =========================================== */}

      {editingTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-yellow-500/20 bg-[#0b1726] p-5 shadow-2xl sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-400">
                  Modify Log
                </p>

                <h2 className="mt-1 text-xl font-black">Edit Transaction</h2>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {transactionForm}
          </div>
        </div>
      )}

      {/* ==========================================
          DELETE MODAL
      =========================================== */}

      {deletingTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-[#0b1726] p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-400/10">
              <Trash2 className="h-6 w-6 text-red-400" />
            </div>

            <h2 className="mt-4 text-xl font-black">Abandon this entry?</h2>

            <p className="mt-2 text-sm text-slate-500">
              This transaction will be permanently removed from your log.
            </p>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setDeletingTransaction(null)}
                className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-400 hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-black text-white hover:bg-red-400 disabled:opacity-50"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
