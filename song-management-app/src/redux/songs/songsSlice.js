import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: { songs: [], loading: false, error: null },
  reducers: {
    // FETCH SONGS
    fetchSongsRequest: (state) => { state.loading = true; },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // CREATE SONG
    createSongRequest: (state) => { state.loading = true; },
    createSongSuccess: (state, action) => {
      state.loading = false;
      state.songs.push(action.payload);
    },
    createSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // DELETE SONG
    deleteSongRequest: (state) => { state.loading = true; },
    deleteSongSuccess: (state, action) => {
      state.loading = false;
      state.songs = state.songs.filter(song => song.id !== action.payload);
    },
    deleteSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // UPDATE SONG
    updateSongRequest: (state) => { state.loading = true; },
    updateSongSuccess: (state, action) => {
      state.loading = false;
      const index = state.songs.findIndex(song => song.id === action.payload.id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    updateSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure,
  createSongRequest, createSongSuccess, createSongFailure,
  deleteSongRequest, deleteSongSuccess, deleteSongFailure,
  updateSongRequest, updateSongSuccess, updateSongFailure
} = songsSlice.actions;

export default songsSlice.reducer;
