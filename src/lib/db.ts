import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "waitlist.db");

declare global {
  var __waitlistDb: Database.Database | undefined;
}

function createDb(): Database.Database {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS waitlist_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      source TEXT,
      metier TEXT,
      volume TEXT,
      plans TEXT,
      profile_completed_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  return db;
}

/** Singleton mis en cache sur `global` pour survivre au hot-reload de Next.js en dev. */
export function getDb(): Database.Database {
  if (!global.__waitlistDb) {
    global.__waitlistDb = createDb();
  }
  return global.__waitlistDb;
}
