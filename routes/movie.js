const MoviesController = require("../app/controllers/MoviesController");
const express = require("express");
const router = express.Router();

router.post("/create", MoviesController.createMovie);
router.get("/:id", MoviesController.getMovieId);
router.put("/:id", MoviesController.updateMovie);
router.delete("/:id", MoviesController.deleteMovie);

module.exports = router;
