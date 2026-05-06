const { default: mongoose } = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This refers to your User model
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
