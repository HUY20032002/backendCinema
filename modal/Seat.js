const mongoose = require("mongoose"); // 👈 thêm dòng này

const SeatSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  row: { type: String, required: true }, // A, B, C
  number: { type: Number, required: true }, // 1,2,3...
  type: { type: String, enum: ["normal", "vip", "couple"], default: "normal" },
});

module.exports = mongoose.model("Seat", SeatSchema);
