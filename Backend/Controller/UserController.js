const middleware = require("../middleware/errorFun");
const User = require("../models/User");
const ErrorHandler = require("../utils/prac");
const jwtVerify = require("../middleware/jwt");

const createUser = middleware(async (req, res, next) => {
  // Express Bringing from Frontend //
  const { name, Age, Transaction } = req.body;

  // Middleware Checking //
  if (!name || !Age) {
    return next(new ErrorHandler("Field is missing", 400));
  }

  // MongoDB Creating a new Document in Collection //
  const newUser = await User.create({
    name,
    Age,
    Transaction,
  });

  console.log(newUser._id.toString());

  //   JWT Authentication //
  const token = jwtVerify(newUser._id);

  if (!token) {
    return next(new ErrorHandler("Token Error", 400));
  }

  // Express Taking this Stuff to Frontend when called//
  res.status(201).json({
    success: true,
    UserData: newUser,
    token,
  });
});

const getUserId = middleware(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Id Error", 400));
  }

  const data = await User.findById(id);

  res.status(200).json({
    success: true,
    data,
  });
});

module.exports = { getUserId, createUser };
