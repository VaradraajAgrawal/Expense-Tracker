const jwt = require("jsonwebtoken");
const middleware = require("../middleware/errorFun");
const Transcation = require("../models/Transaction");
const ErrorHandler = require("../utils/prac");
const { paginationHelper, facetFunction } = require("../utils/HelperFunction");
const transactionValidation = require("../utils/transactionValidation");
const transactionFilter = require("../utils/transactionFilter");

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

// ================= Calculation Main Function ================= //
const stats = middleware(async (req, res, next) => {
  let fil;
  const validated = transactionValidation(req.query);
  fil = transactionFilter(validated, req.user);
  let { totalTransaction, totalExpense, totalIncome, netValue } =
    await facetFunction(fil);

  res.status(200).json({
    success: true,
    totalTransaction,
    totalExpense,
    totalIncome,
    netValue,
  });
});

// ================= Pagination Main Function ================= //
const mainFilter = middleware(async (req, res, next) => {
  let validated = transactionValidation(req.query);

  let { fil, sorted } = transactionFilter(validated, req.user);
  let { totalDocuments, maxPage, filtered, parse } = await paginationHelper(
    fil,
    sorted,
    validated.page,
  );

  res.status(200).json({
    success: true,
    totalDocuments,
    maxPage,
    filtered,
    parse,
  });
});

module.exports = {
  createTransaction,
  deleteTransaction,
  stats,
  updateTransaction,
  mainFilter,
};
