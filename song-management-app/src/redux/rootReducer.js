import { combineReducers } from '@reduxjs/toolkit';
import songsReducer from './songs/songsSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
  // add other reducers here
});

export default rootReducer;
