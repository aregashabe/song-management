// src/features/songs/songSlice.js
import { createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
  name: 'songs',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchSongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addSong(state, action) {
      state.list.push(action.payload);
    },
    updateSong(state, action) {
      const index = state.list.findIndex(song => song.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteSong(state, action) {
      state.list = state.list.filter(song => song.id !== action.payload);
    }
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  updateSong,
  deleteSong
} = songSlice.actions;

export default songSlice.reducer;
