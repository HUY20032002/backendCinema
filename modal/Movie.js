const mongoose = require("mongoose");
const slugify = require("slugify");

const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên phim
    slug: { type: String, unique: true }, // slug tự tạo từ name
    description: { type: String }, // mô tả
    ageRating: { type: String }, // phân loại độ tuổi
    genre: [{ type: String }], // thể loại phim
    duration: { type: Number }, // thời lượng phim (phút)
    releaseDate: { type: Date }, // ngày khởi chiếu
    bannerUrl: { type: String }, // ảnh bìa
    trailerUrl: { type: String }, // link trailer
    subtitle: { type: Boolean, default: false }, // có phụ đề hay không
    format: { type: String, enum: ["2D", "3D", "IMAX"], default: "2D" }, // định dạng
    status: {
      type: String,
      enum: ["coming", "showing", "ended"],
      default: "coming",
    }, // trạng thái: sắp chiếu, đang chiếu, ngừng chiếu
    ratingAvg: { type: Number, min: 0, max: 10, default: 0 }, // điểm đánh giá trung bình
    ratingCount: { type: Number, default: 0 }, // số lượng đánh giá
    isDeleted: { type: Boolean, default: false }, // xóa mềm
    deletedAt: { type: Date, default: null }, // thời gian xóa
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
