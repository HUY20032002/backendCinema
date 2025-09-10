/**
 * generateToken - tạo Token
 * verifyToken - xác minh xem token có hợp lệ hay không
 */

const jwt = require("jsonwebtoken");

// Hàm tạo token
let generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    // Định nghĩa thông tin user lưu vào token
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    // Ký và tạo token
    jwt.sign(
      { data: userData },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};

// Hàm xác minh token
let verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
