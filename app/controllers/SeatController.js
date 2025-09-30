const Seat = require("../../modal/Seat");

class SeatController {
  // Tạo ghế (thường dùng khi tạo phòng tự động)
  async createSeat(req, res) {
    try {
      const data = req.body;

      // Check seat unique trong phòng
      const existingSeat = await Seat.findOne({
        roomId: data.roomId,
        position: data.position,
      });

      if (existingSeat) {
        return res.status(400).json({
          message: "Ghế đã tồn tại trong phòng này",
          DT: [],
        });
      }

      const seat = await Seat.create(data);
      return res.status(201).json({
        message: "Tạo ghế thành công",
        DT: seat,
      });
    } catch (error) {
      console.error("Create seat error:", error);
      return res.status(500).json({
        message: "Tạo ghế thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }

  // Lấy ghế theo phòng
  async getSeatsByRoom(req, res) {
    try {
      const { roomId } = req.params;
      const seats = await Seat.find({ roomId }).sort({ row: 1, number: 1 });

      return res.status(200).json({
        message: "Lấy danh sách ghế thành công",
        DT: seats,
      });
    } catch (error) {
      console.error("Get seats error:", error);
      return res.status(500).json({
        message: "Lấy danh sách ghế thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }

  // Cập nhật loại ghế
  async updateSeatType(req, res) {
    try {
      const { id } = req.params;
      const { type } = req.body;

      const seat = await Seat.findByIdAndUpdate(id, { type }, { new: true });

      if (!seat) {
        return res.status(404).json({
          message: "Không tìm thấy ghế",
          DT: null,
        });
      }

      return res.status(200).json({
        message: "Cập nhật loại ghế thành công",
        DT: seat,
      });
    } catch (error) {
      console.error("Update seat error:", error);
      return res.status(500).json({
        message: "Cập nhật loại ghế thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }
}

module.exports = new SeatController();
