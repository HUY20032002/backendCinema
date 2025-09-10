const express = require("express");
const router = express.Router();
const UserController = require("../app/controllers/UserController");
const isAuth = require("../middleware/AuthMiddleware");

router.get("/", isAuth.isAuth, UserController.getUser);
router.get("/:id", UserController.getProfile);
router.put("/update/:id", UserController.updateProfile);
router.put("/admin/update/:id", isAuth.isAuth, UserController.upadateUser);
router.delete("/admin/delete/:id", isAuth.isAuth, UserController.deleteUser);
module.exports = router;
