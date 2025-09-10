const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()
const isAuth = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) return res.status(401).json({ message: "Missing Authorization header" });

  const token = authorizationHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Missing token" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
     console.log(token)
     if (error) {
      return res.status(403).json({ message: "Invalid or expired token", error: error.message });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { isAuth };
