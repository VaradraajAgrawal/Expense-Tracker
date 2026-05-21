const jwt = require("jsonwebtoken");
const middleware = require("../middleware/errorFun");
const Transcation = require("../models/Transaction");
const ErrorHandler = require("../utils/prac");
const Transaction = require("../models/Transaction");

// ================= CRUD OPERATIONS ================= //
const createTransaction = middleware(async (req, res, next) => {
  const { type, amount, category } = req.body;
  const users = req.user;
  if (!type || !amount || !category) {
    return next(new ErrorHandler("Fields are empty!!", 400));
  }
  if (!users) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  // In payload as we have ID of user i.e Token, we search for user with ID as a parameter and if we use name or anything else it will give an error of undefined //
  //   jwt.verify(token, process.env.REFRESH, async (err, decode) => {
  //     if (err) {
  //       return next(new ErrorHandler("Invalid Token", 400));
  //     }
  //     user = await User.findById(decode.id).populate("Transaction");
  //   });

  const transaction = await Transcation.create({
    type,
    amount,
    category,
    user: users._id,
  });

  // Need to add Transaction to User and save it  or else it would be empty array //
  users.Transaction.push(transaction._id);
  await users.save();

  res.status(201).json({
    success: true,
    transaction,
  });
});

const deleteTransaction = middleware(async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Transaction not found!!", 404));
  }
  await Transcation.findOneAndDelete({ _id: id, user: req.user._id });
  user.Transaction.pull(id);

  await user.save();

  res.status(200).json({
    success: true,
    message: "Transaction got deleted",
    user,
  });
});

const updateTransaction = middleware(async (req, res, next) => {
  const updated = await Transcation.findByIdAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updated) {
    return next(new ErrorHandler("Transaction not Found", 404));
  }

  res.status(200).json({
    success: true,
    data: updated,
  });
});

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

const oneYearCalc = async (year, user) => {
  const date = new Date(year);
  const nm = new Date(Number(date.getFullYear()) + 1, 0, 1);
  console.log(nm);

  let calculator = await facetFunction(date, nm, user);
  return calculator;
};

const yearAndMonthCalculator = async (start, end, user) => {
  const strdate = new Date(start);
  const enddate = new Date(end);

  let calculator = await facetFunction(strdate, enddate, user);

  return calculator;
};

const specificMonthCalculator = async (month, user) => {
  const date = new Date(month);
  const sm = new Date(date.getFullYear(), date.getMonth(), 1);
  const nm = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  let calculateAmt = await facetFunction(sm, nm, user);
  return calculateAmt;
};

const helpThisMonth = async (user) => {
  const now = new Date();
  let sm = new Date(now.getFullYear(), now.getMonth(), 1);
  let nm = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  let calcu = await facetFunction(sm, nm, user);
  return calcu;
};

// ================= Calculation Main Function ================= //
const stats = middleware(async (req, res, next) => {
  const { thisMonth, startDate, endDate, thisYear, page } = req.query;

  let cal;
  // Current Month
  if (thisMonth && !startDate && !endDate && !thisYear) {
    cal = await helpThisMonth(req.user);
  }

  // Specific Month
  else if (startDate && !endDate && !thisYear) {
    cal = await specificMonthCalculator(startDate, req.user);
  }

  // Date Range
  else if (startDate && endDate && !thisYear) {
    cal = await yearAndMonthCalculator(startDate, endDate, req.user);
  }

  // Specific Year
  else if (thisYear) {
    cal = await oneYearCalc(thisYear, req.user);
  } else {
    return next(new ErrorHandler("Invalid Query Parameters", 400));
  }

  res.status(200).json({
    success: true,
    cal,
  });
});

// ================= ALL TRANSACTION  =================
const normalView = middleware(async (req, res, next) => {
  const allTra = await Transcation.find({ user: req.user._id });
  if (allTra.length === 0) {
    return next(new ErrorHandler("Transaction Error", 400));
  }
  res.status(200).json({
    success: true,
    allTra,
  });
});
// ================= Pagination Helper Function =================
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
    maxPage,
    filtered,
    parse,
  };
};

// ================= CURRENT MONTH =================
const monthFilter = async (user, page) => {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const limitAmt = 10;
  const fil = {
    user: user._id,
    createdAt: {
      $gte: thisMonth,
      $lt: nextMonth,
    },
  };

  let { maxPage, filtered, parse } = await paginationHelper(page, fil);
  return filtered;
};

// ================= SPECIFIC MONTH =================
const specificMonth = async (month, user, page) => {
  const parsedDate = new Date(month);

  if (isNaN(parsedDate)) {
    throw new ErrorHandler("Invalid Month", 400);
  }

  const startMonth = new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    1,
  );

  const nextMonth = new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth() + 1,
    1,
  );

  let fil = {
    user: user._id,
    createdAt: { $gte: startMonth, $lt: nextMonth },
  };

  let { maxPage, filtered, parse } = await paginationHelper(page, fil);
  return { maxPage, filtered, parse };
};

// ================= SPECIFIC YEAR =================
const oneYear = async (year, user) => {
  const startYear = new Date(year, 0, 1);

  const nextYear = new Date(Number(year) + 1, 0, 1);

  if (isNaN(startYear) || isNaN(nextYear)) {
    throw new ErrorHandler("Invalid Year", 400);
  }

  const filtered = await Transaction.find({
    user: user._id,
    createdAt: {
      $gte: startYear,
      $lt: nextYear,
    },
  });

  return filtered;
};

// ================= CUSTOM DATE RANGE =================
const rangeFilter = async (startDate, endDate, user) => {
  const start = new Date(startDate);

  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
    throw new ErrorHandler("Invalid Date Range", 400);
  }

  const filtered = await Transaction.find({
    user: user._id,
    createdAt: {
      $gte: start,
      $lt: end,
    },
  });

  return filtered;
};

// ================= MAIN FILTER =================
const mainFilter = middleware(async (req, res, next) => {
  const { thisMonth, startDate, endDate, thisYear, page } = req.query;

  let data;

  // Current Month
  if (thisMonth && !startDate && !endDate && !thisYear) {
    data = await monthFilter(req.user, page);
  }

  // Specific Month
  else if (startDate && !endDate && !thisYear) {
    data = await specificMonth(startDate, req.user);
  }

  // Date Range
  else if (startDate && endDate && !thisYear) {
    data = await rangeFilter(startDate, endDate, req.user);
  }

  // Specific Year
  else if (thisYear) {
    data = await oneYear(thisYear, req.user);
  } else {
    return next(new ErrorHandler("Invalid Query Parameters", 400));
  }

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});

module.exports = {
  normalView,
  createTransaction,
  deleteTransaction,
  stats,
  updateTransaction,
  mainFilter,
};
