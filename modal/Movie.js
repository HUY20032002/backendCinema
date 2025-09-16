const mongoose = require("mongoose");
const slugify = require("slugify");

const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên phim
    slug: { type: String, unique: true }, // slug tự tạo từ name
    description: { type: String },
    ageRating: { type: String },
    genre: [{ type: String }],
    duration: { type: Number },
    releaseDate: { type: Date },
    bannerUrl: { type: String },
    trailerUrl: { type: String },
    language: { type: String },
    subtitle: { type: Boolean, default: false },
    format: { type: String, enum: ["2D", "3D", "IMAX"], default: "2D" },
    status: {
      type: String,
      enum: ["coming", "showing", "ended"],
      default: "coming",
    },
    ratingAvg: { type: Number, min: 0, max: 10, default: 0 },
    ratingCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// 🔥 Tự động tạo slug từ name
MovieSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true, // chữ thường hết
      strict: true, // loại bỏ ký tự đặc biệt
    });
  }
  next();
});

module.exports = mongoose.model("Movie", MovieSchema);
