import { all } from 'redux-saga/effects';
import { songsSaga } from './songs/songsSaga'; // ✅ correct function

export default function* rootSaga() {
  yield all([songsSaga()]); // ✅ call the correct saga
}
