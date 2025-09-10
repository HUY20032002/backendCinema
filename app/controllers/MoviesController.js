// Danh sách phim
class MoviesController {
  async getMovies(req, res) {
    return res.status(200).json({ message: "Get Movies" });
  }
  //   Chi tiet phim
  async getMovieId(req, res) {
    return res.status(200).json({ message: "Chi tiet phim" });
  }
  //   Them phim moi
  async createMovie(req, res) {
    return res.status(200).json({ message: "Admin tao nguoi dung" });
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
