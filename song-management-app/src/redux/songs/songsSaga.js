import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure,
  createSongRequest, createSongSuccess, createSongFailure,
  deleteSongRequest, deleteSongSuccess, deleteSongFailure,
  updateSongRequest, updateSongSuccess, updateSongFailure
} from './songsSlice';

// Use environment variable or fallback to localhost
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

// Helper function to handle API errors
function handleApiError(error) {
  if (error.response) {
    return error.response.data.error || `Server responded with ${error.response.status}`;
  } else if (error.request) {
    return 'No response from server';
  } else {
    return error.message || 'Unknown error occurred';
  }
}

// GET all songs
function* fetchSongs() {
  try {
    const response = yield call(axios.get, `${API_BASE_URL}/api/songs`);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(handleApiError(error)));
  }
}

// POST (create) new song
function* createSong(action) {
  try {
    const formData = action.payload;
    const response = yield call(axios.post, `${API_BASE_URL}/api/songs`, formData, {
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
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(numericId)) throw new Error('Invalid song ID');

    const response = yield call(axios.delete, `${API_BASE_URL}/api/songs/${numericId}`);

    if (response.status === 200) {
      yield put(deleteSongSuccess(numericId));
    } else {
      throw new Error(response.data?.error || 'Failed to delete song');
    }
  } catch (error) {
    yield put(deleteSongFailure(handleApiError(error)));
  }
}

// PUT (update) a song
function* updateSong(action) {
  try {
    const { id, data } = action.payload;
    const numericId = typeof id === 'string' ? Number(id) : id;

    const response = yield call(axios.put, `${API_BASE_URL}/api/songs/${numericId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

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
