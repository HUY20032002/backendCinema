// Danh sách phim
const Movie = require("../../modal/Movie");
const cron = require("node-cron");
class MoviesController {
  async createMovie(req, res) {
    const {
      img,
      name,
      description,
      genre,
      duration,
      releaseDate,
      subtitle,
      trailerUrl,
      format,
      ageRating, // phân loại độ tuổi
    } = req.body;
    let movie;
    try {
      movie = await Movie.create({
        bannerUrl: img,
        name,
        description,
        genre,
        duration,
        releaseDate,
        trailerUrl,
        subtitle,
        format,
        ageRating, // phân loại độ tuổi
      });
      return res
        .status(201)
        .json({ message: "Create Movie Success", DT: movie });
    } catch (error) {
      return res.status(500).json({
        message: "Create Movie Fail",
        EM: error.message,
        DT: movie,
      });
    }
  }
  // Lấy danh sách phim chưa xóa mềm
  async getAllMovies(req, res) {
    try {
      const movies = await Movie.find({ isDeleted: false }); // filter điều kiện
      return res
        .status(200)
        .json({ message: "Get List Movie Success", DT: movies });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Get List Movie Fail", EM: error.message, DT: [] });
    }
  }
  // Lấy danh sách phim  xóa mềm
  async getSoftAllMovies(req, res) {
    try {
      const movies = await Movie.find({ isDeleted: true }); // filter điều kiện
      return res
        .status(200)
        .json({ message: "Get List Movie Success", DT: movies });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Get List Movie Fail", EM: error.message, DT: [] });
    }
  }

  //   Chi tiet phim
  async getMovieId(req, res) {
    try {
      const { id } = req.params;
      const data = await Movie.findById({ _id: id });
      return res.status(200).json({ message: "Get Movie Success", DT: data });
    } catch (error) {
      return res
        .status(200)
        .json({ message: "Get Movie Success", ER: error.message, DT: data });
    }
  }

  //   Sua thong tin phim
  async updateMovie(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const movie = await Movie.findByIdAndUpdate(id, data, { new: true });

      if (!movie) {
        return res.status(404).json({ message: "not Found", DT: null });
      }

      return res
        .status(200)
        .json({ message: "Update Movie Success", DT: movie });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Update Movie Fail", EM: error.message, DT: null });
    }
  }

  //   Xoa phim
  async deleteSoftMovie(req, res) {
    const { id } = req.params; // ✅ lấy đúng id
    console.log(id);
    try {
      await Movie.findByIdAndUpdate(id, { isDeleted: true });
      res.status(200).json({ message: "Admin Xoa Mem Thanh Cong" });
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Admin xoa phim That Bai", EM: error.message });
    }
  }
  async deleteMovie(req, res) {
    res.status(200).json({ message: "Admin Xoa Mem Thanh Cong" });
  }
  // Job chạy hàng ngày lúc 00:00
  startMovieCleanupJob = () => {
    cron.schedule("0 0 * * *", async () => {
      console.log("🔄 Running movie cleanup job...");

      const now = new Date();

      try {
        // Điều kiện: releaseDate + 30 ngày < hôm nay
        const moviesToDelete = await Movie.updateMany(
          {
            releaseDate: { $lte: new Date(now.setDate(now.getDate() - 30)) },
            isDeleted: false,
          },
          { $set: { isDeleted: true } }
        );

        console.log(`✅ Movies soft deleted: ${moviesToDelete.modifiedCount}`);
      } catch (error) {
        console.error("❌ Error in movie cleanup job:", error);
      }
    });
  };
}
module.exports = new MoviesController();
