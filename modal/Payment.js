const PaymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["cash", "momo", "vnpay"], required: true },
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  transactionId: { type: String }, // mã giao dịch từ cổng thanh toán
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);
