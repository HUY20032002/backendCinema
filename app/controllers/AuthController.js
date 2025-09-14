const User = require("../../modal/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Lưu tạm refreshToken (sản phẩm thật nên lưu DB/Redis)
let refreshTokens = [];

class AuthController {
  // Đăng nhập
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Email không tồn tại" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Sai mật khẩu" });
      }

      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30s", // test
      });

      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30s", // refreshToken dài hạn
      });
      refreshTokens.push(refreshToken);

      const { password: _, ...userData } = user.toObject();

      return res.status(200).json({
        accessToken,
        refreshToken,
        user: userData,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  }

  // Refresh Token
  async refreshToken(req, res) {
    const token = req.body.token;
    if (!token) return res.status(401).json({ message: "Chưa có token" });
    if (!refreshTokens.includes(token))
      return res.status(403).json({ message: "Refresh token không hợp lệ" });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ message: "Refresh token hết hạn" });

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30s",
      });

      res.json({ accessToken });
    });
  }

  // Đăng ký
  async register(req, res) {
    try {
      const { name, password, phone, email, birth } = req.body;

      const checkUser = await User.findOne({ email });
      if (checkUser) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        password: hashedPassword,
        phone,
        email,
        birth,
      });
      await newUser.save();

      return res.status(200).json({ message: "Register success" });
    } catch (error) {
      return res.status(500).json({ message: "Register fail", error });
    }
  }

  // Logout
  async logout(req, res) {
    try {
      const { token } = req.body;
      if (!token) return res.status(400).json({ message: "Token required" });

      // xoá refreshToken khỏi danh sách
      refreshTokens = refreshTokens.filter((t) => t !== token);

      return res.status(200).json({ message: "Logout thành công" });
    } catch (error) {
      return res.status(500).json({ message: "Logout fail", error });
    }
  }

  // Quên mật khẩu (chưa làm)
  forget(req, res) {
    return res.status(400).json({ message: "Forget" });
  }
}

module.exports = new AuthController();
