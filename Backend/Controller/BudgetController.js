const Budget = require("../models/Budget");

const budgetUpdate = async (req, res) => {
  let { limit, currentDate } = req.body;

  if (!limit || !currentDate) {
    console.log("Error Occured!!");
  }
  if (isNaN(currentDate)) {
    throw new Error("current Date Invalid!!");
  }
  let datenow = new Date();
  let tryDate = new Date(
    datenow.getFullYear(),
    datenow.getMonth(),
    currentDate,
  );
  let invalidDate = new Date(datenow.getFullYear(), datenow.getMonth(), 28);

  if (tryDate > invalidDate) {
    throw new Error("Cannot set budget!!");
  }

  let updatedBudget = await Budget.findOneAndUpdate(
    {
      user: req.user._id,
    },
    { limit, currentDate: tryDate },
    { new: true },
  );
  console.log(updatedBudget);
  res.status(200).json({
    success: true,
  });
};
module.exports = budgetUpdate;
