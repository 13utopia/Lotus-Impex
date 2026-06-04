const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const sequelize = require('./database');
const { uploadsDir, databasePath } = require('./storagePaths');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Sync DB and start server.
// Avoid `alter: true` here because SQLite recreates tables during alter operations,
// which can fail on existing data when unique constraints are present.
async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`Database connected and synced at ${databasePath}`);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to sync database:', err);
    process.exit(1);
  }
}

startServer();
