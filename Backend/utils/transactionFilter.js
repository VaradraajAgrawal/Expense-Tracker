const filterBoth = require("./Experiment");

const transactionFilter = (query, user) => {
  const filterData = filterBoth(query);

  let fil;

  fil = {
    user: user._id,
  };

  if (filterData) {
    fil.createdAt = {
      $gte: filterData.start,
      $lt: filterData.end,
    };
  }
  if (query.type === "Expense" || query.type === "Income") {
    fil.type = query.type;
  }

  if (query.category) {
    fil.category = query.category;
  }
  // No need for min and max statement as it is being auto assigned from both statement //
  if (query.min || query.max) {
    if (query.min) {
      fil.amount = { $gte: Number(query.min) };
    }
    if (query.max) {
      fil.amount = { $lte: Number(query.max) };
    }
  }
  return fil;
};

module.exports = transactionFilter;
