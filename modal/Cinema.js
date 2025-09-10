const CinemaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String }
});

module.exports = mongoose.model("Cinema", CinemaSchema);
