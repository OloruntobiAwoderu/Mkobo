const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    balance: {
      type: Number,
      required: true
    },
    transactionStatus: {
      type: String,
      required: true
    },

    accountNumber: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction", transactionSchema);
