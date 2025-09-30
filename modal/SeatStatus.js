const mongoose = require("mongoose");

const SeatStatusSchema = new mongoose.Schema(
  {
    showtimeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtime",
      required: true,
    },
    seatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seat",
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "booked", "reserved", "disabled"],
      default: "available",
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    reservedUntil: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// 🔥 Đảm bảo mỗi ghế trong suất chiếu chỉ có 1 trạng thái
SeatStatusSchema.index({ showtimeId: 1, seatId: 1 }, { unique: true });

// 🔥 FIX: Kiểm tra nếu model đã tồn tại thì sử dụng, không thì tạo mới
module.exports =
  mongoose.models.SeatStatus || mongoose.model("SeatStatus", SeatStatusSchema);
