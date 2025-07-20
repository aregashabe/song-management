import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSongsSuccess,
  fetchSongsFailure,
  uploadSongSuccess,
  uploadSongFailure,
  deleteSongSuccess,
  deleteSongFailure,
} from './musicSlice';

const API_URL = 'http://localhost:5000/songs';

function* fetchSongsSaga() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* uploadSongSaga(action) {
  const { title, artist, genre, imageFile, songFile } = action.payload;

  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('genre', genre);
    if (imageFile) formData.append('image', imageFile);
    if (songFile) formData.append('song', songFile);

    const response = yield call(axios.post, API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    yield put(uploadSongSuccess(response.data));
  } catch (error) {
    yield put(uploadSongFailure(error.message));
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery('music/fetchSongs', fetchSongsSaga),
    takeEvery('music/uploadSong', uploadSongSaga),
    takeEvery('music/deleteSong', deleteSongSaga),
  ]);
}
