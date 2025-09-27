const express = require("express");
const router = express.Router();
const seatController = require("../app/controllers/SeatController");

router.post("/", seatController.createSeat);

module.exports = router;
