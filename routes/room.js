const express = require("express");
const router = express.Router();
const roomController = require("../app/controllers/RoomController");
router.post("/", roomController.createRoom);
router.get("/", roomController.getAllRoom);

module.exports = router;
