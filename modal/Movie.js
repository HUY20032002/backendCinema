const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: [{ type: String }], // ví dụ: ["Action", "Comedy"]
  duration: { type: Number }, // phút
  releaseDate: { type: Date },
  posterUrl: { type: String },
  trailerUrl: { type: String },
  status: { type: String, enum: ["coming", "showing", "ended"], default: "coming" }
});

module.exports = mongoose.model("Movie", MovieSchema);
