// Home.js

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

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
    animeId: "onepiece",
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

const ScrollAnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,        // ❗ Animate every time it enters view
    amount: 0.3         // Trigger when 30% is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

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
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                      >
                        {slide.title}
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                      >
                        {slide.paragraph || "No description available."}
                      </motion.p>

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

      {/* 👇 Animated on every scroll into view */}
      <ScrollAnimatedSection>
        <Trending />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection>
        <AnimeCategories />
      </ScrollAnimatedSection>
    </div>
  );
}
