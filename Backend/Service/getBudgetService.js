const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");
const { facetFunction } = require("../utils/HelperFunction");

const dateFunction = (date) => {
  const end = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());

  if (isNaN(date.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid Date!!");
  }

  return {
    start: date,
    end,
  };
};

const recentTransaction = async (fil) => {
  if (!fil) {
    return [];
  }

  const sort = { createdAt: -1 };

  const data = await Transaction.find(fil).sort(sort);

  return data;
};

const getBudgetService = async (user) => {
  const budget = await Budget.findOne({
    user: user._id,
  });

  // No budget document exists
  if (!budget) {
    return {
      budget: null,
      summary: null,
      transactions: [],
    };
  }

  const { start, end } = dateFunction(budget.currentDate);

  const fil = {
    user: user._id,
    createdAt: {
      $gte: start,
      $lte: end,
    },
  };

  const [facetData, transactions] = await Promise.all([
    facetFunction(fil),
    recentTransaction(fil),
  ]);

  const { netValue, totalIncome, totalExpense, totalTransaction } = facetData;

  const expensePercentage = Number(
    ((totalExpense / budget.limit) * 100).toFixed(2),
  );

  const remainingBudget = Math.floor(budget.limit + netValue);

  return {
    budget: budget.limit,

    summary: {
      Budget: budget.limit,
      totalExpense,
      totalIncome,
      totalTransaction,
      remainingBudget,
      netValue,
      expensePercentage,
    },

    transactions,
  };
};

module.exports = getBudgetService;
