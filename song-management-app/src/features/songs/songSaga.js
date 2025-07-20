// src/features/songs/songSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
} from './songSlice';

function fetchSongsApi() {
  return axios.get(`${process.env.API_BASE_URL}/songs`);
}

function* fetchSongsWorker() {
  try {
    const response = yield call(fetchSongsApi);
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

export default function* songSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsWorker);
}
