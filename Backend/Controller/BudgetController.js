const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");
const budgetService = require("../Service/BudgetService");
const { facetFunction } = require("../utils/HelperFunction");

const budgetUpdate = async (req, res) => {
  let { limit, currentDate } = req.body;

  if (!limit || !currentDate) {
    console.log("Error Occured!!");
  }
  if (limit < 0) {
    throw new Error("Limit cannot be negative!!");
  }
  if (isNaN(currentDate) || currentDate > 27) {
    throw new Error("current Date Invalid!!");
  }

  const updatedBudget = await budgetService(limit, currentDate, req.user);

  res.status(200).json({
    success: true,
    updatedBudget,
  });
};

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
    return;
  }
  const sort = { createdAt: -1 };
  let data = await Transaction.find(fil).sort(sort);
  return data;
};

const budgetTransactionUpdate = async (req, res) => {
  let budget = await Budget.findOne({ user: req.user._id });
  if (!budget.limit) {
    console.log("No Budget!!");
    res.status(200).json({
      success: true,
      message: "No Budget as of now!!, Add a Budget!!",
    });
  } else {
    let { start, end } = dateFunction(budget.currentDate);
    let fil = { user: req.user._id };
    fil.createdAt = { $gte: start, $lte: end };

    const [facetData, transactions] = await Promise.all([
      facetFunction(fil),
      recentTransaction(fil),
    ]);
    const { netValue, totalIncome, totalExpense, totalTransaction } = facetData;
    const expensePercentage = Number(
      ((totalExpense / budget.limit) * 100).toFixed(2),
    );
    let remainingBudget = Math.floor(budget.limit + netValue);
    res.status(200).json({
      summary: {
        Budget: budget.limit,
        totalExpense,
        totalIncome,
        remainingBudget,
        netValue,
        expensePercentage,
      },
      transactions,
    });
  }
};

module.exports = { budgetUpdate, budgetTransactionUpdate };
