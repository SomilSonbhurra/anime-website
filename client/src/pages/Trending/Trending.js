import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';

const trendingData = [
  {
    animeId: "naruto",
    title: 'Naruto',
    description: 'A young ninja seeks recognition and dreams of becoming the Hokage.',
    image: '/trendimg/naruto.avif',
    type: 'Anime',
  },
  {
    id: 2,
    title: 'One Piece',
    description: 'Young Pirate',
    image: '/trendimg/luffy.jpg',
    type: 'Manga',
  },
  {
    id: 3,
    title: 'Bleach',
    description: 'Ichigo Kurosaki becomes a Soul Reaper to protect the living and the dead.',
    image: '/trendimg/ichigo.jpg',
    type: 'Anime',
  },
  {
    id: 4,
    title: 'Attack on Titan',
    description: 'Humanity fights against man-eating giants to survive behind walls.',
    image: '/trendimg/aot.jpg',
    type: 'Manga',
  },
  {
    id: 5,
    title: 'Jujutsu Kaisen',
    description: 'Yuji Itadori battles curses after swallowing a cursed object.',
    image: '/trendimg/jjk.jpg',
    type: 'Anime',
  },
  {
    id: 6,
    title: 'Death Note',
    description: 'A student gains a notebook that allows him to kill anyone by writing their name.',
    image: 'https://via.placeholder.com/200x300?text=Death+Note',
    type: 'Manga',
  },
  {
    id: 7,
    title: 'My Hero Academia',
    description: 'In a world of superpowers, a quirkless boy aims to become the greatest hero.',
    image: 'https://via.placeholder.com/200x300?text=MHA',
    type: 'Anime',
  },
  {
    id: 8,
    title: 'Demon Slayer',
    description: 'Tanjiro Kamado battles demons after his family is slaughtered.',
    image: 'https://via.placeholder.com/200x300?text=Demon+Slayer',
    type: 'Manga',
  },
  {
    id: 9,
    title: 'Black Clover',
    description: 'Asta, born without magic, dreams of becoming the Wizard King.',
    image: 'https://via.placeholder.com/200x300?text=Black+Clover',
    type: 'Anime',
  },
  {
    id: 10,
    title: 'Tokyo Revengers',
    description: 'A man travels back in time to save his middle school girlfriend from tragedy.',
    image: 'https://via.placeholder.com/200x300?text=Tokyo+Revengers',
    type: 'Manga',
  },
  {
    id: 11,
    title: 'Solo Leveling',
    description: 'A weak hunter gains a mysterious ability and becomes the strongest.',
    image: 'https://via.placeholder.com/200x300?text=Solo+Leveling',
    type: 'Anime',
  },
  {
    id: 12,
    title: 'Chainsaw Man',
    description: 'Denji fuses with a chainsaw demon to become a devil hunter.',
    image: 'https://via.placeholder.com/200x300?text=Chainsaw+Man',
    type: 'Manga',
  },
  {
    id: 13,
    title: 'Dragon Ball Z',
    description: 'Goku defends Earth from powerful foes with legendary martial arts.',
    image: 'https://via.placeholder.com/200x300?text=DBZ',
    type: 'Anime',
  },
  {
    id: 14,
    title: 'Spy x Family',
    description: 'An elite spy builds a fake family for his mission—unaware they each have secrets.',
    image: 'https://via.placeholder.com/200x300?text=Spy+x+Family',
    type: 'Manga',
  },
  {
    id: 15,
    title: 'Mob Psycho 100',
    description: 'A psychic teen tries to live a normal life while suppressing his immense powers.',
    image: 'https://via.placeholder.com/200x300?text=Mob+Psycho+100',
    type: 'Anime',
  },
  {
    id: 16,
    title: 'Vagabond',
    description: 'The legendary story of Miyamoto Musashi’s path of the sword.',
    image: 'https://via.placeholder.com/200x300?text=Vagabond',
    type: 'Manga',
  },
  {
    id: 17,
    title: 'Vinland Saga',
    description: 'A young Viking seeks revenge while discovering the true meaning of war.',
    image: 'https://via.placeholder.com/200x300?text=Vinland+Saga',
    type: 'Anime',
  },
  {
    id: 18,
    title: '20th Century Boys',
    description: 'A group of friends uncover a plot to destroy the world based on their childhood fantasy.',
    image: 'https://via.placeholder.com/200x300?text=20th+Century+Boys',
    type: 'Manga',
  },
  {
    id: 19,
    title: 'Blue Lock',
    description: 'A radical training program creates the ultimate soccer striker in Japan.',
    image: 'https://via.placeholder.com/200x300?text=Blue+Lock',
    type: 'Anime',
  },
  {
    id: 20,
    title: 'Berserk',
    description: 'Guts, a lone warrior, fights demons and fate in a dark medieval world.',
    image: 'https://via.placeholder.com/200x300?text=Berserk',
    type: 'Manga',
  },
];




export default function TrendingSwiper() {
   const navigate = useNavigate();
  return (
    <div className="swiper-container trend-back">

      <h2>#Trending</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="trending-swiper"
      >
        {trendingData.map((trend,item) => (
          <SwiperSlide  key={item.id}>
            <div className="card" onClick={() => navigate(`/anime/${trend.animeId}`)}>
              <img src={trend.image} alt={item.title} className="card-image" />
              <div className="card-content">
                <h3>{trend.title}</h3>
                <p>{trend.description}</p>
                <div className="card-buttons">
                  <button className="type-button">{item.type}</button>
                  <button className="watch-button">Watch Now</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
