/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  containerStyle,
  createButtonStyle,
  formStyle,
  labelStyle,
  inputStyle
} from './style/Create.styles';
import { createSongRequest } from '../redux/songs/songsSlice'; // ✅ import your Redux action

function Create() {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: null,
    song: null,
    year: ''
  });

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] || null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('artist', formData.artist);
    formDataToSend.append('album', formData.album);
    formDataToSend.append('audio', formData.song);
    formDataToSend.append('year', formData.year);

    // ✅ Send to redux-saga
    dispatch(createSongRequest(formDataToSend));

    // Reset form & hide
    setShowForm(false);
    setFormData({
      title: '',
      artist: '',
      album: null,
      song: null,
      year: ''
    });
  };

  return (
    <div css={containerStyle}>
      {!showForm && (
        <button css={createButtonStyle} onClick={() => setShowForm(true)}>
          Create
        </button>
      )}

      {showForm && (
        <form css={formStyle} onSubmit={handleSubmit}>
          <label css={labelStyle}>
            Title:
            <input
              css={inputStyle}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label css={labelStyle}>
            Artist:
            <input
              css={inputStyle}
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              required
            />
          </label>

          <label css={labelStyle}>
            Album (Image):
            <input
              css={inputStyle}
              type="file"
              name="album"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </label>

          <label css={labelStyle}>
            Song (Audio):
            <input
              css={inputStyle}
              type="file"
              name="song"
              accept="audio/*"
              onChange={handleChange}
              required
            />
          </label>

          <label css={labelStyle}>
            Year:
            <input
              css={inputStyle}
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              min="1900"
              max={new Date().getFullYear()}
            />
          </label>

          <div>
            <button css={createButtonStyle} type="submit">Submit</button>{' '}
            <button css={createButtonStyle} type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Create;
