const db = require("../../db");

const ALLOWED_PILIHAN = new Set(["Card 1", "Card 2", "Card 3", "Card 4"]);

const safeStr = (v) => (v === undefined || v === null ? "" : String(v));
const safeNullableStr = (v) => {
  const s = (v === undefined || v === null ? "" : String(v)).trim();
  return s ? s : null;
};

// HERO
exports.getHeroByLayanan = async (layanan1_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM detail_layanan WHERE layanan1_id = ? AND tipe = 'hero' LIMIT 1",
    [layanan1_id]
  );
  return rows[0] || null;
};

exports.upsertHeroByLayanan = async ({
  layanan1_id,
  user_id,
  judul,
  deskripsi,
  foto,
}) => {
  const hero = await exports.getHeroByLayanan(layanan1_id);

  const _judul = safeStr(judul).trim();
  const _deskripsi = safeNullableStr(deskripsi); 
  const _foto = safeStr(foto).trim(); 

  if (!hero) {
    
    await db.execute(
      `INSERT INTO detail_layanan (user_id, layanan1_id, foto, judul, tipe, deskripsi, pilihan, icon)
       VALUES (?, ?, ?, ?, 'hero', ?, NULL, NULL)`,
      [user_id, layanan1_id, _foto, _judul, _deskripsi]
    );
    return;
  }

  if (_foto) {
    await db.execute(
      `UPDATE detail_layanan
       SET user_id = ?, judul = ?, deskripsi = ?, foto = ?
       WHERE layanan1_id = ? AND tipe = 'hero'`,
      [user_id, _judul, _deskripsi, _foto, layanan1_id]
    );
  } else {
    await db.execute(
      `UPDATE detail_layanan
       SET user_id = ?, judul = ?, deskripsi = ?
       WHERE layanan1_id = ? AND tipe = 'hero'`,
      [user_id, _judul, _deskripsi, layanan1_id]
    );
  }
};

// BENEFIT 
exports.getBenefitsByLayanan = async (layanan1_id) => {
  const [rows] = await db.execute(
    `SELECT * FROM detail_layanan
     WHERE layanan1_id = ?
       AND tipe = 'benefit'
       AND pilihan IN ('Card 1','Card 2','Card 3','Card 4')
     ORDER BY pilihan`,
    [layanan1_id]
  );
  return rows;
};

exports.upsertBenefitByLayanan = async ({
  layanan1_id,
  user_id,
  pilihan,
  judul,
  deskripsi,
  icon,
}) => {
  const _pilihan = safeStr(pilihan).trim();
  if (!ALLOWED_PILIHAN.has(_pilihan)) {
    throw new Error("Pilihan card tidak valid");
  }

  const _judul = safeStr(judul).trim();
  const _deskripsi = safeStr(deskripsi).trim();
  const _icon = safeStr(icon).trim(); 

  const [rows] = await db.execute(
    `SELECT id, foto, icon
     FROM detail_layanan
     WHERE layanan1_id = ?
       AND tipe = 'benefit'
       AND pilihan = ?
     LIMIT 1`,
    [layanan1_id, _pilihan]
  );

  if (rows.length === 0) {

    await db.execute(
      `INSERT INTO detail_layanan (user_id, layanan1_id, foto, icon, judul, tipe, deskripsi, pilihan)
       VALUES (?, ?, ?, ?, ?, 'benefit', ?, ?)`,
      [user_id, layanan1_id, "", _icon, _judul, _deskripsi, _pilihan]
    );
    return;
  }

  // UPDATE: icon 
  if (_icon) {
    await db.execute(
      `UPDATE detail_layanan
       SET user_id = ?, judul = ?, deskripsi = ?, icon = ?
       WHERE layanan1_id = ?
         AND tipe = 'benefit'
         AND pilihan = ?`,
      [user_id, _judul, _deskripsi, _icon, layanan1_id, _pilihan]
    );
  } else {
    await db.execute(
      `UPDATE detail_layanan
       SET user_id = ?, judul = ?, deskripsi = ?
       WHERE layanan1_id = ?
         AND tipe = 'benefit'
         AND pilihan = ?`,
      [user_id, _judul, _deskripsi, layanan1_id, _pilihan]
    );
  }
};
