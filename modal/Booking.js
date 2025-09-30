const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    showtimeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtime",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // ✅ SỬA: Không bắt buộc nếu chưa có user system
    },
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    seats: [
      {
        seatId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Seat",
          required: true,
        },
        seatPosition: { type: String, required: true },
        price: { type: Number, required: true },
        type: { type: String, enum: ["normal", "vip", "couple"] },
      },
    ],
    totalAmount: { type: Number, required: true },
    bookingCode: { type: String, unique: true, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    expiresAt: { type: Date },
    paymentMethod: {
      type: String,
      enum: ["cash", "credit_card", "momo", "zalopay"],
      default: "cash",
    },
  },
  {
    timestamps: true,
  }
);

// Tự động generate booking code
BookingSchema.pre("save", async function (next) {
  if (!this.bookingCode) {
    this.bookingCode = `BK${Date.now()}${Math.random()
      .toString(36)
      .substr(2, 5)
      .toUpperCase()}`;
  }
  next();
});

module.exports =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
