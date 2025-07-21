# 🎵 Song Management App (Frontend)  and  Backend

This is a React-based frontend application to manage songs — allowing users to create, view, update, and delete songs with metadata, album art, and audio files. It connects to a REST API backend and uses Redux Toolkit with Redux-Saga for global state management.

---

## ✅ Features

- Display list of songs with **pagination**
- **Create**, **Update**, and **Delete** songs
- Upload **album image** and **audio file**
- Responsive design using Emotion CSS-in-JS

---

## 🛠 Technologies

- React  (Functional Components + Hooks)
- Redux Toolkit + Redux-Saga
- Emotion (for theming + styling)
- Manual Webpack Setup (No CRA)
- Axios for API calls

---

## 🚀 Setup Instructions

1. Clone the project  
   `git clone https://github.com/aregashabe/song-management.git`
   cd frontend
   npm install
  npm run start

2. In a new terminal Install and start backend   
cd backend
npm install
npm start

## 🌐 API Integration

The app communicates with the following backend endpoints:

- `GET /api/songs` – Fetch all songs  
- `POST /api/songs` – Create a song (multipart form with title, artist, year, album, audio)  
- `PUT /api/songs/:id` – Update song by ID  
- `DELETE /api/songs/:id` – Delete song by ID

> Backend code and endpoints are documented in the [backend README](../backend/README.md).

---

## 🧠 AI Tool Usage

- Parts of boilerplate (e.g., Webpack config, Redux setup) were assisted by AI tools (ChatGPT).
- All generated code was **verified manually**, tested in browser, and debugged where needed.

---

## 🧱 Webpack setup
-Webpack Setup
This project uses a custom Webpack configuration (no Create React App) to bundle the frontend assets.

Entry Point: src/index.jsx

Output: Bundled files are emitted to the dist/ directory.

Loaders:

Babel loader to transpile JSX and modern JavaScript.

CSS loader and style loader to handle CSS imports.

File loader (or asset modules) for image and font files.

Plugins:

HtmlWebpackPlugin to generate the index.html file.

DefinePlugin to inject environment variables (e.g., API_BASE_URL).

Dev Server: Configured with hot reloading on port 3000.

Environment Variables: Managed via .env and injected at build time to configure API endpoints.

This setup allows full control over the build process, optimizes assets, and supports modern frontend development workflows.

Run with:   npm  start   # starts development server
