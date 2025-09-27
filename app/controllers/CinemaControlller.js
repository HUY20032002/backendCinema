// controllers/CinemaController.js
const Cinema = require("../../modal/Cinema");

class CinemaController {
  // Tạo rạp
  async createCinema(req, res) {
    try {
      const { name, address } = req.body;

      if (!name || !address) {
        return res.status(400).json({
          message: "Missing name or address information",
          DT: [],
        });
      }

      const cinema = await Cinema.create({ name, address });

      return res.status(201).json({
        message: "Create Cinema Success",
        DT: cinema,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Create Cinema Fail",
        EM: error.message,
        DT: [],
      });
    }
  }

  // Lấy tất cả rạp
  async getAllCinema(req, res) {
    try {
      const cinemas = await Cinema.find();

      return res.status(200).json({
        SM: "Lấy tất cả rạp thành công",
        DT: cinemas,
      });
    } catch (error) {
      console.error("Error fetching cinemas:", error);
      return res.status(500).json({
        EM: error.message,
        DT: [],
      });
    }
  }
}

module.exports = new CinemaController();
