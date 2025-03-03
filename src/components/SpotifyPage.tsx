import React, { useState, useEffect } from 'react';
import Songs, { Artist, Song } from './Songs'; 
import './AlbumCard.css';
import SongInfo from "./SongInfo";
import AudioPlayer from './Audioplayer'; 
import Layout from './Layout'; 
import { Album } from './AlbumCard'; 
import songsData from '../server/db.json'; 
import AlbumCard from './AlbumCard';
import Artists from './Artists';

import './SpotifyPage.css';

const SpotifyPage: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  useEffect(() => {
    setArtists(songsData.artists);
    setAlbums(songsData.albums);
  }, []);

  const handleSelectArtist = (artist: Artist) => {
    console.log("Выбран артист:", artist);
    setSelectedArtist(artist);

    // Фильтруем песни по artistId и добавляем недостающие поля (plays, duration)
    const songsByArtist: Song[] = songsData.songs
      .filter(song => song.artistId === artist.id)
      .map(song => ({
        ...song,
        plays: song.plays ?? 0, // Значение по умолчанию, если отсутствует
        duration: song.duration ?? "0:00" // Значение по умолчанию
      }));

    setFilteredSongs(songsByArtist);
  };

  return (
    <div className="main-page">
      <div className="app-container">
        <Layout setSearchTerm={setSearchTerm} /> 
        
        {/* 🔥 Колонка выбора исполнителей */}
        <div className="artists-container">
          <Artists artists={artists} onSelectArtist={handleSelectArtist} />
        </div>

        {/* 🔥 Если выбран артист - показываем его песни, иначе альбомы */}
        {selectedArtist ? (
            <Songs
              onSelectSong={setSelectedSong}
              artists={artists}
              searchTerm={searchTerm}
              songs={filteredSongs}
              selectedArtist={selectedArtist}
            />
        ) : (
          <div className="albums-container">
            <h1 className="albums-header">Альбомы с треками, которые тебе нравятся</h1> 
            <div className="albums-list">
              {albums.map(album => (
                <AlbumCard key={album.id} album={album} onSelectAlbum={() => {}} />
              ))}
            </div>
          </div>
        )}
        
        {/* 🔥 Блок информации о песне */}
        <div className="content">
          <SongInfo song={selectedSong} artists={artists} />
        </div>

        {/* 🔥 Аудиоплеер */}
        {selectedSong && (
          <AudioPlayer 
            songSrc={selectedSong.musicFile}
            songImage={selectedSong.image}
            songTitle={selectedSong.title}
            artistName={artists.find(a => a.id === selectedSong.artistId)?.name || ""}
            currentSongId={selectedSong.id} 
            fullscreenImage={selectedSong.fullscreenImage}
            songs={filteredSongs} 
            onSongChange={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default SpotifyPage;
