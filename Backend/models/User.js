const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    Age: { type: Number, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, select: false },
    Transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction", // good practice to add ref
    },
    getRefreshToken: { type: String, select: false },
  },
  { timestamps: true }, // adds createdAt & updatedAt automatically
);

// Pre-save hook: only hashes password if it was modified
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return; // ✅ just return, no next() needed
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare plain password with hashed password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate short-lived access token using `this` (no need to pass userId)
UserSchema.methods.accessToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET, { expiresIn: "15m" });
};

// Generate long-lived refresh token using `this`
UserSchema.methods.refreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH, { expiresIn: "7d" });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
