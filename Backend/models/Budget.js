const mongoose = require("mongoose");
const User = require("../models/User");
const { Schema } = mongoose;

const budgetSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    limit: { type: Number },
    currentDate: { type: Date },
    history: [],
  },
  { timestamps: true },
);

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
