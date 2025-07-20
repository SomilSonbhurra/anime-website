// CategorySection.js
import React from 'react';
import AnimeCard from './AnimeCard';

const sectionStyle = {
  flex: 1,
  padding: '10px',
};

const titleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '10px',
  color: '#facc15',
};

const viewMoreStyle = {
  marginTop: '10px',
  fontSize: '13px',
  color: '#ccc',
  textDecoration: 'underline',
  cursor: 'pointer',
};

const CategorySection = ({ title, animes = [], onViewMore }) => {
  console.log("Rendering CategorySection:", title);
  console.log("Received animes:", animes);

  return (
    <div style={sectionStyle}>
      <div style={titleStyle}>{title}</div>
      {Array.isArray(animes) ? (
        animes.map((anime, index) => (
          <AnimeCard key={index} {...anime} />
        ))
      ) : (
        <p style={{ color: 'red' }}>⚠️ No anime data available</p>
      )}
      <div style={viewMoreStyle} onClick={onViewMore}>
        View more
   </div>
    </div>
  );
};

// Default props fallback
CategorySection.defaultProps = {
  animes: [],
};

export default CategorySection;