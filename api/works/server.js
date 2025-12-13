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
const worksRoutes = require('./routes/works.routes');

// Gunakan routes
app.use('/api/works', worksRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    });