const Seat = require("../../modal/Seat");

class SeatController {
  // create Seat
  async createSeat(req, res) {
    try {
      const data = req.body;
      console.log(data);
      const seat = await Seat.create(data); // ✅ dùng model
      return res
        .status(200)
        .json({ messenger: "Create Seat Success", DT: seat });
    } catch (error) {
      return res
        .status(500)
        .json({ messenger: "Create Seat Error", ER: error.message, DT: [] });
    }
  }
}

module.exports = new SeatController();
