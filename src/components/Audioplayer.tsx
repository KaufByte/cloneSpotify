import React, { useRef, useState, useEffect } from 'react';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import './AudioPlayer.css';

interface AudioPlayerProps {
  songSrc: string | null;
  songImage: string | null; 
  songTitle: string | null; 
  artistName: string | null; 
  currentSongId: number | null; // Текущий ID песни
  fullscreenImage: string | null; // Полноэкранное изображение
  songs: { id: number; musicFile: string; fullscreenImage: string }[]; // Массив всех песен
  onSongChange: (songId: number) => void; // Функция для изменения песни
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  songSrc, 
  songImage, 
  songTitle, 
  artistName, 
  currentSongId, 
  fullscreenImage, 
  songs, 
  onSongChange 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false); 
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (audioRef.current && songSrc) {
      audioRef.current.src = songSrc;
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }
  }, [songSrc]);

  const getRandomSongId = () => {
    let randomSongId;
    do {
      const randomIndex = Math.floor(Math.random() * songs.length);
      randomSongId = songs[randomIndex].id;
    } while (randomSongId === currentSongId); 
    return randomSongId;
  };

  const handleSkipPrevious = () => {
    if (isShuffling && currentSongId !== null) {
      onSongChange(getRandomSongId());
    } else if (currentSongId !== null) {
      const currentIndex = songs.findIndex(song => song.id === currentSongId);
      const previousIndex = (currentIndex === 0) ? songs.length - 1 : currentIndex - 1;
      onSongChange(songs[previousIndex].id);
    }
  };

  const handleSkipNext = () => {
    if (isShuffling && currentSongId !== null) {
      onSongChange(getRandomSongId());
    } else if (currentSongId !== null) {
      const currentIndex = songs.findIndex(song => song.id === currentSongId);
      const nextIndex = (currentIndex === songs.length - 1) ? 0 : currentIndex + 1;
      onSongChange(songs[nextIndex].id);
    }
  };

  const handleRepeatToggle = () => {
    setIsRepeating(prev => !prev);
  };

  const handleShuffleToggle = () => {
    setIsShuffling(prev => !prev);
  };

  const handleEnded = () => {
    if (isRepeating) {
      audioRef.current?.play();
    } else if (isShuffling) {
      onSongChange(getRandomSongId());
    } else {
      handleSkipNext();
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (playerRef.current) {
        playerRef.current.requestFullscreen().catch(err => {
          console.error("Error attempting to enable full-screen mode:", err);
        });
      }
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  // Обработчик выхода из полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Изменяем стиль фона при полноэкранном режиме
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      document.body.style.backgroundColor = 'transparent';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.backgroundColor = '';
    }
  }, [isFullscreen]);

  return (
    <div className={`spotify-player ${isFullscreen ? 'fullscreen' : ''}`} ref={playerRef}>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded}></audio>

      <div className="track-info">
        {songImage && <img src={songImage} className="track-image" alt="track" />}
        <div className="track-details">
          <span className="track-title">{songTitle}</span>
          <span className="track-artist">{artistName}</span>
        </div>
      </div>

      <div className="player-controls">
        <ShuffleIcon className={`icon ${isShuffling ? 'active' : 'inactive'}`} onClick={handleShuffleToggle} />
        <SkipPreviousIcon className="icon arrow" onClick={handleSkipPrevious} />
        {isPlaying ? (
          <PauseCircleFilledIcon className="icon play-pause" onClick={togglePlay} />
        ) : (
          <PlayCircleFilledWhiteIcon className="icon play-pause" onClick={togglePlay} />
        )}
        <SkipNextIcon className="icon arrow" onClick={handleSkipNext} />
        <RepeatIcon className={`icon ${isRepeating ? 'active' : 'inactive'}`} onClick={handleRepeatToggle} />
      </div>

      <div className="progress-bar">
        <span>
          {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
        </span>
        <input
          type="range"
          min="0"
          max={audioRef.current?.duration || 100}
          value={currentTime}
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.currentTime = parseFloat(e.target.value);
            }
          }}
        />
        <span>
          {Math.floor((audioRef.current?.duration || 0) / 60)}:
          {Math.floor((audioRef.current?.duration || 0) % 60).toString().padStart(2, '0')}
        </span>

        <div className="right-controls">
          <VolumeUpIcon className="icon" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
          <FullscreenIcon className="icon" onClick={toggleFullscreen} />
        </div>
      </div>

      {isFullscreen && fullscreenImage && (
        <div className="fullscreen-overlay">
          <img src={fullscreenImage} alt="fullscreen" className="fullscreen-image" />
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
