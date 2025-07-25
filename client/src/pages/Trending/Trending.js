import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    type: 'Manga',
  },
  {
    animeId: "one-piece",
    title: 'One Piece',
    description: 'Young Pirate seeks One Piece treasure.',
    image: '/trendimg/luffy.jpg',
    type: 'Manga',
  },
  {
    animeId: "bleach",
    title: 'Bleach',
    description: 'Ichigo becomes a Soul Reaper to protect the world.',
    image: '/trendimg/ichigo.jpg',
    type: 'Manga',
  },
  {
    animeId: "aot",
    title: 'Attack on Titan',
    description: 'Humanity fights man-eating titans.',
    image: '/trendimg/aot.jpg',
    type: 'Manga',
  },
  {
    animeId: "jjk",
    title: 'Jujutsu Kaisen',
    description: 'Yuji battles curses with Jujutsu sorcery.',
    image: '/trendimg/jjk.jpg',
    type: 'Manga',
  },
    {
    animeId: "naruto",
    title: 'Naruto',
    description: 'A young ninja seeks recognition and dreams of becoming the Hokage.',
    image: '/trendimg/naruto.avif',
    type: 'Manga',
  },
  {
    animeId: "one-piece",
    title: 'One Piece',
    description: 'Young Pirate seeks One Piece treasure.',
    image: '/trendimg/luffy.jpg',
    type: 'Manga',
  },
  {
    animeId: "bleach",
    title: 'Bleach',
    description: 'Ichigo becomes a Soul Reaper to protect the world.',
    image: '/trendimg/ichigo.jpg',
    type: 'Manga',
  },
  {
    animeId: "aot",
    title: 'Attack on Titan',
    description: 'Humanity fights man-eating titans.',
    image: '/trendimg/aot.jpg',
    type: 'Manga',
  },
  {
    animeId: "jjk",
    title: 'Jujutsu Kaisen',
    description: 'Yuji battles curses with Jujutsu sorcery.',
    image: '/trendimg/jjk.jpg',
    type: 'Manga',
  },
];

export default function TrendingSwiper() {
  const navigate = useNavigate();

  return (
    <div className="swiper-container trend-back">
      {/* Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="trending-heading"
      >
        #Trending
      </motion.h2>

      {/* Animated Swiper Container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1, delay: 0.2 }}
      >
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
          {trendingData.map((trend, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="card"
                onClick={() => navigate(`/anime/${trend.animeId}`)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={trend.image} alt={trend.title} className="card-image" />
                <div className="card-content">
                  <h3>{trend.title}</h3>
                  <p>{trend.description}</p>
                  <div className="card-buttons">
                    <button className="type-button">{trend.type}</button>
                    <button className="watch-button">Watch Now</button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
}
