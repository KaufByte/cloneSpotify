import React, { useState, useEffect } from 'react';
import Songs, { Artist, Song } from './Songs'; 
import SongDetail from './SongDetail'; 
import AuthorInfo from './AuthorInfo'; 
import AudioPlayer from './Audioplayer'; 
import Layout from './Layout'; 
import songsData from '../server/db.json'; 

import './main-page.css';

const SpotifyPage: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); 

  const handleSelectSong = (song: Song) => {
    console.log("Selected song:", song); 
    setSelectedSong(song);
  };

  const handleSongChange = (songId: number) => {
    console.log("Changing to song ID:", songId); 
    const songToPlay = songsData.songs.find((song) => song.id === songId);
    console.log("Song found:", songToPlay); 
    setSelectedSong(songToPlay || null);
  };

  useEffect(() => {
    setArtists(songsData.artists);
    console.log("Artists loaded:", songsData.artists); 
  }, []);

  const selectedArtist = selectedSong ? artists.find(artist => artist.id === selectedSong.artistId) : null;

  return (
    <div className="main-page">
      <div className="app-container">
        <Layout setSearchTerm={setSearchTerm} /> 
        <div className="songs-container">
          <Songs onSelectSong={handleSelectSong} artists={artists} searchTerm={searchTerm} /> 
        </div>
        <div className="content">
          <SongDetail song={selectedSong} artists={artists} /> 
          {selectedArtist && <AuthorInfo artist={selectedArtist} />} 
        </div>
        {selectedSong && (
          <AudioPlayer 
            songSrc={selectedSong.musicFile}
            songImage={selectedSong.image}
            songTitle={selectedSong.title}
            artistName={selectedArtist ? selectedArtist.name : null}
            currentSongId={selectedSong.id} 
            fullscreenImage={selectedSong.fullscreenImage}
            songs={songsData.songs} 
            onSongChange={handleSongChange} 
          />
        )}
      </div>
    </div>
  );
};

export default SpotifyPage;
