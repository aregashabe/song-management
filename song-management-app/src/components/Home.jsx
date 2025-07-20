import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs, deleteSong } from '../redux/musicSlice'; // Your redux actions
import { useNavigate } from 'react-router-dom';
import * as Styles from './Styles/HomeStyle'; // Your styled components or CSS module
import menuIcon from "../images/menu-dots-svgrepo-com.svg";

const Home = ({ handleSelectedSongIndexChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const songs = useSelector((state) => state.music.songs || []);
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch songs on component mount
  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  // Toggle dropdown menu visibility for each song item
  const handleMenuClick = (index) => {
    setVisibleDropdown(visibleDropdown === index ? null : index);
  };

  // Handle song delete action
  const handleDelete = async (songId, index) => {
    setVisibleDropdown(null);
    setDeleting(true);
    try {
      await dispatch(deleteSong(songId));
    } catch (error) {
      console.error('Error deleting song:', error);
      alert('An error occurred while deleting the song. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  // Navigate to update form/page
  const handleUpdate = (songId) => {
    navigate(`/update/${songId}`);
  };

  return (
    <Styles.Main>
      {deleting && (
        <Styles.LoadingOverlay>
          <Styles.LoadingAnimation />
        </Styles.LoadingOverlay>
      )}

      <Styles.Banner />

      <Styles.Playlist>Playlist</Styles.Playlist>

      <Styles.SongList>
        {songs.length === 0 && <p>No songs available.</p>}
        {songs.map((song, index) => (
          <div className="songItem" key={song.id}>
            <img
              className="thbn"
              src={song.albumUrl || 'fallback-image-url.jpg'}
              alt={`Album cover for ${song.title}`}
            />
            <div
              className="content"
              onClick={() => handleSelectedSongIndexChange(index)}
              style={{ cursor: 'pointer' }}
            >
              <h3 className="title">{song.title}</h3>
              <p className="p">{song.artist}</p>
            </div>
            <div className="menu">
              <img
                className="menu-image"
                src={menuIcon}
                alt="Menu"
                onClick={() => handleMenuClick(index)}
                style={{ cursor: 'pointer' }}
              />
              <div
                className="dropdown"
                style={{
                  display: visibleDropdown === index ? 'block' : 'none',
                  maxHeight: visibleDropdown === index ? '100px' : '0',
                  transition: 'max-height 0.3s ease',
                  overflow: 'hidden',
                }}
              >
                <div className="dropdown-item" onClick={() => handleUpdate(song.id)}>
                  Update
                </div>
                <div className="dropdown-item" onClick={() => handleDelete(song.id, index)}>
                  Delete
                </div>
              </div>
            </div>
          </div>
        ))}
      </Styles.SongList>
    </Styles.Main>
  );
};

export default Home;
