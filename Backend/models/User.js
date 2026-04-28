const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  name: String,
  Age: Number,
  password: String,
  Transaction: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

UserSchema.pre("save", async function () {
  if (!this.Modified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
