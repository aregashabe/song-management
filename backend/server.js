// server.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

import { fileURLToPath } from 'url';

// Get __filename and __dirname equivalents in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors()); // enable CORS for your frontend

// Serve static files from /public/uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Multer setup for storing uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Simple in-memory store for song metadata
const songs = [];

// POST /api/songs - upload song data + files
app.post('/api/songs', upload.fields([{ name: 'album' }, { name: 'audio' }]), (req, res) => {
  const { title, artist, year } = req.body;
  const albumFile = req.files['album'] ? req.files['album'][0] : null;
  const audioFile = req.files['audio'] ? req.files['audio'][0] : null;

  if (!title || !artist || !year || !albumFile || !audioFile) {
    return res.status(400).json({ error: 'Missing required fields or files' });
  }

  const newSong = {
    id: Date.now(),
    title,
    artist,
    year: Number(year),
    albumUrl: `/uploads/${albumFile.filename}`,
    audioUrl: `/uploads/${audioFile.filename}`
  };

  songs.push(newSong);

  res.status(201).json(newSong);
});

// GET /api/songs - return all songs
app.get('/api/songs', (req, res) => {
  res.json(songs);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
