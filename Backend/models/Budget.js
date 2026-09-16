const mongoose = require("mongoose");

const { Schema } = mongoose;

const budgetSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    limit: {
      type: Number,
    },

    currentDate: {
      type: Date,
    },

    history: [
      {
        oldData: {},
        newData: {},
        isActive: {
          type: Boolean,
        },
        leftOut: {},
      },
    ],
  },
  { timestamps: true },
);

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
