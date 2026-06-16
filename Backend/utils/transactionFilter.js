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

  let sorted;
  if (query.sort) {
    if (query.sort === "Latest") {
      sorted = {
        createdAt: -1,
      };
    }
    if (query.sort === "Highest") {
      sorted = {
        amount: -1,
      };
    }
    if (query.sort === "Lowest") {
      sorted = {
        amount: 1,
      };
    }
    if (query.sort === "Oldest") {
      sorted = {
        createdAt: 1,
      };
    }
  }

  if (query.category) {
    fil.category = query.category;
  }

  if (query.type) {
    fil.type = query.type;
  }

  // No need for min and max statement as it is being auto assigned from both statement //
  if (!query.Amt) {
    console.log("Nothing in Amount!!");
  } else {
    block1: if (query.Amt.min && query.Amt.max) {
      fil.amount = { $gte: Number(query.Amt.min) };
      fil.amount = { $lte: Number(query.Amt.max) };
      break block1;
    } else if (query.Amt.min || query.Amt.max) {
      if (query.Amt.min) {
        fil.amount = { $gte: Number(query.Amt.min) };
      }
      if (query.Amt.max) {
        fil.amount = { $lte: Number(query.Amt.max) };
      }
    }
  }
  console.log(fil);
  return { fil, sorted };
};

module.exports = transactionFilter;
