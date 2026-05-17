const jwt = require("jsonwebtoken");
const middleware = require("../middleware/errorFun");
const Transcation = require("../models/Transaction");
const ErrorHandler = require("../utils/prac");
const Transaction = require("../models/Transaction");

const createTransaction = middleware(async (req, res, next) => {
  const { title, amount, category } = req.body;
  const users = req.user;
  if (!title || !amount || !category) {
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
    title,
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

const stats = middleware(async (req, res, next) => {
  const detailAdvance = await Transcation.aggregate([
    {
      $match: { user: req.user._id },
    },
    {
      $facet: {
        // Task 1: Count all transactions
        overallStats: [
          {
            $group: {
              _id: null,
              totalCount: { $sum: 1 },
              grandTotalAmount: { $sum: "$amount" },
            },
          },
          {
            $project: {
              _id: 0,
              TotalTransaction: "$totalCount",
              TotalAmount: "$grandTotalAmount",
            },
          },
        ],
        Categorized: [
          {
            $group: {
              _id: "$category",
              Amount: { $sum: "$amount" },
              Transaction: { $sum: 1 },
            },
          },
        ],
      },
    },
  ]);

  const result = detailAdvance[0];
  res.status(200).json({
    totalAmt: result.overallStats[0].TotalAmount,
    totalTransaction: result.overallStats[0].TotalTransaction,
    breakdown: result.Categorized,
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
// ================= CURRENT MONTH =================
const monthFilter = async (user) => {
  const now = new Date();

  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const filtered = await Transaction.find({
    user: user._id,
    createdAt: {
      $gte: thisMonth,
      $lt: nextMonth,
    },
  });

  return filtered;
};

// ================= SPECIFIC MONTH =================
const specificMonth = async (month, user) => {
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

  const filtered = await Transaction.find({
    user: user._id,
    createdAt: {
      $gte: startMonth,
      $lt: nextMonth,
    },
  });

  return filtered;
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
  const { thisMonth, startDate, endDate, thisYear } = req.query;

  let data;

  // Current Month
  if (thisMonth && !startDate && !endDate && !thisYear) {
    data = await monthFilter(req.user);
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
