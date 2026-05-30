let Transaction = require("../models/Transaction");
const ErrorHandler = require("../utils/prac");
const transactionSort = require("../utils/transactionSort");

const paginationHelper = async (filter, query) => {
  let filtered;
  let totalDocuments;
  let limitQauntity = 10;
  let parse = parseInt(query.page) || 1;
  totalDocuments = await Transaction.countDocuments(filter);

  // Math.max here takes 1 and if Math.ceil gives 0 it makes it 1 and  if the number is higher than 1 it automatically becomes maxPage //
  let maxPage = Math.max(Math.ceil(totalDocuments / limitQauntity), 1);

  if (parse > maxPage || parse <= 0 || isNaN(parse)) {
    parse = 1;
  }
  let sorted = transactionSort(query);
  console.log("Sorted ", sorted);

  let skip = (parse - 1) * limitQauntity;

  filtered = await Transaction.find(filter)
    .sort({ ...sorted })
    .skip(skip)
    .limit(limitQauntity);

  return {
    totalDocuments,
    maxPage,
    filtered,
    parse,
  };
};

const facetFunction = async (filter) => {
  if (!filter) {
    throw new ErrorHandler("No filter Provided", 400);
  }
  const calculateAmt = await Transaction.aggregate([
    {
      $match: { ...filter },
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
