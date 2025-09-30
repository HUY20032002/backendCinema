const mongoose = require("mongoose");

const CinemaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, default: "Hà Nội" },
  address: { type: String, required: true },
});

module.exports =
  mongoose.models.Cinema || mongoose.model("Cinema", CinemaSchema);
