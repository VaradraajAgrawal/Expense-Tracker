const jwt = require("jsonwebtoken");
const middleware = require("../middleware/errorFun");
const Transcation = require("../models/Transaction");
const User = require("../models/User");
const ErrorHandler = require("../utils/prac");

const createTransaction = middleware(async (req, res, next) => {
  const { title, amount, category } = req.body;

  if (!(title || amount || category)) {
    return next(new ErrorHandler("Fields are empty!!", 400));
  }

  const token = req.cookies.refreshToken;

  let users;
  if (!token) {
    return next(new ErrorHandler("Token Error!!", 400));
  }
  // In payload as we have ID of user i.e Token, we search for user with ID as a parameter and if we use name or anything else it will give an error of undefined //
  //   jwt.verify(token, process.env.REFRESH, async (err, decode) => {
  //     if (err) {
  //       return next(new ErrorHandler("Invalid Token", 400));
  //     }
  //     user = await User.findById(decode.id).populate("Transaction");
  //   });

  const decode = jwt.verify(token, process.env.REFRESH);

  users = await User.findById(decode.id);

  const transaction = await Transcation.create({
    title,
    amount,
    category,
    user: users._id,
  });

  res.status(201).json({
    success: true,
    transaction,
  });
});

module.exports = { createTransaction };
