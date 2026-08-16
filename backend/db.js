// Simple JSON-file database. Swap this for Postgres/Mongo/MySQL in production -
// every function below is the only place that would need to change.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'data', 'db.json');

function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    const initial = { users: [], children: [], chatLogs: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export const db = {
  getUsers: () => readDb().users,
  getUserByEmail: (email) => readDb().users.find(u => u.email.toLowerCase() === email.toLowerCase()),
  getUserById: (id) => readDb().users.find(u => u.id === id),
  createUser: (user) => {
    const data = readDb();
    data.users.push(user);
    writeDb(data);
    return user;
  },
  getChildrenByParentId: (parentId) => readDb().children.filter(c => c.parentId === parentId),
  addChild: (child) => {
    const data = readDb();
    data.children.push(child);
    writeDb(data);
    return child;
  },
  getChildById: (id) => readDb().children.find(c => c.id === id),
  getChildByUsername: (username) => readDb().children.find(c => c.username.toLowerCase() === username.toLowerCase()),
  logChat: (entry) => {
    const data = readDb();
    data.chatLogs.push(entry);
    writeDb(data);
    return entry;
  },
  getChatLogsForChild: (childId) => readDb().chatLogs.filter(c => c.childId === childId),
};
