const User = require('../../modal/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Lưu tạm refreshToken (thực tế nên lưu DB/Redis)
let refreshTokens = [];
class AuthController {
      // Đăng nhập
    async login(req, res) {
      try {
        const { email, password } = req.body;
    
        // tìm user trong DB
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: "Email không tồn tại" });
        }
    
        // kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Sai mật khẩu" });
        }
    
        // payload chỉ nên chứa thông tin cần thiết
        const payload = { id: user._id, email: user.email };
      console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
      console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);
    
        const accessToken = jwt.sign(
          payload,
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
    
        const refreshToken = jwt.sign(
          payload,
          process.env.REFRESH_TOKEN_SECRET
        );
    
        refreshTokens.push(refreshToken);
    
        return res.status(200).json({ accessToken, refreshToken });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server", error: error.message });
      }
    }
    
    
    // Refresh Token
    async refreshToken(req, res) {
      const token = req.body.token;
      if (!token) return res.sendStatus(401);
      if (!refreshTokens.includes(token)) return res.sendStatus(403);
    
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) return res.sendStatus(403);
    
        // tạo access token mới
        const accessToken = jwt.sign(
        data,
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        res.json({ accessToken });
      });
    }
    
    
      // Đăng ký
      async register(req, res) {
        try {
          const { name, password, phone, email, birth } = req.body;
    
          // Kiểm tra email tồn tại
          console.log(req.body)
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
    
      // Quên mật khẩu
      forget(req, res) {
        return res.status(400).json({ message: "Forget" });
      } 
}
module.exports = new AuthController();