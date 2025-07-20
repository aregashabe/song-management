import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure,
  createSongRequest, createSongSuccess, createSongFailure
} from './songsSlice';

function* fetchSongs() {
  try {
    const response = yield call(axios.get, 'http://localhost:5000/api/songs');
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* createSong(action) {
  try {
    const formData = action.payload;
    const response = yield call(axios.post, 'http://localhost:5000/api/songs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    yield put(createSongSuccess(response.data));
  } catch (error) {
    yield put(createSongFailure(error.message));
  }
}

export function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
  yield takeLatest(createSongRequest.type, createSong);
}
