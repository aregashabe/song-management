// Import the required modules
import express from 'express';
import cors from 'cors';

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello, World! Server is running!');
});

// You can define other API routes here
app.get('/api/songs', (req, res) => {
  res.json([
    { id: 1, title: 'Song One', artist: 'Artist A' },
    { id: 2, title: 'Song Two', artist: 'Artist B' }
  ]);
});

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
