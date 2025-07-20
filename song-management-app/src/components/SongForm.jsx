import React, { useState } from 'react';
import {
  Form,
  InputItem,
  InputText,
  InputFile,
  FileButton,
  Icon,
  SubmitButton,
} from './Styles/SongFormStyles';
import songIcon from '../images/music-1005-svgrepo-com.svg';
import imageIcon from '../images/image-svgrepo-com.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uploadSong } from '../redux/musicSlice'; // Adjust path as needed

const SongForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleSongChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio')) {
      setSongFile(file);
    } else {
      alert('Please select a valid audio file.');
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image')) {
      setImageFile(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !artist || !year) {
      alert('Please fill in all fields.');
      return;
    }

    if (!songFile || !imageFile) {
      alert('Please upload both song and album files.');
      return;
    }

    // Dispatch uploadSong action to trigger saga
    dispatch(uploadSong({
      title,
      artist,
      year,       // Use "year" here to match backend
      songFile,
      imageFile,
    }));

    // Optionally clear form or navigate
    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputItem>
        <InputText
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputItem>

      <InputItem>
        <InputText
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      </InputItem>

      <InputItem>
        <InputText
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </InputItem>

      <InputFile>
        <input type="file" id="fileSong" onChange={handleSongChange} hidden />
        <FileButton type="button" onClick={() => document.getElementById('fileSong').click()}>
          <Icon src={songIcon} alt="Song Icon" />
          Song
        </FileButton>

        <input type="file" id="fileImage" onChange={handleImageChange} hidden />
        <FileButton type="button" onClick={() => document.getElementById('fileImage').click()}>
          <Icon src={imageIcon} alt="Image Icon" />
          Album
        </FileButton>
      </InputFile>

      <SubmitButton type="submit" value="Submit" />
    </Form>
  );
};

export default SongForm;
