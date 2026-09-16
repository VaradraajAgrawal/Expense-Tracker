const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");
const budgetService = require("../Service/BudgetService");
const { facetFunction } = require("../utils/HelperFunction");
const getBudgetService = require("../Service/getBudgetService");

const budgetUpdate = async (req, res) => {
  let { limit, currentDate } = req.body;
  let parsedDate;
  let compareDate = 27;

  if (!limit && !currentDate) {
    console.log("Error Occured!!");
  }
  if (limit < 0) {
    throw new Error("Limit cannot be negative!!");
  }
  if (currentDate > compareDate) {
    throw new Error("current Date Invalid!!");
  }

  const updatedBudget = await budgetService({
    limit,
    currentDate,
    user: req.user,
  });

  res.status(200).json({
    success: true,
    updatedBudget,
  });
};

const getBudget = async (req, res) => {
  const allData = await getBudgetService(req.user);

  res.status(200).json(allData);
};

module.exports = { budgetUpdate, getBudget };
