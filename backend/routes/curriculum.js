import express from 'express';
import { trackA, trackB } from '../data/curriculum.js';

const router = express.Router();

router.get('/track-a', (req, res) => res.json(trackA));
router.get('/track-b', (req, res) => res.json(trackB));

export default router;
