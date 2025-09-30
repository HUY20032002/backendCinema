const mongoose = require("mongoose");

const ShowtimeSchema = new mongoose.Schema(
  {
    cinemaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cinema",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    format: {
      type: String,
      enum: ["2D", "3D", "IMAX"],
      required: true,
    },
    language: { type: String, default: "Vietnamese" },
    subtitle: { type: String, default: "Vietnamese" },
    price: {
      normal: { type: Number, required: true },
      vip: { type: Number, required: true },
      couple: { type: Number, required: true },
    },
    availableSeats: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

ShowtimeSchema.index({
  roomId: 1,
  startTime: 1,
  endTime: 1,
});

module.exports =
  mongoose.models.Showtime || mongoose.model("Showtime", ShowtimeSchema);
