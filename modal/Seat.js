const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    row: { type: String, required: true },
    number: { type: Number, required: true },
    type: {
      type: String,
      enum: ["normal", "vip", "couple", "disabled"],
      default: "normal",
    },
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

SeatSchema.index({ roomId: 1, position: 1 }, { unique: true });

module.exports = mongoose.models.Seat || mongoose.model("Seat", SeatSchema);
