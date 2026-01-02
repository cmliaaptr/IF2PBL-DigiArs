const Setting = require("../models/setting.model");

function requireAuth(req, res) {
  const userId = req.user?.id ? Number(req.user.id) : null;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }
  return userId;
}

exports.getMySetting = async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    const setting = await Setting.getByUserId(userId);

    return res.json({
      wa: setting?.wa || "",
      link_ig: setting?.link_ig || "",
    });
  } catch (err) {
    console.error("GET MY SETTING ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.saveMySetting = async (req, res) => {
  try {
    const userId = requireAuth(req, res);
    if (!userId) return;

    let { wa, link_ig } = req.body || {};

    wa = typeof wa === "string" ? wa.trim() : "";
    link_ig = typeof link_ig === "string" ? link_ig.trim() : "";

    if (wa && wa.length > 30) {
      return res.status(400).json({ message: "Nomor WhatsApp terlalu panjang" });
    }
    if (link_ig && link_ig.length > 255) {
      return res.status(400).json({ message: "Link Instagram terlalu panjang" });
    }

    await Setting.upsertByUserId(userId, { wa, link_ig });

    return res.json({ message: "Setting berhasil disimpan" });
  } catch (err) {
    console.error("SAVE MY SETTING ERROR:", err);
    return res.status(500).json({ message: "Gagal menyimpan setting" });
  }
};

exports.getPublic = async (req, res) => {
  try {
    const data = await Setting.getOne();

    return res.json({
      wa: data?.wa || "",
      link_ig: data?.link_ig || "",
    });
  } catch (err) {
    console.error("GET PUBLIC SETTING ERROR:", err);
    return res.status(500).json({ message: "Gagal mengambil setting" });
  }
};
