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

const monthFilter = async (user) => {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const filtered = await Transcation.find({ user: user._id })
    .where("createdAt")
    .gte(thisMonth)
    .lte(nextMonth);

  return filtered;
};

const speMonth = async (month, user) => {
  const now = new Date(month);
  const sm = new Date(now.getFullYear(), now.getMonth(), 1);
  const nm = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const filtered = await Transaction.find({ user: user._id })
    .where("createdAt")
    .gte(sm)
    .lt(nm); // As lte would consider 12:00 in same month //
  return filtered;
};

const yrsMnt = async (strMonth, endMonth, user) => {
  let strDate = new Date(strMonth);
  let endDate = new Date(endMonth);

  strDate = new Date(
    strDate.getFullYear(),
    strDate.getMonth(),
    strDate.getDate(),
  );
  endDate = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
  );

  const filtered = await Transaction.find({ user: user._id })
    .where("createdAt")
    .gte(strDate)
    .lt(endDate);

  return filtered;
};

const mainFilter = middleware(async (req, res, next) => {
  const { thisMonth, startDate, endDate } = req.query;

  let data;
  if (thisMonth && !startDate && !endDate) {
    data = await monthFilter(req.user);
  } else if (startDate && !endDate && !thisMonth) {
    data = await speMonth(startDate, req.user);
  } else if (startDate && endDate) {
    data = await yrsMnt(startDate, endDate, req.user);
  } else if (year && !month) {
    console.log(year);
  } else {
    console.log("ERROR OCCURED");
  }

  res.status(200).json({
    success: true,
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
