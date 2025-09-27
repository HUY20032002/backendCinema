const Room = require("../../modal/Room");
class RoomController {
  async createRoom(req, res) {
    try {
      const data = req.body;
      const check = await Room.findOne({
        cinemaId: data.cinemaId, // chú ý đúng key
        name: data.name,
      });

      if (check) {
        return res
          .status(400)
          .json({ message: "Số phòng đã tồn tại trong rạp này" });
      }

      const room = await Room.create(data);
      return res.status(200).json({
        message: "Tạo Rạp thành công",
        DT: room,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Tạo Rạp thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }
  //
  async getAllRoom(req, res) {
    try {
      const room = await Room.find();
      return res.status(200).json({
        message: "Lấy Rạp thành công",
        DT: room,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lấy Rạp thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }
}

module.exports = new RoomController();
