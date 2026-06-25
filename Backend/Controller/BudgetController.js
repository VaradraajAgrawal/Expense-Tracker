const Budget = require("../models/Budget");
const budgetService = require("../Service/BudgetService");

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
module.exports = budgetUpdate;
