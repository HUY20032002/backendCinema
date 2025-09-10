const ShowtimeSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: "Cinema", required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date }
});

module.exports = mongoose.model("Showtime", ShowtimeSchema);
