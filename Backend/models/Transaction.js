const { default: mongoose } = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    type: String,
    amount: Number,
    category: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This refers to your User model
      required: true,
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;

// "type": "Expense",
// "amount": 300,
// "category": "Electronics
