import { Low } from "lowdb";
import { JSONFile } from 'lowdb/node'
import { join, dirname } from "path";
import { fileURLToPath } from "url";

let db;

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function createConnection() {
  // Use JSON file for storage
  const file = join(__dirname, "../db.json");
  const adapter = new JSONFile(file);
  db = new Low(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();

  db.data = db.data || { posts: {script: [], scriptdata: [], interaccion: [], voice: [], led: [], mov: [], woo: [], googlestt: []} }
  // Write db.data content to db.json
  await db.write();
}

export const getConnection = () => db;