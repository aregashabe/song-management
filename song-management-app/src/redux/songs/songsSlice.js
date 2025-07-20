import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: { songs: [], loading: false, error: null },
  reducers: {
    fetchSongsRequest: state => { state.loading = true; },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createSongRequest: (state) => { state.loading = true; },
    createSongSuccess: (state, action) => {
      state.loading = false;
      state.songs.push(action.payload); // 🟢 adds new song without refresh
    },
    createSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure,
  createSongRequest, createSongSuccess, createSongFailure
} = songsSlice.actions;

export default songsSlice.reducer;
