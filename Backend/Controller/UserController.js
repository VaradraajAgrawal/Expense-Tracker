const middleware = require("./middleware/middleware");
const User = require("./models/User");
const ErrorHandler = require("./utils/ErrorHandler");

const createUser = middleware(async (req, res) => {
  // Express Bringing from Frontend //
  const { name, Age, Transaction } = req.body;

  if (!name || !Age || !Transaction) {
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
