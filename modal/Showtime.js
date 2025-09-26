const mongoose = require("mongoose"); // 👈 thêm dòng này

const ShowtimeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  seats: [
    {
      seatId: { type: mongoose.Schema.Types.ObjectId, ref: "Seat" },
      status: {
        type: String,
        enum: ["available", "booked", "pending"],
        default: "available",
      },
    },
  ],
});

module.exports = mongoose.model("Showtime", ShowtimeSchema);
