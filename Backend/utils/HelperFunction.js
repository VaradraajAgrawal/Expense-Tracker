let Transaction = require("../models/Transaction");

const paginationHelper = async (page, filter) => {
  let limitQauntity = 10;
  let parse = parseInt(page) || 1;

  let totalDocuments = await Transaction.countDocuments(filter);
  let maxPage = Math.ceil(totalDocuments / limitQauntity, 1);

  if (parse > maxPage || parse <= 0 || isNaN(parse)) {
    parse = 1;
  }

  let skip = (parse - 1) * limitQauntity;
  let filtered = await Transaction.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitQauntity);

  return {
    totalDocuments,
    maxPage,
    filtered,
    parse,
  };
};

const facetFunction = async (sm, nm, user) => {
  const calculateAmt = await Transaction.aggregate([
    {
      $match: { user: user._id, createdAt: { $gte: sm, $lt: nm } },
    },
    {
      $facet: {
        overAllStats: [
          {
            $group: {
              _id: null,
              toalIncomeAmount: {
                $sum: {
                  $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0],
                },
              },
              totalExpense: {
                $sum: {
                  $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0],
                },
              },
              totalTransaction: { $sum: 1 },
            },
          },
          {
            $project: {
              netValue: {
                $subtract: ["$toalIncomeAmount", "$totalExpense"],
              },
              totalExpense: "$totalExpense",
              totalIncome: "$toalIncomeAmount",
              totalTransaction: "$totalTransaction",
            },
          },
        ],
      },
    },
  ]);
  const result = calculateAmt[0];

  if (result.overAllStats.length === 0) {
    return {
      totalExpense: 0,
      totalIncome: 0,
      netValue: 0,
    };
  }

  return {
    totalTransaction: result.overAllStats[0].totalTransaction,
    totalExpense: result.overAllStats[0].totalExpense,
    totalIncome: result.overAllStats[0].totalIncome,
    netValue: result.overAllStats[0].netValue,
  };
};

module.exports = { facetFunction, paginationHelper };
