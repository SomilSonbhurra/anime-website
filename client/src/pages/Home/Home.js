// Home.js

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';



import Trending from '../Trending/Trending';
import AnimeCategories from '../AnimeCategories/AnimeCategories';

const slidesData = [
  {
    animeId: "naruto",
    imgSrc: "/img/naruto.jpg",
    title: "Naruto",
    paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore minus aliquam dicta"
  },
  {
     animeId: "bleach",
    imgSrc: "/img/bleach.jpg",
    title: "Bleach",
    paragraph: "A soul reaper's journey to protect and grow stronger."
  },
  {
     animeId: "one-piece",
    imgSrc: "/img/onepiece.avif",
    title: "One Piece",
    paragraph: "Luffy sets sail to find the greatest treasure, the One Piece."
  },
  {
     animeId: "dragon",
    imgSrc: "/img/dragon.jpg",
    title: "Dragon Ball",
    paragraph: "Goku battles mighty foes to protect Earth."
  },
  {
     animeId: "solo",
    imgSrc: "/img/solo.jpg",
    title: "Solo Leveling",
    paragraph: "A weak hunter becomes the strongest through mysterious powers."
  },
  {
     animeId: "fire-force",
    imgSrc: "/img/fireforce.jpg",
    title: "Fire Force",
    paragraph: "Special fire brigades fight infernal threats."
  },
  {
     animeId: "jjk",
    imgSrc: "/img/jjk.avif",
    title: "Jujutsu Kaisen",
    paragraph: "Yuji Itadori fights curses with dark sorcery."
  },
];

export default function Home() {
  const [activeCategory] = useState("All");
  const navigate = useNavigate();
  const [user] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user) {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
  <div className="home-wrapper">
    <main className="home" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container-fluid">
        {showWelcome && (
          <motion.h4
            className="welcome-message"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome, {user?.username}
          </motion.h4>
        )}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            grabCursor={true}
            slidesPerView={1}
            spaceBetween={50}
            speed={800}
            pagination={{ clickable: true }}
            navigation
            loop={true}
            className="home-swiper"
          >
            {slidesData.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="slide-container">
                  {/* Left - Image */}
                  <motion.div
                    className="slide-image-wrapper"
                    onClick={() => navigate(`/anime/${slide.animeId}`)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={slide.imgSrc}
                      alt={slide.title}
                      className="slide-image"
                    />
                    <span className="slide-number">#{index + 1}</span>
                  </motion.div>

                  {/* Right - Content */}
                  <motion.div
                    className="slide-content"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h2>{slide.title}</h2>
                    <p>{slide.paragraph || "No description available."}</p>

                    <div className="slide-buttons">
                      <button
                        onClick={() => navigate('/anime')}
                        className={activeCategory === "Anime" ? "btn active" : "btn"}
                      >
                        Anime
                      </button>
                      <button
                        onClick={() => navigate('/manga')}
                        className={activeCategory === "Manga" ? "btn active" : "btn"}
                      >
                        Manga
                      </button>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </main>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Trending />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <AnimeCategories />
    </motion.div>
  </div>
);
}
