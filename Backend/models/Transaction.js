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
transactionSchema.index({ user: 1, createdAt: -1 });

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
