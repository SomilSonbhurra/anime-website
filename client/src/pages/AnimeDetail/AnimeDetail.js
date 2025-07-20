import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AnimeDetail.css';
import SuggestionBox from '../../components/SuggestionBox/SuggestionBox';

const animeData = {
  naruto: {
    title: "Naruto",
    description: "A young ninja strives to be the best in his village.",
    totalEpisodes: 500,
    seasons: 5,
  },
};

export default function AnimeDetail() {
  const { animeId } = useParams();
  const navigate = useNavigate();
  const anime = animeData[animeId];
  const [openSeason, setOpenSeason] = useState(null); // only one open at a time

  if (!anime) return <h2 style={{ color: 'red' }}>Anime not found.</h2>;

  const episodesPerSeason = anime.totalEpisodes / anime.seasons;

  const toggleSeason = (seasonIndex) => {
    setOpenSeason(openSeason === seasonIndex ? null : seasonIndex);
  };

  return (
    <div className="anime-detail-container">
      <h1>{anime.title}</h1>
      <p>{anime.description}</p>

      {Array.from({ length: anime.seasons }, (_, seasonIndex) => {
        const seasonNumber = seasonIndex + 1;
        const startEpisode = seasonIndex * episodesPerSeason + 1;

        return (
          <div key={seasonIndex} className="season-section">
            <div
              className="season-dropdown"
              onClick={() => toggleSeason(seasonIndex)}
            >
              <span>Season {seasonNumber}</span>
              <span className="arrow">
                {openSeason === seasonIndex ? '▲' : '▼'}
              </span>
            </div>

            {openSeason === seasonIndex && (
              <div className="episode-grid">
                {Array.from({ length: episodesPerSeason }, (_, i) => {
                  const episodeNumber = startEpisode + i;
                  return (
                    <div
                      key={episodeNumber}
                      className="episode-card"
                      onClick={() =>
                        navigate(`/watch/${animeId}/episode/${episodeNumber}`)
                      }
                    >
                      <h3>Episode {episodeNumber}</h3>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      <SuggestionBox />
    </div>
  );
}
