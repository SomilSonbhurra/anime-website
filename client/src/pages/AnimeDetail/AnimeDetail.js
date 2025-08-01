import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AnimeDetail.css';
import SuggestionBox from '../../components/SuggestionBox/SuggestionBox';

// Helper function to generate episode links
function generateEpisodeLinks(startId, endId, startEpisode = 1) {
  const links = {};
  let episodeNumber = startEpisode;
  for (let i = startId; i <= endId; i++) {
    links[episodeNumber] = i.toString();
    episodeNumber++;
  }
  return links;
}


// Anime data with multiple entries
const animeData = {
  naruto: {
    title: "Naruto",
    slug: "naruto-677",
    description: "A young ninja strives to be the best in his village.",
    totalEpisodes: 220,
    seasons: 3,
    episodeLinks: generateEpisodeLinks(12352, 12571), // 220 episodes
  },
  bleach: {
    title: "Bleach",
   slug: "bleach-806",
    description: "Ichigo becomes a Soul Reaper to protect the living and dead.",
    totalEpisodes: 366,
    seasons: 4, // ✅ 4 seasons
    episodeLinks: generateEpisodeLinks(13793, 14158), // ✅ Correct ID range
  },
  onepiece: {
    title: "One Piece",
    slug: "one-piece-100",
    description: "Luffy sails to find the ultimate treasure, the One Piece.",
    totalEpisodes: 1100,
    seasons: 11, // ✅ Now exactly 11 seasons
    episodeLinks: {
      ...generateEpisodeLinks(2142, 3086), // Episodes 1-945 
      ...generateEpisodeLinks(50557, 50711, 946), // Episodes 946–1100
      ...generateEpisodeLinks(54244, 54391, 953),   // Episodes 953–1100 (148 episodes)
      ...generateEpisodeLinks(50564, 54391, 953),   // Episodes 953–1100 (148 episodes)
    },
  },
};

export default function AnimeDetail() {
  const { animeId } = useParams();
  const anime = animeData[animeId];
  const [openSeason, setOpenSeason] = useState(null);
  const [lastWatched, setLastWatched] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(`lastWatched_${animeId}`);
    if (stored) setLastWatched(Number(stored));
  }, [animeId]);

  if (!anime) return <h2 style={{ color: 'red' }}>Anime not found.</h2>;

  // Set custom episodes per season if defined
  const episodesPerSeason = [];
  if (animeId === "naruto") {
    episodesPerSeason.push(100, 100, 20); // 3 seasons
  } else if (animeId === "onepiece") {
    for (let i = 0; i < 11; i++) {
      episodesPerSeason.push(100); // 11 seasons of 100
    }
  } else if (animeId === "bleach") {
    episodesPerSeason.push(100, 100, 100, 66); // 🟢 4 seasons as requested
  } else {
    // fallback
    const eps = Math.floor(anime.totalEpisodes / anime.seasons);
    let remaining = anime.totalEpisodes;
    for (let i = 0; i < anime.seasons; i++) {
      const current = i === anime.seasons - 1 ? remaining : eps;
      episodesPerSeason.push(current);
      remaining -= current;
    }
  }


  const toggleSeason = (seasonIndex) => {
    setOpenSeason(openSeason === seasonIndex ? null : seasonIndex);
  };

  return (
    <div className="anime-detail-container">
      <h1>{anime.title}</h1>
      <p>{anime.description}</p>

      {lastWatched && (
        <p style={{ fontWeight: 'bold', color: 'green' }}>
          ✅ You last watched Episode {lastWatched}
        </p>
      )}

      {Array.from({ length: anime.seasons }, (_, seasonIndex) => {
        const seasonNumber = seasonIndex + 1;
        const startEpisode = seasonIndex === 0
          ? 1
          : episodesPerSeason.slice(0, seasonIndex).reduce((a, b) => a + b, 0) + 1;

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
                {Array.from({ length: episodesPerSeason[seasonIndex] }, (_, i) => {
                  const episodeNumber = startEpisode + i;
                  const epId = anime.episodeLinks[episodeNumber];

                  return (
                    <div
                      key={episodeNumber}
                      className={`episode-card ${lastWatched === episodeNumber ? 'last-watched' : ''
                        }`}
                      onClick={() => {
                        if (epId) {
                          localStorage.setItem(
                            `lastWatched_${animeId}`,
                            episodeNumber
                          );

                          const url = `https://aniwatchtv.to/watch/${anime.slug}?ep=${epId}`;
                          window.open(url, '_blank');
                          setLastWatched(episodeNumber);
                        } else {
                          alert("Episode not available.");
                        }
                      }}
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
