import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  songs: [],
  selectedSongIndex: 0,
  uploading: false,
  error: null,
};



const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setSelectedSongIndex(state, action) {
      state.selectedSongIndex = action.payload;
    },
    
    fetchSongs(state) {
      state.uploading = true;
    },
    
    fetchSongsSuccess(state, action) {
      state.uploading = false;
      state.songs = action.payload;
    },
    
    fetchSongsFailure(state, action) {
      state.uploading = false;
      state.error = action.payload;
    },
    
    uploadSong(state) {
      state.uploading = true;
    },
    
    uploadSongSuccess(state, action) {
      state.uploading = false;
      state.songs.push(action.payload);
    },
    
    uploadSongFailure(state, action) {
      state.uploading = false;
      state.error = action.payload;
    },
    
    deleteSong(state) {
      state.uploading = true;
    },
    
    deleteSongSuccess(state, action) {
      state.uploading = false;
      state.songs = state.songs.filter(song => song.id !== action.payload);
    },
    
    deleteSongFailure(state, action) {
      state.uploading = false;
      state.error = action.payload;
    },

    
  },
});

export const {
  setSelectedSongIndex,
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  uploadSong,
  uploadSongSuccess,
  uploadSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
} = musicSlice.actions;

export default musicSlice.reducer;
