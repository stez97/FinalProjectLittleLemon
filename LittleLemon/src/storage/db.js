//db.js
import { openDatabaseSync } from 'expo-sqlite';

// ✅ Open or create database
const db = openDatabaseSync("menuItem1.db");

// ✅ Create table if not exists
db.execAsync(`
  CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL,
    description TEXT,
    image TEXT,
    category TEXT
  );
`);

export default db;