# Song Management App Backend

## Overview
A Node.js Express backend REST API to manage songs with metadata, album images, and audio files.  
- Data persisted in a JSON file (`songs.json`).  
- Files stored in `/public/uploads/`.  
- Supports upload, update, deletion, and retrieval of songs.

## Setup
1. Clone the repository and navigate inside.  
2. Run `npm install` to install dependencies.  
3. Create upload folder: `mkdir -p public/uploads`.  
4. Start the server: `node server.js`.  
5. Server runs on **http://localhost:5000**.

## API Endpoints

### GET `/api/songs`  
- Retrieves a list of all songs.  
- Response: JSON array of song objects.

### POST `/api/songs`  
- Upload a new song with metadata and files.  
- Accepts `multipart/form-data` with fields:  
  - `title` (string, required)  
  - `artist` (string, required)  
  - `year` (number, required)  
  - `album` (file, required)  
  - `audio` (file, required)  
- Returns the created song JSON on success.

### PUT `/api/songs/:id`  
- Update song metadata and optionally replace files.  
- Accepts `multipart/form-data` with optional fields:  
  - `title` (string)  
  - `artist` (string)  
  - `year` (number)  
  - `album` (file)  
  - `audio` (file)  
- Returns updated song JSON.

### DELETE `/api/songs/:id`  
- Deletes the song with specified `id`.  
- Deletes associated album and audio files from disk.  
- Returns confirmation message on success.

## Notes
- Static files served under `/uploads`. Access files like `http://localhost:5000/uploads/filename.jpg`.  
- Uses `multer` for file handling and uploads.  
- CORS enabled for frontend integration.  
- Song data stored locally in `songs.json` (creates if not exists).  

## Development
- Backend uses ES modules (`import` syntax).  
- Make sure Node version supports ES modules or run with `--experimental-modules`.  

---

For any questions or issues, feel free to contact at  areguaaebe@gmail.com
