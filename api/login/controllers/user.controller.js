const jwt = require("jsonwebtoken");
const db = require("../../db");
const User = require("../models/user.model");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body || {};

    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Username tidak ditemukan" });
    }
    
    if (password !== user.password) {
      return res.status(401).json({ message: "Password salah" });
    }

    // update last login
    await db.execute(
      "UPDATE users SET last_login = NOW() WHERE id = ?",
      [user.id]
    );

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
