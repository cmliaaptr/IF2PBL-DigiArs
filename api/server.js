require('dotenv').config();
const express = require('express');
const app = express();
const port = 8001;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to DigiArs Website!');
});

// Import routes
const worksRoutes = require('./works/routes/works.routes');
const layananRoutes = require('./layanan/routes/layanan.routes');
const path = require("path");
const loginRoutes = require('./login/routes/user.route');
const layananCardRoutes = require("./layananc/routes/layananc.routes");
const settingRoutes = require("./setting/routes/setting.routes");
const detailLayananRoutes = require("./detail_layanan/routes/detail_layanan.routes");


// Gunakan routes
app.use('/api/login', loginRoutes);
app.use('/api/works', worksRoutes);
app.use('/api/layanan', layananRoutes);
app.use('/api/layananc', layananCardRoutes);
app.use("/api/setting", settingRoutes);
app.use("/storage", express.static(path.join(__dirname, "..", "storage")));
app.get("/api/contact", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT wa, link_ig FROM setting WHERE id = 1 LIMIT 1"
    );

    if (!rows.length) return res.json({ wa: "", link_ig: "" });

    res.json(rows[0]);
  } catch {
    res.status(500).json({ message: "Gagal ambil contact" });
  }
});
app.use("/api/detail-layanan", detailLayananRoutes);


// Start server
app.listen(port, () => {
    console.log(`Server is running at 
      - http://localhost:${port}
      - http://0.0.0.0:${port}`);
    });