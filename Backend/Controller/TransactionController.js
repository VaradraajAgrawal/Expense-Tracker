const jwt = require("jsonwebtoken");
const middleware = require("../middleware/errorFun");
const Transcation = require("../models/Transaction");
const ErrorHandler = require("../utils/prac");

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
  await Transcation.findOneAndDelete(id);
  user.Transaction.pull(id);

  await user.save();

  res.status(200).json({
    success: true,
    message: "Transaction got deleted",
    user,
  });
});

const stats = middleware(async (req, res, next) => {
  const allTransaction = await Transcation.countDocuments({
    user: req.user._id,
  });
  // const detail = await Transcation.aggregate([
  //   {
  //     $match: { user: req.user._id },
  //   },
  //   {
  //     $group: {
  //       _id: "$category",
  //       totalAmount: { $sum: "$amount" },
  //       totalTransaction: { $sum: 1 },
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       category: "$_id",
  //       Amount: "$totalAmount",
  //       Transaction: "$totalTransaction",
  //     },
  //   },
  // ]);

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

  // if (detail.length < 1) {
  //   return res.json({
  //     success: true,
  //     data: [],
  //   });
  // }
  // res.status(200).json({
  //   success: true,
  //   detail,
  //   allTransaction,
  // });
  const result = detailAdvance[0];
  res.status(200).json({
    totalAmt: result.overallStats[0].AllAmount,
    totalTransaction: result.overallStats[0].Alltransaction,
    breakdown: result.Categorized,
  });
});

module.exports = { createTransaction, deleteTransaction, stats };
