const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  showtimeId: { type: mongoose.Schema.Types.ObjectId, ref: "Showtime", required: true },
  seats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seat" }], // danh sách ghế đã đặt
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
