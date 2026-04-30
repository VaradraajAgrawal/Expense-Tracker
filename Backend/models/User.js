const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  Age: { type: Number, required: true },
  email: { type: String, unique: true },
  password: { type: String, select: false },
  Transaction: {
    type: mongoose.Schema.Types.ObjectId,
  },
  getRefreshToken: { type: String, select: false },
});

// Next is necessary as if not included the request will hit infinite loop & next() transfers it to forward step //
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.refreshToken = function (userId) {
  return jwt.sign({ id: userId }, process.env.REFRESH, { expiresIn: "7d" });
};

UserSchema.methods.accessToken = function (userId) {
  return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: "15m" });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
