const RoomSchema = new mongoose.Schema({
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: "Cinema", required: true },
  name: { type: String, required: true },
  totalSeats: { type: Number }
});

module.exports = mongoose.model("Room", RoomSchema);
