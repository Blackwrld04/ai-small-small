import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { db } from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Parent creates a child account directly - matches Khan Academy's "Add a child"
// flow: the PARENT sets a username + password for the child. The child does not
// self-register. This is what makes chat history reliably link back to a parent.
router.post('/', requireAuth, requireRole('parent'), async (req, res) => {
  const { name, age, username, password } = req.body;

  if (!name || !age || !username || !password) {
    return res.status(400).json({ error: 'Child name, age, username, and password are all required.' });
  }
  if (age < 7 || age > 17) {
    return res.status(400).json({ error: 'AI Small Small currently supports ages 7–17.' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return res.status(400).json({ error: 'Username should contain only letters and numbers - for privacy, avoid using your child\'s real name.' });
  }
  if (db.getChildByUsername(username)) {
    return res.status(409).json({ error: 'That username is already taken - try another.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const child = {
    id: randomUUID(),
    parentId: req.user.id,
    name,
    age: Number(age),
    username,
    passwordHash,
    trackALevel: null, // set after placement check
    trackBBand: age <= 9 ? 'A' : age <= 12 ? 'B' : age <= 15 ? 'C' : 'D',
    createdAt: new Date().toISOString(),
  };
  db.addChild(child);
  const { passwordHash: _, ...safeChild } = child;
  res.status(201).json(safeChild);
});

router.get('/', requireAuth, requireRole('parent'), (req, res) => {
  const children = db.getChildrenByParentId(req.user.id).map(({ passwordHash, ...c }) => c);
  res.json(children);
});

// Child logs in with the username + password their parent created for them.
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  const child = db.getChildByUsername(username);
  if (!child) {
    return res.status(401).json({ error: 'Incorrect username or password.' });
  }
  const match = await bcrypt.compare(password, child.passwordHash);
  if (!match) {
    return res.status(401).json({ error: 'Incorrect username or password.' });
  }
  const token = jwt.sign(
    { id: child.id, role: 'child', name: child.name, parentId: child.parentId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ token, user: { id: child.id, name: child.name, role: 'child', age: child.age, trackBBand: child.trackBBand } });
});

export default router;
