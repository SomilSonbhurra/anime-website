import React from 'react';
import CategorySection from './CategorySection'; // ✅ Make sure this path is correct!

const gridStyle = {
  display: 'flex',
  backgroundColor: '#121212',
  padding: '20px',
  borderRadius: '12px',
  gap: '20px',
  flexWrap: 'wrap',
};

// ✅ Dummy data defined BEFORE using it
const dummyData = {
  "Top Airing": [
    {
      image: 'https://via.placeholder.com/60x85?text=One+Piece',
      title: 'One Piece',
      ep: 1135,
      views: 1122,
      type: 'TV'
    },
    {
      image: 'https://via.placeholder.com/60x85?text=Sakamoto',
      title: 'Sakamoto Days',
      ep: 11,
      views: 11,
      type: 'TV'
    }
  ],
  "Most Popular": [
    {
      image: 'https://via.placeholder.com/60x85?text=Naruto',
      title: 'Naruto: Shippuden',
      ep: 500,
      views: 500,
      type: 'TV'
    },
    {
      image: 'https://via.placeholder.com/60x85?text=Bleach',
      title: 'Bleach',
      ep: 366,
      views: 366,
      type: 'TV'
    }
  ],
  "Most Favorite": [
    {
      image: 'https://via.placeholder.com/60x85?text=JJK',
      title: 'Jujutsu Kaisen',
      ep: 24,
      views: 24,
      type: 'TV'
    },
    {
      image: 'https://via.placeholder.com/60x85?text=Chainsaw',
      title: 'Chainsaw Man',
      ep: 12,
      views: 12,
      type: 'TV'
    }
  ],
  "Latest Completed": [
    {
      image: 'https://via.placeholder.com/60x85?text=Kaiju',
      title: 'Kaiju No. 8 Movie',
      ep: 1,
      views: 1,
      type: 'Movie'
    },
    {
      image: 'https://via.placeholder.com/60x85?text=Black+Butler',
      title: 'Black Butler',
      ep: 13,
      views: 13,
      type: 'TV'
    }
  ]
};

const AnimeCategories = () => {
  return (
    <div style={gridStyle}>
      {Object.entries(dummyData).map(([category, animes]) => (
        <CategorySection
          key={category}
          title={category}
          animes={animes}
          onViewMore={() => alert(`View more ${category}`)}
        />
      ))}
    </div>
  );
};

export default AnimeCategories;
