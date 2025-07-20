// AnimeCard.js
import React from 'react';

const cardStyle = {
  background: '#1c1c1e',
  color: '#fff',
  borderRadius: '10px',
  padding: '10px',
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center',
};

const imageStyle = {
  width: '60px',
  height: '85px',
  borderRadius: '6px',
  marginRight: '10px',
};

const infoStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const tagStyle = {
  background: '#222',
  color: '#ddd',
  borderRadius: '6px',
  padding: '2px 6px',
  fontSize: '10px',
  marginTop: '4px',
};

const AnimeCard = ({ image, title, ep, views, type }) => {
  return (
    <div style={cardStyle}>
      <img src={image} alt={title} style={imageStyle} />
      <div style={infoStyle}>
        <strong>{title}</strong>
        <div style={tagStyle}>Ep: {ep} | Views: {views}</div>
        <div style={tagStyle}>{type}</div>
      </div>
    </div>
  );
};

export default AnimeCard;
