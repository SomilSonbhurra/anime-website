// components/SuggestionBox.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuggestionBox.css';

const suggestions = [
  {
    title: "Naruto Shippuden",
    path: "/anime/naruto-shippuden",
    isNext: true,
    image: "https://upload.wikimedia.org/wikipedia/en/5/5f/Naruto_Shippuden_key_visual.jpg"
  },
  {
    title: "Classroom of the Elite",
    path: "/anime/classroom-of-the-elite",
    image: "https://cdn.myanimelist.net/images/anime/10/87409.jpg"
  },
  {
    title: "Attack on Titan",
    path: "/anime/attack-on-titan",
    image: "https://upload.wikimedia.org/wikipedia/en/7/70/Attack_on_Titan_Season_1.jpg"
  },
  {
    title: "One Piece",
    path: "/anime/one-piece",
    image: "https://upload.wikimedia.org/wikipedia/en/6/6f/One_Piece_Season_1_DVD.jpg"
  },
  {
    title: "Naruto Movies",
    path: "/anime/naruto-movie",
    image: "https://upload.wikimedia.org/wikipedia/en/d/d1/NarutoMoviePoster.jpg"
  },
  {
    title: "Dragon Ball Z",
    path: "/anime/dragon-ball-z",
    image: "https://upload.wikimedia.org/wikipedia/en/6/6b/Dragon_Ball_Z_Season_1_DVD.jpg"
  },
  {
    title: "Wind Breaker",
    path: "/anime/wind-breaker",
    image: "https://cdn.myanimelist.net/images/anime/1348/138094.jpg"
  }
];

const SuggestionBox = () => {
  const navigate = useNavigate();

  return (
    <div className="suggestion-box">
      <h2>📺 Suggested Anime</h2>
      <div className="suggestion-list">
        {suggestions.map((anime, index) => (
          <div
            key={index}
            className={`suggestion-card ${anime.isNext ? "next-series" : ""}`}
            onClick={() => navigate(anime.path)}
          >
            <img src={anime.image} alt={anime.title} className="suggestion-image" />
            <div className="suggestion-info">
              <h3>{anime.title}</h3>
              {anime.isNext && <span className="next-badge">Next in Series</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionBox;
