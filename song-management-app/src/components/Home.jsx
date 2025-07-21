/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSongsRequest,
  deleteSongRequest,
  updateSongRequest
} from '../redux/songs/songsSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import * as styles from './style/home.style';

function Home() {
  const { songs } = useSelector(state => state.songs);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  // Add albumFile and audioFile for files
  const [editData, setEditData] = useState({
    id: null,
    title: '',
    artist: '',
    year: '',
    albumFile: null,
    audioFile: null
  });
  const audioRef = useRef(null);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  if (songs.length === 0) return <p>No songs found.</p>;

  const currentSong = songs[currentIndex];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === songs.length - 1 ? 0 : prev + 1));
  };

  const handleSelectSong = (index) => {
    setCurrentIndex(index);
  };

  const handleDelete = (e, id, title) => {
    e.stopPropagation();
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (confirmed) {
      dispatch(deleteSongRequest(id));
      if (currentIndex === songs.findIndex(song => song.id === id)) {
        setCurrentIndex(prev => (prev === 0 ? 0 : prev - 1));
      }
    }
  };

  const openEditModal = (e, song) => {
    e.stopPropagation();
    setEditData({
      id: song.id,
      title: song.title,
      artist: song.artist,
      year: song.year.toString(),
      albumFile: null,
      audioFile: null
    });
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // File input change
      setEditData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      // Text input change
      setEditData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editData.title || !editData.artist || !editData.year) {
      alert('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', editData.title);
    formData.append('artist', editData.artist);
    formData.append('year', editData.year);

    if (editData.albumFile) {
      formData.append('album', editData.albumFile);
    }
    if (editData.audioFile) {
      formData.append('audio', editData.audioFile);
    }

    dispatch(updateSongRequest({
      id: editData.id,
      data: formData,
    }));

    setIsEditOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditOpen(false);
  };

  return (
    <div css={styles.container}>
      <div css={styles.songListContainer}>
        <h3>All Songs</h3>
        <ul css={styles.songList}>
          {songs.map((song, index) => (
            <li
              key={song.id}
              onClick={() => handleSelectSong(index)}
              css={styles.songItem(index === currentIndex)}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={`http://localhost:5000${song.albumUrl}`}
                  alt={song.title}
                  css={styles.albumArt}
                />
                <div css={styles.songInfo}>
                  <strong>{song.title}</strong><br />
                  <small>{song.artist} ({song.year})</small>
                </div>
              </div>
              <div css={styles.actionButtons}>
                <FaEdit
                  onClick={(e) => openEditModal(e, song)}
                  style={{ cursor: 'pointer', color: '#27ae60', marginRight: 10 }}
                />
                <FaTrash
                  onClick={(e) => handleDelete(e, song.id, song.title)}
                  style={{ cursor: 'pointer', color: '#e74c3c' }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div css={styles.player}>
        <h2>Now Playing</h2>
        <p><strong>{currentSong.title}</strong> by {currentSong.artist} ({currentSong.year})</p>
        <audio controls ref={audioRef} css={styles.audioPlayer}>
          <source src={`http://localhost:5000${currentSong.audioUrl}`} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <div css={styles.navButtons}>
          <button onClick={handlePrev} style={{ marginRight: 10 }}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div
          css={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
          onClick={handleEditCancel}
        >
          <form
            onClick={e => e.stopPropagation()}
            onSubmit={handleEditSubmit}
            css={{
              background: 'white',
              padding: 20,
              borderRadius: 8,
              minWidth: 300,
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }}
          >
            <h3>Edit Song</h3>
            <label>
              Title:
              <input
                name="title"
                type="text"
                value={editData.title}
                onChange={handleEditChange}
                required
                css={{ width: '100%', padding: 6 }}
              />
            </label>
            <label>
              Artist:
              <input
                name="artist"
                type="text"
                value={editData.artist}
                onChange={handleEditChange}
                required
                css={{ width: '100%', padding: 6 }}
              />
            </label>
            <label>
              Year:
              <input
                name="year"
                type="number"
                value={editData.year}
                onChange={handleEditChange}
                required
                css={{ width: '100%', padding: 6 }}
              />
            </label>
            <label>
              Album Image:
              <input
                name="albumFile"
                type="file"
                accept="image/*"
                onChange={handleEditChange}
                css={{ width: '100%' }}
              />
            </label>
            <label>
              Audio File:
              <input
                name="audioFile"
                type="file"
                accept="audio/*"
                onChange={handleEditChange}
                css={{ width: '100%' }}
              />
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button type="button" onClick={handleEditCancel}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Home;
