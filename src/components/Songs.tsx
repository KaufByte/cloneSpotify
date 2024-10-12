// Songs.tsx
import React, { useEffect, useState } from 'react';
import songsData from '../server/db.json';
import './Songs.css';

export interface Song {
  id: number;
  title: string;
  artistId: number;
  image: string;
  musicFile: string;
  fullscreenImage: string;
}

export interface Artist {
  id: number;
  name: string;
  description: string;
  image: string;
  listeners: string;
  link: string;
}

interface SongsProps {
  onSelectSong: (song: Song) => void;
  artists: Artist[];
  searchTerm: string; 
}

const Songs: React.FC<SongsProps> = ({ onSelectSong, artists, searchTerm }) => {
  const [songs, setSongs] = useState<Song[]>(songsData.songs);

  useEffect(() => {
    setSongs(songsData.songs);
  }, []);

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="songs-container">
      <h1 className="songs-title">Список песен</h1>
      <div className="songs-list">
        {filteredSongs.map((song) => {
          const artist = artists.find((artist) => artist.id === song.artistId);
          return (
            <div
              role="button"
              aria-disabled="false"
              aria-labelledby={`listrow-title-${song.id} listrow-subtitle-${song.id}`}
              tabIndex={0}
              className="song-item RowButton"
              key={song.id}
              onClick={() => onSelectSong(song)}
            >
              <img src={song.image} alt={song.title} className="song-image" />
              <div className="song-info">
                <div id={`listrow-title-${song.id}`} className="song-title">
                  {song.title}
                </div>
                <div id={`listrow-subtitle-${song.id}`} className="song-artist">
                  {artist ? artist.name : 'Неизвестный артист'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Songs;
