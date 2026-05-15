const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
    },

    currentToken: {
      type: Number,
      default: 0,
    },

    totalWaiting: {
      type: Number,
      default: 0,
    },

    averageWaitTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Queue", queueSchema);
