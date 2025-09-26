const mongoose = require("mongoose"); // 👈 thêm dòng này

const CinemaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, default: "Hà Nội" },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Cinema", CinemaSchema);
