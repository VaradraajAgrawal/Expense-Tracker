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
              Alltransaction: "$totalCount",
              AllAmount: "$grandTotalAmount",
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
    totalAmt: result.overallStats[0].AllAmount,
    totalTransaction: result.overallStats[0].Alltransaction,
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

const filtered = middleware(async (req, res, next) => {
  let date = await Transcation.find({ user: req.user._id });
  const fill = await Transaction.find({ user: req.user._id })
    .where("amount")
    .gte(50)
    .lte(200);

  let week = await Transaction.find({ user: req.user._id })
    .where("createdAt")
    .gte(Date.now() - 7 * 24 * 60 * 60 * 1000);

  let now = new Date();

  let reqDate = new Date(now.getFullYear(), now.getMonth(), 1);

  let month = await Transaction.find({
    user: req.user._id,
    createdAt: { $gte: reqDate },
  });

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
  ];

  months = months.indexOf("May");

  const filMonth = new Date(2026, months, 1);

  const dup = new Date(2026, months + 1, 1);
  const specificMonth = await Transaction.find({ user: req.user._id })
    .where("createdAt")
    .gte(filMonth)
    .lt(dup);

  console.log(specificMonth);

  res.status(200).json({
    success: true,
    data: fill,
    date,
  });
});

module.exports = {
  normalView,
  createTransaction,
  deleteTransaction,
  stats,
  filtered,
  updateTransaction,
};
