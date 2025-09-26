const express = require("express");
const router = express.Router();
const cinemaController = require("../app/controllers/CinemaControlller");
router.post("/", cinemaController.createCinema);
router.get("/", cinemaController.getAllCinema);
module.exports = router;
