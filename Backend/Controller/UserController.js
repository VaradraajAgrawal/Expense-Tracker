const middleware = require("../middleware/errorFun");
const User = require("../models/User");
const ErrorHandler = require("../utils/prac");
const Transaction = require("../models/Transaction");
const jwt = require("jsonwebtoken");
const Budget = require("../models/Budget");
// ─── Helper ──────────────────────────────────────────────────────────────────
// Generates tokens, stores refresh token in DB, sends cookie + JSON response
const sendToken = async (statusCode, user, res, transaction) => {
  // No need to pass user._id — instance methods use `this` internally
  const access = user.accessToken();
  const refresh = user.refreshToken();

  // findByIdAndUpdate skips pre("save"), so password won't be re-hashed and is not required here to be hashed again //
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      getRefreshToken: refresh,
    },
    { new: true },
  ).select("-password");

  const cookieOptions = {
    httpOnly: true, // not accessible via JS
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // cross-site in prod
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  };

  if (transaction && transaction.length > 0) {
    return res
      .status(statusCode)
      .cookie("refreshToken", refresh, cookieOptions)
      .json({
        success: true,
        token: access,
        updatedUser,
        transaction,
      });
  }
  res.status(statusCode).cookie("refreshToken", refresh, cookieOptions).json({
    success: true,
    token: access,
    updatedUser,
  });
};

// ─── Create User ──────────────────────────────────────────────────────────────
const createUser = middleware(async (req, res, next) => {
  let { name, Age, email, password, Transaction } = req.body;

  // Validate required fields (Transaction is optional)
  if (!name || !Age || !email || !password) {
    return next(new ErrorHandler("Required field is missing", 400));
  }
  if (!Transaction) {
    Transaction = [];
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

  const userBudget = await Budget.create({
    user: newUser._id,
    limit: 0,
    currentDate: 0,
    history: [],
  });

  await sendToken(201, newUser, res);
});

// ─── Get User By ID ───────────────────────────────────────────────────────────
const getUserId = middleware(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("User ID is required", 400));
  }

  const data = await User.findById(id).select("-password");

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

  // `.select("+password")` is needed because password has select: false  in schema and we populate User and get Transaction data //

  // const existingUser = await User.findOne({ email })
  //   .select("+password")
  //   .populate("Transaction");

  // Another way to fetch User and Transaction detail is that we use .find instead of populate . We should use populate for small details and .find for large details such as transactions will be many  //
  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser) {
    return next(new ErrorHandler("No user found", 404));
  }
  const isMatched = await existingUser.comparePassword(password);

  if (!isMatched) {
    return next(new ErrorHandler("Invalid email or password", 401)); // same message, no hints
  }
  const transaction = await Transaction.find({ user: isMatched._id });

  await sendToken(200, existingUser, res, transaction);
});

// Getting refresh token from cookies then veryfing it inside verify. Verify takes 2 argument err & decode here decode is userdata and err is error. We find user through the decode.id after verification. Verify cant store anything //
const refreshToken = middleware(async (req, res, next) => {
  const token = req.cookies.refreshToken;
  console.log("token", token);

  if (!token) {
    next(new ErrorHandler("No Token", 401));
  }
  // Decode has the userId as token is made with id then later that id is used to find User from DB //
  jwt.verify(token, process.env.REFRESH, async (err, decode) => {
    if (err) {
      return next(new ErrorHandler("TOKEN_EXPIRED", 401));
    }
    // Ensuring and Checking token is same i.e 2nd argument(getRefreshToken)
    const user = await User.findOne({ _id: decode.id, getRefreshToken: token });
    if (!user) {
      return next(new ErrorHandler("Not valid User", 400));
    }

    const newAccessToken = user.accessToken();

    res.status(200).json({
      success: true,
      token: newAccessToken,
    });
  });
});

// ─── Exports ──────────────────────────────────────────────────────────────────
module.exports = { createUser, getUserId, userLogin, refreshToken };
