const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    cinemaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cinema",
      required: true,
    },
    name: { type: String, required: true },
    rows: { type: Number, required: true },
    cols: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    seatLayout: [[String]],
  },
  {
    timestamps: true,
  }
);

RoomSchema.index({ cinemaId: 1, name: 1 }, { unique: true });

module.exports = mongoose.models.Room || mongoose.model("Room", RoomSchema);
