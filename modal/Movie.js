const mongoose = require("mongoose");
const slugify = require("slugify");

const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    genre: [{ type: String }],
    ageRating: { type: String },
    duration: { type: Number },
    releaseDate: { type: Date },
    bannerUrl: { type: String },
    trailerUrl: { type: String },
    subtitle: [{ type: String }],
    format: [{ type: String, enum: ["2D", "3D", "IMAX"] }],
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

MovieSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
