/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongsRequest } from '../redux/songs/songsSlice'; // adjust path as needed

function Home() {
  const { songs } = useSelector(state => state.songs);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    dispatch(fetchSongsRequest()); // ✅ now fetches from Redux Saga
  }, [dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  if (songs.length === 0) return <p>No songs found.</p>;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === songs.length - 1 ? 0 : prev + 1));
  };

  const handleSelectSong = (index) => {
    setCurrentIndex(index);
  };

  const currentSong = songs[currentIndex];

  return (
    <div style={{ display: 'flex', maxWidth: 800, margin: '20px auto', gap: 20 }}>
      {/* Sidebar song list */}
      <div style={{
        flex: 1,
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 10,
        maxHeight: 400,
        overflowY: 'auto'
      }}>
        <h3>All Songs</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {songs.map((song, index) => (
            <li
              key={song.id}
              onClick={() => handleSelectSong(index)}
              style={{
                cursor: 'pointer',
                padding: 8,
                marginBottom: 6,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: index === currentIndex ? '#3498db' : 'transparent',
                color: index === currentIndex ? 'white' : 'black',
                borderRadius: 4,
                transition: 'background-color 0.3s'
              }}
            >
              <img
                src={`http://localhost:5000${song.albumUrl}`}
                alt={song.title}
                style={{ width: 50, height: 50, borderRadius: 4, marginRight: 10 }}
              />
              <div>
                <strong>{song.title}</strong><br />
                <small>{song.artist} ({song.year})</small>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Player */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <h2>Now Playing</h2>
        <p><strong>{currentSong.title}</strong> by {currentSong.artist} ({currentSong.year})</p>
        <audio controls ref={audioRef} style={{ width: '100%' }}>
          <source src={`http://localhost:5000${currentSong.audioUrl}`} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <div style={{ marginTop: 20 }}>
          <button onClick={handlePrev} style={{ marginRight: 10 }}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
