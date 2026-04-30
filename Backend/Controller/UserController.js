const middleware = require("../middleware/errorFun");
const User = require("../models/User");
const ErrorHandler = require("../utils/prac");
const jwtVerify = require("../middleware/jwt");

// Helper Function : takes in user data , statuscode as using it for different purpose 1. creating new User, 2. for login purpose , and lastly res for sending data through express //
const sendToken = async (statusCode, user, res) => {
  const access = user.accessToken(user._id);
  const refresh = user.refreshToken(user._id); // Ensure this matches schema method name

  // This bypasses pre-save hook perfectly
  await User.findByIdAndUpdate(user._id, { getRefreshToken: refresh });

  const options = {
    httpOnly: true,
    secure: true, // Secure only in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.status(statusCode).cookie("refreshToken", refresh, options).json({
    success: true,
    token: access,
    user,
  });
};

const createUser = middleware(async (req, res, next) => {
  // Added Transaction here so it's defined
  const { name, Age, email, password, Transaction } = req.body;

  if (!name || !Age || !email || !password) {
    return next(new ErrorHandler("Field is missing", 400));
  }

  const newUser = await User.create({
    name,
    Age,
    Transaction,
    email,
    password,
  });

  await sendToken(201, newUser, res);
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

const userLogin = middleware(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Invalid Entry", 401));
  }

  // If we dont select password then NewUser will not contain password in it //
  const NewUser = await User.findOne({ email }).select("+password");

  if (!NewUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  const isMatched = await NewUser.comparePassword(password);

  if (!isMatched) {
    return next(new ErrorHandler("Password not Matching!!", 401));
  }

  await sendToken(200, NewUser, res);
});

module.exports = { getUserId, createUser };
