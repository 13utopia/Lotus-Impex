require('dotenv').config();

const fs = require('fs');
const path = require('path');

const defaultDatabasePath = path.join(__dirname, 'database.sqlite');
const defaultUploadsDir = path.join(__dirname, 'uploads');

const resolveConfiguredPath = (envValue, fallbackPath) => {
  if (!envValue) {
    return fallbackPath;
  }

  return path.resolve(envValue);
};

const ensureDirectoryForFile = (filePath) => {
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const databasePath = resolveConfiguredPath(process.env.DATABASE_PATH, defaultDatabasePath);
ensureDirectoryForFile(databasePath);

const uploadsDir = resolveConfiguredPath(process.env.UPLOADS_DIR, defaultUploadsDir);
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

module.exports = {
  databasePath,
  uploadsDir,
};
