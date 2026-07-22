const middleware = require("../middleware/errorFun");
const User = require("../models/User");
const ErrorHandler = require("../utils/prac");
const jwt = require("jsonwebtoken");

const AuthFunction = middleware(async (req, res, next) => {
  const Auth = req.headers.authorization;
  console.log(Auth);

  if (!Auth || !Auth.startsWith("Bearer")) {
    return next(new ErrorHandler("Token Error", 400));
  }
  // Access token here and not Refresh Token //
  let token = Auth.split(" ")[1];
  try {
    const decode = await jwt.verify(token, process.env.SECRET);
    // We search by ID and not _id as when we used .sign(id: this._id), (here it is packed as ID so when we call it in verify we use ID) this made a new object with key of id and not _id moreover req.user will contain _id and not id as we are fetching data from database//
    req.user = await User.findById(decode.id);

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "TOKEN_EXPIRED" });
  }
});

module.exports = AuthFunction;
