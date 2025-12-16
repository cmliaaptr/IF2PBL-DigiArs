require('dotenv').config();
const express = require('express');
const app = express();
const port = 8001;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to DigiArs Website!');
});

// Import routes
const worksRoutes = require('./works/routes/works.routes');
const layananRoutes = require('./layanan/routes/layanan.routes');
const path = require("path");

// Gunakan routes
app.use('/api/works', worksRoutes);
app.use('/api/layanan', layananRoutes);
app.use("/storage", express.static(path.resolve(process.cwd(), "storage")));

// Start server
app.listen(port, () => {
    console.log(`Server is running at 
      - http://localhost:${port}
      - http://0.0.0.0:${port}`);
    });