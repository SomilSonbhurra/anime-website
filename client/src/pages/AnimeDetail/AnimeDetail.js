import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AnimeDetail.css';
import SuggestionBox from '../../components/SuggestionBox/SuggestionBox';

function generateEpisodeLinks(startId, endId, startEpisode = 1) {
  const links = {};
  let episodeNumber = startEpisode;
  for (let i = startId; i <= endId; i++) {
    links[episodeNumber] = i.toString();
    episodeNumber++;
  }
  return links;
}

const animeData = {
  naruto: {
    title: "Naruto",
    slug: "naruto-677",
    description: "A young ninja strives to be the best in his village.",
    totalEpisodes: 220,
    seasons: 3,
    episodeLinks: generateEpisodeLinks(12352, 12571),
  },
  bleach: {
    title: "Bleach",
    slug: "bleach-806",
    description: "Ichigo becomes a Soul Reaper to protect the living and dead.",
    totalEpisodes: 366,
    seasons: 4,
    episodeLinks: generateEpisodeLinks(13793, 14158),
  },
  onepiece: {
    title: "One Piece",
    slug: "one-piece-100",
    description: "Luffy sails to find the ultimate treasure, the One Piece.",
    totalEpisodes: 1100,
    seasons: 11,
    episodeLinks: {
      ...generateEpisodeLinks(2142, 3086),
      ...generateEpisodeLinks(50557, 50711, 946),
      ...generateEpisodeLinks(54244, 54391, 953),
    },
  },
  dragon: {
    title: "Dragon Ball",
    slug: "dragon-ball-509",
    description: "Goku embarks on a journey to collect all seven Dragon Balls.",
    totalEpisodes: 153,
    seasons: 2,
    episodeLinks: generateEpisodeLinks(12572, 12724),
  },
  jjk: {
    title: "Jujutsu Kaisen",
    slug: "jujutsu-kaisen-2020",
    description: "Yuji Itadori joins a secret organization to fight curses.",
    totalEpisodes: 36,
    seasons: 2,
    episodeLinks: generateEpisodeLinks(15000, 15035),
  },
  solo: {
    title: "Solo Leveling",
    slug: "solo-leveling-2024",
    description: "Jinwoo levels up in a world full of hunters and monsters.",
    totalEpisodes: 25,
    seasons: 2,
    episodeLinks: generateEpisodeLinks(16000, 16024),
  },
  fireforce: {
    title: "Fire Force",
    slug: "fire-force-2019",
    description: "Shinra joins Fire Force Company 8 to save the world from infernals.",
    totalEpisodes: 48,
    seasons: 3,
    episodeLinks: generateEpisodeLinks(16169, 16216),
  },
  aot: {
    title: "Attack on Titan",
    slug: "attack-on-titan-112",
    description: "Eren and his friends fight for survival in a world overrun by Titans.",
    totalEpisodes: 89,
    seasons: 6, // S4 split into 3 parts
    episodeLinks: generateEpisodeLinks(16169, 16257), // Adjust IDs as per actual mapping
  },
};

export default function AnimeDetail() {
  const { animeId } = useParams();
  const anime = animeData[animeId];
  const [lastWatched, setLastWatched] = useState(null);
  const [openSeason, setOpenSeason] = useState(null);

  const episodesPerSeason = [];

  if (animeId === "naruto") {
    episodesPerSeason.push(100, 100, 20);
  } else if (animeId === "onepiece") {
    for (let i = 0; i < 11; i++) episodesPerSeason.push(100);
  } else if (animeId === "bleach") {
    episodesPerSeason.push(100, 100, 100, 66);
  } else if (animeId === "dragon") {
    episodesPerSeason.push(100, 53);
  } else if (animeId === "jjk") {
    episodesPerSeason.push(24, 12);
  } else if (animeId === "fireforce") {
    episodesPerSeason.push(24, 24, 12);
  } else if (animeId === "solo") {
    episodesPerSeason.push(12, 13);
  } else if (animeId === "aot") {
    episodesPerSeason.push(25, 12, 22, 16, 12, 2); // S1, S2, S3, S4P1, S4P2, S4P3
  } else {
    const eps = Math.floor(anime.totalEpisodes / anime.seasons);
    let remaining = anime.totalEpisodes;
    for (let i = 0; i < anime.seasons; i++) {
      const count = i === anime.seasons - 1 ? remaining : eps;
      episodesPerSeason.push(count);
      remaining -= count;
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem(`lastWatched_${animeId}`);
    if (stored) setLastWatched(Number(stored));
  }, [animeId]);

  const resetEachSeason = ["jjk", "solo", "fireforce" , "aot"].includes(animeId);

  return (
    <div className="anime-detail-container">
      <h1>{anime.title}</h1>
      <p>{anime.description}</p>

      <h2 className="season-heading">More Seasons</h2>
      <div className="season-boxes">
        {Array.from({ length: anime.seasons }, (_, seasonIndex) => (
          <div
            key={seasonIndex}
            className={`season-box ${openSeason === seasonIndex ? 'active' : ''}`}
            onClick={() => setOpenSeason(seasonIndex)}
          >
            {animeId === "aot" && seasonIndex >= 3
              ? `Season 4 - Part ${seasonIndex - 2}`
              : `Season ${seasonIndex + 1}`}
          </div>
        ))}
      </div>

      {openSeason !== null && (
        <div className="episode-grid">
          {(() => {
            const startEpisode = openSeason === 0 ? 1 : episodesPerSeason.slice(0, openSeason).reduce((a, b) => a + b, 0) + 1;

            return Array.from({ length: episodesPerSeason[openSeason] }, (_, i) => {
              const globalEpisode = startEpisode + i;
              const localEpisode = resetEachSeason ? i + 1 : globalEpisode;
              const epId = anime.episodeLinks[globalEpisode];

              return (
                <div
                  key={globalEpisode}
                  className={`episode-card ${lastWatched === globalEpisode ? 'last-watched' : ''}`}
                  onClick={() => {
                    if (epId) {
                      localStorage.setItem(`lastWatched_${animeId}`, globalEpisode);
                      window.open(`https://aniwatchtv.to/watch/${anime.slug}?ep=${epId}`, '_blank');
                      setLastWatched(globalEpisode);
                    } else {
                      alert("Episode not available.");
                    }
                  }}
                >
                  <h3>Episode {localEpisode}</h3>
                </div>
              );
            });
          })()}
        </div>
      )}

      <SuggestionBox />
    </div>
  );
}
