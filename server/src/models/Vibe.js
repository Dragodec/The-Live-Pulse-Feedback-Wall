const mongoose = require("mongoose");

const vibeSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    emoji: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10,
    },
  },
  {
    timestamps: true,
  }
);

vibeSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Vibe", vibeSchema);