const SeatSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  row: { type: String },
  number: { type: Number },
  type: { type: String, enum: ["normal", "vip", "couple"], default: "normal" }
});

module.exports = mongoose.model("Seat", SeatSchema);
