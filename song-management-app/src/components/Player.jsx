import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import play from "../images/play.svg";
import forward from "../images/next.svg";
import backward from "../images/back.svg";
import albumCover from '../images/test.jpg';
import pause from '../images/pause-svgrepo-com.svg';
import * as sty from "./Styles/PLayerStyle";

const Player = ({ selectedSongIndex }) => {
  const songs = useSelector((state) => state.music.songs);
  const [currentSongIndex, setCurrentSongIndex] = useState(selectedSongIndex || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  // Handle song index change from props
  useEffect(() => {
    if (selectedSongIndex != null && songs.length > 0) {
      setCurrentSongIndex(selectedSongIndex);
    }
  }, [selectedSongIndex, songs]);

  // Move to next song
  const handleNext = useCallback(() => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  }, [songs]);

  // Move to previous song
  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  // Load and play song
  useEffect(() => {
    const song = songs?.[currentSongIndex];
    if (song?.audioUrl) {
      setIsLoading(true);
      audioRef.current.src = song.audioUrl;
      audioRef.current.load();

      const handleCanPlay = () => {
        setIsLoading(false);
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      };

      const handleAudioError = (event) => {
        console.error('Audio Error:', event);
        setIsPlaying(false);
        setIsLoading(false);
      };

      const handleEnded = () => {
        handleNext();
      };

      const updateProgress = () => {
        setCurrentTime(audioRef.current.currentTime);
      };

      const updateDuration = () => {
        setDuration(audioRef.current.duration);
      };

      const currentAudio = audioRef.current;

      currentAudio.addEventListener('timeupdate', updateProgress);
      currentAudio.addEventListener('loadedmetadata', updateDuration);
      currentAudio.addEventListener('canplaythrough', handleCanPlay);
      currentAudio.addEventListener('error', handleAudioError);
      currentAudio.addEventListener('ended', handleEnded);

      currentAudio.play().catch((error) => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });

      setIsPlaying(true);

      return () => {
        currentAudio.pause();
        currentAudio.removeEventListener('timeupdate', updateProgress);
        currentAudio.removeEventListener('loadedmetadata', updateDuration);
        currentAudio.removeEventListener('canplaythrough', handleCanPlay);
        currentAudio.removeEventListener('error', handleAudioError);
        currentAudio.removeEventListener('ended', handleEnded);
      };
    } else {
      console.warn('⚠️ Song data is not available or missing audioUrl.');
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [currentSongIndex, songs, handleNext]);

  // Play or pause toggle
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else if (!isLoading) {
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (event) => {
    const value = event.target.value;
    const newTime = (audioRef.current.duration * value) / 100;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const currentSong = songs?.[currentSongIndex];

  if (!currentSong || !songs.length) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>🎵 Loading song...</div>;
  }

  return (
    <div>
      {isLoading && (
        <div className="loading">
          <div className="container">
            {[...Array(16)].map((_, i) => (
              <div className="dot" key={i}></div>
            ))}
          </div>
        </div>
      )}
      <sty.PlayerSection>
        <sty.PlayerMain>
          <sty.AlbumCover src={currentSong?.imageUrl || albumCover} alt="Album Cover" />
          <sty.PlayerInfo>
            <sty.SongDetails>{`${currentSong?.artist || 'Unknown Artist'} • ${currentSong?.genre || 'Unknown Genre'}`}</sty.SongDetails>
            <sty.SongTitle>{currentSong?.title || 'Unknown Title'}</sty.SongTitle>
          </sty.PlayerInfo>
        </sty.PlayerMain>

        <sty.PlayerProgress>
          <sty.Time>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</sty.Time>
          <sty.ProgressBar
            type="range"
            value={(currentTime / duration) * 100 || 0}
            max="100"
            onChange={handleProgressChange}
          />
          <sty.Time>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</sty.Time>
        </sty.PlayerProgress>

        <sty.PlayerControls>
          <sty.ControlButton onClick={handlePrev}>
            <img src={backward} alt="Previous" />
          </sty.ControlButton>
          <sty.PlayButton onClick={handlePlayPause}>
            <img src={isPlaying ? pause : play} alt={isPlaying ? "Pause" : "Play"} />
          </sty.PlayButton>
          <sty.ControlButton onClick={handleNext}>
            <img src={forward} alt="Next" />
          </sty.ControlButton>
        </sty.PlayerControls>
      </sty.PlayerSection>
    </div>
  );
};

export default Player;
