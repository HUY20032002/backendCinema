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
      // releaseDate,
      // posterUrl,
      // trailerUrl,
      // status,
    } = req.body;
    let movie;
    try {
      movie = await Movie.create({
        bannerUrl: img,
        name,
        description,
        genre,
        duration,
      });
      return res.status(201).json({ SM: "Tạo phim thành công", DT: movie });
    } catch (error) {
      return res.status(500).json({ EM: error.message, DT: movie });
    }
  }
  // Lay danh sach phim
  async getAllMovies(req, res) {
    try {
      const movie = await Movie.find();
      return res
        .status(200)
        .json({ SM: "Lấy danh sách phim thành công", DT: movie });
    } catch (error) {
      return res.status(500).json({ EM: error.message, DT: [] });
    }
  }
  //   Chi tiet phim
  async getMovieId(req, res) {
    return res.status(200).json({ message: "Chi tiet phim" });
  }

  //   Sua thong tin phim
  async updateMovie(req, res) {
    try {
      const movie = req.body;
      const data = await Movie.updateOne({ movie });
      return res.status(200).json({ SE: "Admin Sua Thong Tin Thanh Cong", DT });
    } catch (error) {}
  }
  //   Xoa phim
  async deleteMovie(req, res) {
    return res.status(200).json({ message: "Admin xoa phim" });
  }
}
module.exports = new MoviesController();
