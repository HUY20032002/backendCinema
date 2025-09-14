const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/AuthController");

// Đăng ký
router.post("/register", AuthController.register);

// Đăng nhập
router.post("/login", AuthController.login);

// Refresh Token (dùng POST vì cần token trong body)
router.post("/refreshtoken", AuthController.refreshToken);

// Logout
router.post("/logout", AuthController.logout);

module.exports = router;
