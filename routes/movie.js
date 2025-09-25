const MoviesController = require("../app/controllers/MoviesController");
const express = require("express");
const router = express.Router();

// Tao 1 san pham
router.post("/create", MoviesController.createMovie);
// Lay 1 san pham
router.get("/:id", MoviesController.getMovieId);
// update san pham
router.put("/:id", MoviesController.updateMovie);
// Xoa Mem
router.patch("/:id", MoviesController.deleteSoftMovie);
// Xoa Mem
router.delete("/:id", MoviesController.deleteMovie);
// Lay tat ca san pham
router.get("/", MoviesController.getAllMovies);
// Lay cac san pham da xoa mem
router.get("/", MoviesController.getSoftAllMovies);
module.exports = router;
