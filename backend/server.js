import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const DATA_FILE = path.join(__dirname, 'songs.json');

async function readSongs() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeSongs(songs) {
  await fs.writeFile(DATA_FILE, JSON.stringify(songs, null, 2), 'utf-8');
}

// POST - create
app.post('/api/songs', upload.fields([{ name: 'album' }, { name: 'audio' }]), async (req, res) => {
  try {
    const { title, artist, year } = req.body;
    const albumFile = req.files['album']?.[0];
    const audioFile = req.files['audio']?.[0];

    if (!title || !artist || !year || !albumFile || !audioFile) {
      return res.status(400).json({ error: 'Missing required fields or files' });
    }

    const songs = await readSongs();

    const newSong = {
      id: Date.now(),
      title,
      artist,
      year: Number(year),
      albumUrl: `/uploads/${albumFile.filename}`,
      audioUrl: `/uploads/${audioFile.filename}`
    };

    songs.push(newSong);
    await writeSongs(songs);

    res.status(201).json(newSong);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET - list
app.get('/api/songs', async (req, res) => {
  try {
    const songs = await readSongs();
    res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE - fix structure
app.delete('/api/songs/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const songs = await readSongs();
    const index = songs.findIndex(song => song.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Song not found' });
    }

    const [deletedSong] = songs.splice(index, 1);

    try {
      await fs.unlink(path.join(__dirname, 'public', deletedSong.albumUrl));
      await fs.unlink(path.join(__dirname, 'public', deletedSong.audioUrl));
    } catch (fileErr) {
      console.error('Error deleting files:', fileErr);
    }

    await writeSongs(songs);
    res.json({ message: 'Song deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT - update
app.put('/api/songs/:id', upload.fields([{ name: 'album' }, { name: 'audio' }]), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, artist, year } = req.body;
    const albumFile = req.files?.album?.[0];
    const audioFile = req.files?.audio?.[0];

    const songs = await readSongs();
    const song = songs.find(song => song.id === id);
    if (!song) return res.status(404).json({ error: 'Song not found' });

    if (title) song.title = title;
    if (artist) song.artist = artist;
    if (year) song.year = Number(year);
    if (albumFile) song.albumUrl = `/uploads/${albumFile.filename}`;
    if (audioFile) song.audioUrl = `/uploads/${audioFile.filename}`;

    await writeSongs(songs);
    res.json(song);
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
