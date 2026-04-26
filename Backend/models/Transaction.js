const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  title: String,
  amount: Number,
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
