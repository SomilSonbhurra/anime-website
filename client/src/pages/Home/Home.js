// Home.js

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

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
  const [user, setUser] = useState(() => {
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
            <h4 className="welcome-message">
              Welcome, {user?.username}
            </h4>
          )}

          <Swiper
            modules={[Navigation, Pagination]}
            grabCursor={true}
            slidesPerView={1}
            spaceBetween={50}
            speed={800}
            pagination={{ clickable: true }}
            navigation
            loop={true}
            className= "home-swiper"
          >
            {slidesData.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="slide-container">
                  {/* Left - Image */}
                  <div className="slide-image-wrapper" onClick={() => navigate(`/anime/${slide.animeId}`)} style={{ cursor: 'pointer' }}>
                    <img
                      src={slide.imgSrc}
                      alt={slide.title}
                      className="slide-image"
                    />
                    <span className="slide-number">#{index + 1}</span>
                  </div>

                  {/* Right - Content */}
                  <div className="slide-content">
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
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </main>

      <Trending />
        <AnimeCategories />
    </div>
  );
}
