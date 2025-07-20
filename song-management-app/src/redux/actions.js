// src/redux/actions/songActions.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/songs';

// Add a song
export const addSong = (songData) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('title', songData.title);
    formData.append('artist', songData.artist);
    formData.append('year', songData.year);
    if (songData.songFile) formData.append('song', songData.songFile);
    if (songData.albumFile) formData.append('album', songData.albumFile);

    const response = await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    dispatch({ type: 'ADD_SONG_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error adding song:', error);
    dispatch({ type: 'ADD_SONG_FAILURE', payload: error.message });
  }
};

// Update a song
export const updateSong = (songId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${songId}`, updatedData);
    dispatch({ type: 'UPDATE_SONG_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error updating song:', error);
    dispatch({ type: 'UPDATE_SONG_FAILURE', payload: error.message });
  }
};

// Delete a song
export const deleteSong = (songId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${songId}`);
    dispatch({ type: 'DELETE_SONG_SUCCESS', payload: songId });
  } catch (error) {
    console.error('Error deleting song:', error);
    dispatch({ type: 'DELETE_SONG_FAILURE', payload: error.message });
  }
};
