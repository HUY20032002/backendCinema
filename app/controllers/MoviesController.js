// Danh sách phim
const Movie = require("../../modal/Movie");
class MoviesController {
  async createMovie(req, res) {
    const {
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
      movie = await Movie.create({ name, description, genre, duration });
      return res.status(201).json({ SM: "Tạo phim thành công", DT: movie });
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
    return res.status(200).json({ message: "Admin sua thong tin phim" });
  }
  //   Xoa phim
  async deleteMovie(req, res) {
    return res.status(200).json({ message: "Admin xoa phim" });
  }
}
module.exports = new MoviesController();
