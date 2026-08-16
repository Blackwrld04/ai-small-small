import express from 'express';
import { randomUUID } from 'crypto';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// MOCK AI RESPONSES - this is where a real model call goes later
// (e.g. the Anthropic API). Kept scoped and guardrailed on purpose:
// the bot nudges toward learning rather than doing the work outright,
// per the product's own AI-literacy principles.
const GUARDRAIL_TRIGGERS = ['write my essay', 'do my homework', 'just give me the answer', 'do it for me'];

function mockReply(message) {
  const lower = message.toLowerCase();
  if (GUARDRAIL_TRIGGERS.some(t => lower.includes(t))) {
    return "I won't do it for you, but I'll help you build it yourself - what's the topic, and what do you already have?";
  }
  if (lower.includes('fake') || lower.includes('deepfake') || lower.includes('real')) {
    return "Good instinct to check! Send me the details and let's look at it together - what made you suspicious?";
  }
  return "Got it. Let's work through this step by step - what have you tried so far?";
}

router.post('/', requireAuth, (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required.' });

  // If a child is logged in, the chat is tied to them automatically -
  // no reliance on the client to pass the right childId.
  const childId = req.user.role === 'child' ? req.user.id : (req.body.childId || null);

  const reply = mockReply(message);
  const entry = {
    id: randomUUID(),
    childId,
    userId: req.user.id,
    message,
    reply,
    flagged: false,
    createdAt: new Date().toISOString(),
  };
  db.logChat(entry);
  res.json({ reply, entryId: entry.id });
});

// Parent-visible chat history for a child - the "no black box" promise.
// Only that child's own parent (or the child themself) can view it.
router.get('/history/:childId', requireAuth, (req, res) => {
  const child = db.getChildById(req.params.childId);
  if (!child) return res.status(404).json({ error: 'Child not found.' });

  const isOwnerParent = req.user.role === 'parent' && child.parentId === req.user.id;
  const isSelf = req.user.role === 'child' && req.user.id === child.id;
  if (!isOwnerParent && !isSelf) {
    return res.status(403).json({ error: "You don't have access to this child's chat history." });
  }

  res.json(db.getChatLogsForChild(req.params.childId));
});

export default router;
