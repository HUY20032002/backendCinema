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

// Connect DB
db.connect();
// Cho phép tất cả origins (dev)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // ⚡ quan trọng
  })
);

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json()); // đọc JSON từ body
app.use(express.urlencoded({ extended: true })); // đọc form-urlencoded

routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
