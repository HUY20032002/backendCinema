const mongoose = require("mongoose"); // 👈 thêm dòng này

const RoomSchema = new mongoose.Schema({
  cinemaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
  name: { type: String, required: true }, // Ví dụ: "Phòng 1"
  rows: { type: Number, required: true }, // Số hàng
  cols: { type: Number, required: true }, // Số cột
  totalSeats: { type: Number, required: true }, // rows * cols
});

module.exports = mongoose.model("Room", RoomSchema);
