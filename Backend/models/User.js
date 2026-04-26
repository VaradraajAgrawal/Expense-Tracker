const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  Age: Number,
  Transaction: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
