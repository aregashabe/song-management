import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure,
  createSongRequest, createSongSuccess, createSongFailure,
  deleteSongRequest, deleteSongSuccess, deleteSongFailure,
  updateSongRequest, updateSongSuccess, updateSongFailure
} from './songsSlice';

// Helper function to handle API errors
function handleApiError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    return error.response.data.error || `Server responded with ${error.response.status}`;
  } else if (error.request) {
    // The request was made but no response was received
    return 'No response from server';
  } else {
    // Something happened in setting up the request
    return error.message || 'Unknown error occurred';
  }
}

// GET all songs
function* fetchSongs() {
  try {
    const response = yield call(axios.get, 'http://localhost:5000/api/songs');
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(handleApiError(error)));
  }
}

// POST (create) new song
function* createSong(action) {
  try {
    const formData = action.payload;
    const response = yield call(axios.post, 'http://localhost:5000/api/songs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    yield put(createSongSuccess(response.data));
  } catch (error) {
    yield put(createSongFailure(handleApiError(error)));
  }
}

// DELETE a song
function* deleteSong(action) {
  try {
    const id = action.payload;
    console.log('Attempting to delete song with ID:', id); // Add logging
    
    // Convert ID to number if it's a string
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    // Verify the ID is a valid number
    if (isNaN(numericId)) {
      throw new Error('Invalid song ID');
    }

    const response = yield call(axios.delete, `http://localhost:5000/api/songs/${numericId}`);
    
    if (response.status === 200) {
      yield put(deleteSongSuccess(numericId));
    } else {
      throw new Error(response.data?.error || 'Failed to delete song');
    }
  } catch (error) {
    console.error('Delete failed:', error);
    yield put(deleteSongFailure(error.message));
  }
}

// PUT (update) a song
function* updateSong(action) {
  try {
    const { id, data } = action.payload;
    const numericId = typeof id === 'string' ? Number(id) : id;

    // Assume data is already FormData (from Home.jsx)
    const response = yield call(
      axios.put,
      `http://localhost:5000/api/songs/${numericId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(updateSongFailure(handleApiError(error)));
  }
}

// Watcher saga
export function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
  yield takeLatest(createSongRequest.type, createSong);
  yield takeLatest(deleteSongRequest.type, deleteSong);
  yield takeLatest(updateSongRequest.type, updateSong);
}