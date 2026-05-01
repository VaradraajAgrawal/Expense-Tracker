const middleware = require("../middleware/errorFun");
const User = require("../models/User");
const ErrorHandler = require("../utils/prac");

// ─── Helper ──────────────────────────────────────────────────────────────────
// Generates tokens, stores refresh token in DB, sends cookie + JSON response
const sendToken = async (statusCode, user, res) => {
  // No need to pass user._id — instance methods use `this` internally
  const access = user.accessToken();
  const refresh = user.refreshToken();

  // findByIdAndUpdate skips pre("save"), so password won't be re-hashed
  await User.findByIdAndUpdate(user._id, { getRefreshToken: refresh });

  const cookieOptions = {
    httpOnly: true, // not accessible via JS
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // cross-site in prod
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  };

  res.status(statusCode).cookie("refreshToken", refresh, cookieOptions).json({
    success: true,
    token: access,
    user,
  });
};

// ─── Create User ──────────────────────────────────────────────────────────────
const createUser = middleware(async (req, res, next) => {
  const { name, Age, email, password, Transaction } = req.body;

  // Validate required fields (Transaction is optional)
  if (!name || !Age || !email || !password) {
    return next(new ErrorHandler("Required field is missing", 400));
  }

  // Check if email already exists to give a clear error
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("Email already registered", 409));
  }

  const newUser = await User.create({
    name,
    Age,
    email,
    password,
    Transaction,
  });

  await sendToken(201, newUser, res);
});

// ─── Get User By ID ───────────────────────────────────────────────────────────
const getUserId = middleware(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("User ID is required", 400));
  }

  const data = await User.findById(id);

  // Handle case where no user matches the given ID
  if (!data) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data,
  });
});

// ─── User Login ───────────────────────────────────────────────────────────────
const userLogin = middleware(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  // `.select("+password")` is needed because password has select: false in schema
  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser) {
    return next(new ErrorHandler("Invalid email or password", 401)); // vague on purpose for security
  }

  const isMatched = await existingUser.comparePassword(password);

  if (!isMatched) {
    return next(new ErrorHandler("Invalid email or password", 401)); // same message, no hints
  }

  await sendToken(200, existingUser, res);
});

const refreshToken = middleware(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    next(new ErrorHandler("No token", 404));
  }

  jwt.verify(token, process.env.REFRESH, async (err, decode) => {
    if (err) {
      return next(new ErrorHandler("Invalid Token", 404));
    }
    const user = await User.findOne({ _id: decode.id, getRefreshToken: token });
    if (!user) {
      return next(new ErrorHandler("Not valid User", 400));
    }

    const newAccessToken = user.accessToken();

    res.status(200).json({
      success: true,
      token: newAccessToken,
      userData: user,
    });
  });
});

// ─── Exports ──────────────────────────────────────────────────────────────────
// ❌ Before: userLogin was missing from exports — caused undefined handler & loop
module.exports = { createUser, getUserId, userLogin, refreshToken };
