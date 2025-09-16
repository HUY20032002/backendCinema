const authRouter = require("./auth");
const siteRouter = require("./site");
const userRouter = require("./user");
const movieRouter = require("./movie");
function route(app) {
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/movie", movieRouter);
  app.use("/", siteRouter);
}
module.exports = route;
