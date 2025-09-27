const authRouter = require("./auth");
const siteRouter = require("./site");
const userRouter = require("./user");
const movieRouter = require("./movie");
const cinemaRouter = require("./cinema");
const roomRouter = require("./room");
const seatRouter = require("./seat");

function route(app) {
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/movie", movieRouter);
  app.use("/cinema", cinemaRouter);
  app.use("/room", roomRouter);
  app.use("/seat", seatRouter);
  app.use("/", siteRouter);
}
module.exports = route;
