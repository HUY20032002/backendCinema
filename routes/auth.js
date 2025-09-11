const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/AuthController");
const isAuth = require("../middleware/AuthMiddleware");

// router.get('/show',AuthController.show)
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/refreshtoken", AuthController.refreshToken);

module.exports = router;
