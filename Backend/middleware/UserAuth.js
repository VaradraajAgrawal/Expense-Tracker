const middleware = require("../middleware/errorFun");
const User = require("../models/User");
const ErrorHandler = require("../utils/prac");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const AuthFunction = middleware(async (req, res, next) => {
  const Auth = req.headers.authorization;

  if (!Auth || !Auth.startsWith("Bearer")) {
    return next(new ErrorHandler("Token Error", 400));
  }

  let token = Auth.split(" ")[1];

  const decode = jwt.verify(token, process.env.SECRET);

  req.user = await User.findById(decode._id);

  next();
});
