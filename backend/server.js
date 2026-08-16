import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import childrenRoutes from './routes/children.js';
import curriculumRoutes from './routes/curriculum.js';
import chatRoutes from './routes/chat.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/children', childrenRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/chat', chatRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on our end.' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`AI Small Small API running on http://localhost:${PORT}`));
