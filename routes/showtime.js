const express = require("express");
const router = express.Router();
const showtimeController = require("../app/controllers/ShowtimeController");

// Tạo lịch chiếu - KHỚP VỚI FRONTEND
router.post("/create", showtimeController.createShowtime);

// Lấy lịch chiếu theo rạp và phim
router.get(
  "/cinema/:cinemaId/movie/:movieId",
  showtimeController.getShowtimesByCinemaAndMovie
);

// Lấy chi tiết lịch chiếu
router.get("/:id", showtimeController.getShowtimeDetail);

// Lấy tất cả lịch chiếu
router.get("/", showtimeController.getAllShowtimes);

// Hủy lịch chiếu
router.patch("/:id/cancel", showtimeController.cancelShowtime);

module.exports = router;
