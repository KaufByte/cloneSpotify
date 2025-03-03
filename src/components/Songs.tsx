import React from 'react';
import './Songs.css';

export interface Song {
  id: number;
  title: string;
  artistId: number;
  albumId: number;
  image: string;
  musicFile: string;
  fullscreenImage: string;
  duration: string;
  plays: string;
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
  songs: Song[];
  selectedArtist: Artist;
}

const Songs: React.FC<SongsProps> = ({ onSelectSong, searchTerm, songs, selectedArtist }) => {
  // Фильтруем песни по названию
  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="songs-container">

      {/* 🔥 Красный блок с информацией об артисте */}
      <div className="artist-banner-wrapper">
        <div className="artist-banner">
          <div className="artist-image-container">
            <img src={selectedArtist.image} alt={selectedArtist.name} className="artist-image" />
          </div>
          <div className="artist-info">
            <span className="verified-artist">Подтвержденный исполнитель</span>
            <h1 className="artist-name">{selectedArtist.name}</h1>
            <p className="listeners-count">
              {selectedArtist.listeners} слушателя за месяц
            </p>
          </div>
        </div>

        {/* 🔥 Блок кнопок (Play, Подписаться и «...»), как на скриншоте */}
        <div className="artist-actions">
          <button className="play-button">▶</button>
          <button className="subscribe-button">Уже подписаны</button>
          <button className="more-button">···</button>
        </div>
      </div>

      {/* 🔥 Заголовок "Популярные треки" */}
      <h2 className="popular-songs-title">Популярные треки</h2>

      {/* 🔥 Список треков */}
      <div className="songs-list">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => {
            return (
              <div
                role="button"
                tabIndex={0}
                className="song-row"
                key={song.id}
                onClick={() => onSelectSong(song)}
                onKeyDown={(e) => e.key === 'Enter' && onSelectSong(song)}
              >
                <span className="song-rank">{index + 1}</span>
                <img src={song.image} alt={song.title} className="song-cover" />

                <div className="song-info">
                  <span className="song-title">{song.title}</span>
                </div>

                {/* Количество прослушиваний */}
                <span className="song-plays">
                  {parseInt(song.plays).toLocaleString()}
                </span>

                {/* Длительность трека */}
                <span className="song-duration">{song.duration}</span>
              </div>
            );
          })
        ) : (
          <p className="no-songs">Нет доступных песен</p>
        )}
      </div>
    </div>
  );
};

export default Songs;
