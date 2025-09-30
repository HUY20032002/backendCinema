const Room = require("../../modal/Room");
const Seat = require("../../modal/Seat");

class RoomController {
  async createRoom(req, res) {
    try {
      const { cinemaId, name, rows, cols, seatLayout } = req.body;

      // Validate
      if (!cinemaId || !name || !rows || !cols) {
        return res.status(400).json({
          message: "Thiếu thông tin bắt buộc",
          DT: [],
        });
      }

      // Check room name unique trong cinema
      const existingRoom = await Room.findOne({ cinemaId, name });
      if (existingRoom) {
        return res.status(400).json({
          message: "Tên phòng đã tồn tại trong rạp này",
          DT: [],
        });
      }

      const totalSeats = rows * cols;

      // Tạo phòng
      const room = await Room.create({
        cinemaId,
        name,
        rows,
        cols,
        totalSeats,
        seatLayout: seatLayout || this.generateDefaultSeatLayout(rows, cols),
      });

      // Tạo các ghế tự động
      await this.createSeatsForRoom(room._id, rows, cols, room.seatLayout);

      return res.status(201).json({
        message: "Tạo phòng thành công",
        DT: room,
      });
    } catch (error) {
      console.error("Create room error:", error);
      return res.status(500).json({
        message: "Tạo phòng thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }

  // Tạo layout ghế mặc định
  generateDefaultSeatLayout(rows, cols) {
    const layout = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        // Mặc định: 2 hàng đầu VIP, còn lại normal
        if (i < 2) {
          row.push("vip");
        } else {
          row.push("normal");
        }
      }
      layout.push(row);
    }
    return layout;
  }

  // Tạo ghế tự động cho phòng
  async createSeatsForRoom(roomId, rows, cols, seatLayout) {
    const seats = [];
    const rowLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const seatType = seatLayout[i][j];
        if (seatType !== "blocked") {
          // Không tạo ghế cho vị trí blocked
          seats.push({
            roomId,
            row: rowLetters[i],
            number: j + 1,
            type: seatType,
            position: `${rowLetters[i]}${j + 1}`,
          });
        }
      }
    }

    if (seats.length > 0) {
      await Seat.insertMany(seats);
    }
  }

  async getAllRoom(req, res) {
    try {
      const rooms = await Room.find().populate("cinemaId", "name");
      return res.status(200).json({
        message: "Lấy danh sách phòng thành công",
        DT: rooms,
      });
    } catch (error) {
      console.error("Get rooms error:", error);
      return res.status(500).json({
        message: "Lấy danh sách phòng thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }

  async getAllRoomCinemaId(req, res) {
    try {
      const { id } = req.params;
      const rooms = await Room.find({ cinemaId: id }).populate(
        "cinemaId",
        "name"
      );

      if (!rooms || rooms.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy phòng nào cho rạp này",
          DT: [],
        });
      }

      return res.status(200).json({
        message: "Lấy phòng theo cinemaId thành công",
        DT: rooms,
      });
    } catch (error) {
      console.error("Get rooms by cinema error:", error);
      return res.status(500).json({
        message: "Lấy phòng thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }

  // Lấy thông tin chi tiết phòng kèm ghế
  async getRoomDetail(req, res) {
    try {
      const { id } = req.params;
      const room = await Room.findById(id).populate("cinemaId", "name address");
      const seats = await Seat.find({ roomId: id }).sort({ row: 1, number: 1 });

      if (!room) {
        return res.status(404).json({
          message: "Không tìm thấy phòng",
          DT: null,
        });
      }

      return res.status(200).json({
        message: "Lấy thông tin phòng thành công",
        DT: {
          room,
          seats,
        },
      });
    } catch (error) {
      console.error("Get room detail error:", error);
      return res.status(500).json({
        message: "Lấy thông tin phòng thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }
}

module.exports = new RoomController();
