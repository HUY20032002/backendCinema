// Danh sách phim
const Movie = require("../../modal/Movie");
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
      return res.status(201).json({ SM: "Tạo phim thành công", DT: movie });
    } catch (error) {
      return res.status(500).json({ EM: error.message, DT: movie });
    }
  }
  // Lay danh sach phim
  async getAllMovies(req, res) {
    let movie;
    try {
      movie = await Movie.find();
      return res
        .status(200)
        .json({ SM: "Lấy danh sách phim thành công", DT: movie });
    } catch (error) {
      return res.status(500).json({ EM: error.message, DT: movie });
    }
  }
  //   Chi tiet phim
  async getMovieId(req, res) {
    return res.status(200).json({ message: "Chi tiet phim" });
  }

  //   Sua thong tin phim
  async updateMovie(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const movie = await Movie.findByIdAndUpdate(id, data, { new: true });

      if (!movie) {
        return res.status(404).json({ EM: "Không tìm thấy phim", DT: null });
      }

      return res
        .status(200)
        .json({ SM: "Cập nhật phim thành công", DT: movie });
    } catch (error) {
      return res.status(500).json({ EM: error.message, DT: null });
    }
  }

  //   Xoa phim
  async deleteMovie(req, res) {
    return res.status(200).json({ message: "Admin xoa phim" });
  }
}
module.exports = new MoviesController();
