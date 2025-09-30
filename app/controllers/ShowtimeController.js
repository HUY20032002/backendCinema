const Showtime = require("../../modal/Showtime");
const Movie = require("../../modal/Movie");
const Cinema = require("../../modal/Cinema");
const Room = require("../../modal/Room");
const Seat = require("../../modal/Seat");
const SeatStatus = require("../../modal/SeatStatus"); // ✅ ĐÃ SỬA
const Booking = require("../../modal/Booking"); // ✅ THÊM

class ShowtimeController {
  async createShowtime(req, res) {
    try {
      const {
        cinemaId,
        movieId,
        roomId,
        startTime,
        endTime,
        format,
        language = "Vietnamese",
        subtitle = "Vietnamese",
        price,
      } = req.body;

      // 1. Validate required fields
      if (
        !cinemaId ||
        !movieId ||
        !roomId ||
        !startTime ||
        !endTime ||
        !format ||
        !price
      ) {
        return res.status(400).json({
          message: "Thiếu thông tin bắt buộc",
          DT: [],
        });
      }

      // 2. Check existence
      const [cinema, movie, room] = await Promise.all([
        Cinema.findById(cinemaId),
        Movie.findById(movieId),
        Room.findById(roomId),
      ]);

      if (!cinema) {
        return res.status(400).json({
          message: "Rạp không tồn tại",
          DT: [],
        });
      }
      if (!movie) {
        return res.status(400).json({
          message: "Phim không tồn tại",
          DT: [],
        });
      }
      if (!room) {
        return res.status(400).json({
          message: "Phòng không tồn tại",
          DT: [],
        });
      }

      // 3. Check room availability (không trùng lịch chiếu)
      const conflictingShowtime = await Showtime.findOne({
        roomId,
        $or: [
          {
            startTime: { $lt: new Date(endTime) },
            endTime: { $gt: new Date(startTime) },
          },
        ],
      });

      if (conflictingShowtime) {
        return res.status(400).json({
          message: "Phòng đã có lịch chiếu trong khung giờ này",
          DT: [],
        });
      }

      // 4. Lấy danh sách ghế của phòng
      const seats = await Seat.find({ roomId });
      const availableSeats = seats.filter(
        (seat) => seat.type !== "disabled"
      ).length;

      // 5. Tạo showtime
      const showtime = await Showtime.create({
        cinemaId,
        movieId,
        roomId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        format,
        language,
        subtitle,
        price,
        availableSeats,
      });

      // 6. Tạo seat status cho tất cả ghế
      const seatStatuses = seats.map((seat) => ({
        showtimeId: showtime._id,
        seatId: seat._id,
        status: seat.type === "disabled" ? "disabled" : "available",
      }));

      await SeatStatus.insertMany(seatStatuses);

      // 7. Populate để trả về thông tin đầy đủ
      const populatedShowtime = await Showtime.findById(showtime._id)
        .populate("cinemaId", "name address")
        .populate("movieId", "name duration format")
        .populate("roomId", "name");

      return res.status(200).json({
        message: "Tạo lịch chiếu thành công",
        DT: populatedShowtime,
      });
    } catch (error) {
      console.error("Create showtime error:", error);
      return res.status(500).json({
        message: "Tạo lịch chiếu thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }

  // Lấy lịch chiếu theo rạp và phim
  async getShowtimesByCinemaAndMovie(req, res) {
    try {
      const { cinemaId, movieId } = req.params;
      const { date } = req.query;

      let query = { cinemaId, movieId, isActive: true };

      if (date) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setDate(endOfDay.getDate() + 1);

        query.startTime = {
          $gte: startOfDay,
          $lt: endOfDay,
        };
      }

      const showtimes = await Showtime.find(query)
        .populate("cinemaId", "name address")
        .populate("movieId", "name duration format bannerUrl")
        .populate("roomId", "name")
        .sort({ startTime: 1 });

      return res.status(200).json({
        message: "Lấy lịch chiếu thành công",
        DT: showtimes,
      });
    } catch (error) {
      console.error("Get showtimes error:", error);
      return res.status(500).json({
        message: "Lấy lịch chiếu thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }

  // Lấy chi tiết lịch chiếu kèm trạng thái ghế
  async getShowtimeDetail(req, res) {
    try {
      const { id } = req.params;

      const showtime = await Showtime.findById(id)
        .populate("cinemaId", "name address")
        .populate("movieId", "name duration format bannerUrl")
        .populate("roomId", "name rows cols seatLayout");

      if (!showtime) {
        return res.status(404).json({
          message: "Không tìm thấy lịch chiếu",
          DT: null,
        });
      }

      // Lấy trạng thái ghế
      const seatStatuses = await SeatStatus.find({ showtimeId: id })
        .populate("seatId", "row number position type")
        .select("seatId status");

      return res.status(200).json({
        message: "Lấy chi tiết lịch chiếu thành công",
        DT: {
          showtime,
          seats: seatStatuses,
        },
      });
    } catch (error) {
      console.error("Get showtime detail error:", error);
      return res.status(500).json({
        message: "Lấy chi tiết lịch chiếu thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }

  // Hủy lịch chiếu
  async cancelShowtime(req, res) {
    try {
      const { id } = req.params;

      const showtime = await Showtime.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      if (!showtime) {
        return res.status(404).json({
          message: "Không tìm thấy lịch chiếu",
          DT: null,
        });
      }

      return res.status(200).json({
        message: "Hủy lịch chiếu thành công",
        DT: showtime,
      });
    } catch (error) {
      console.error("Cancel showtime error:", error);
      return res.status(500).json({
        message: "Hủy lịch chiếu thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }

  // Lấy tất cả lịch chiếu
  async getAllShowtimes(req, res) {
    try {
      const showtimes = await Showtime.find({ isActive: true })
        .populate("cinemaId", "name")
        .populate("movieId", "name")
        .populate("roomId", "name")
        .sort({ startTime: -1 });

      return res.status(200).json({
        message: "Lấy danh sách lịch chiếu thành công",
        DT: showtimes,
      });
    } catch (error) {
      console.error("Get all showtimes error:", error);
      return res.status(500).json({
        message: "Lấy danh sách lịch chiếu thất bại",
        EM: error.message,
        DT: [],
      });
    }
  }
}

module.exports = new ShowtimeController();
