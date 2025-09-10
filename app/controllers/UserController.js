const User = require("../../modal/User");
class UserController {
  async getProfile(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ _id: id }).select("-password");
      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy user" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Lỗi server", error: error.message });
    }
  }
  async updateProfile(req, res) {
    try {
      const { id } = req.params; // hoặc req.query / req.user.id nếu lấy từ token
      const { name, email, phone } = req.body;

      // Tìm và update user
      const user = await User.updateOne(
        { _id: id }, // điều kiện tìm user
        { $set: { name, email, phone } }
      );

      return res.status(200).json({
        message: "Cập nhật thành công",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ message: "Lỗi server", error });
    }
  }

  async changePassword(req, res) {
    return res.status(200).json("Change password");
  }
  async deleteUser(req, res) {
    try {
      const { id } = req.params; // hoặc req.query / req.user.id nếu lấy từ token
      // Tìm và update user
      const user = await User.deleteOne(
        { _id: id } // điều kiện tìm user
      );
      return res.status(200).json({
        message: "Xóa người dùng thành công",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ message: "Lỗi server", error });
    }
  }
  async upadateUser(req, res) {
    try {
      const { id } = req.params; // hoặc req.query / req.user.id nếu lấy từ token
      const { name, email, phone, password, birth } = req.body;

      // Tìm và update user
      const user = await User.updateOne(
        { _id: id }, // điều kiện tìm user
        { $set: { name, email, phone, password, birth } }
      );

      return res.status(200).json({
        message: "Cập nhật thành công",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ message: "Lỗi server", error });
    }
  }
  // Danh sách người dùng
  async getUser(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(401).json({ message: "Get Auth Fail" });
    }
  }
}
module.exports = new UserController();
