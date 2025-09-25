const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // hoặc viết gọn require('dotenv').config()
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes");
const morgan = require("morgan");
const db = require("./config/db/index");
const { startMovieCleanupJob } = require("./app/controllers/MoviesController");

// Connect DB
db.connect().then(startMovieCleanupJob());
// Cho phép tất cả origins (dev)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // ⚡ quan trọng
  })
);
// cho form
app.use(cookieParser());
app.use(morgan("dev"));
// Tăng giới hạn dung lượng request body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
