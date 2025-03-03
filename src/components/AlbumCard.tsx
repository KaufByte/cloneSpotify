import React from 'react';
import './AlbumCard.css';

export interface Album {
  id: number;
  title: string;
  artistId: number;
  releaseDate: string; 
  image: string;
  songs: number[];
}

interface AlbumProps {
  album: Album;
  onSelectAlbum: (album: Album) => void;
}

const AlbumCard: React.FC<AlbumProps> = ({ album, onSelectAlbum }) => {
  const year = new Date(album.releaseDate).getFullYear();
  const handleClick = () => {
    console.log("Clicked album:", album);
    onSelectAlbum(album);
  };

  return (
    <div
      role="button"
      aria-disabled="false"
      aria-labelledby={`card-title-${album.id} card-subtitle-${album.id}`}
      aria-describedby={`onClickHint${album.id}`}
      tabIndex={0}
      className="album-card"
      onClick={handleClick}
    >
      <img
        src={album.image}
        alt={album.title}
        className="album-image"
      />
      <h3
        id={`card-title-${album.id}`}
        className="album-title"
      >
        {album.title}
      </h3>
      <p
        id={`card-subtitle-${album.id}`}
        className="album-subtitle"
      >
        {`${year} • Альбом`}
      </p>
    </div>
  );
};

export default AlbumCard;
