const middleware = require("../middleware/errorFun");
const User = require("../models/User");
const ErrorHandler = require("../utils/prac");

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

  // Express Taking this Stuff to Frontend when called//
  res.status(201).json({
    success: true,
    UserData: newUser,
  });
});

module.exports = createUser;

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

module.exports = getUserId;
