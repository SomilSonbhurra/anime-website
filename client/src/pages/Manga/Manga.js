import React, { useEffect, useRef, useState  } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { Pagination  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Manga.css'



const slidesData = [
    {
        imgSrc: "/img/naruto.jpg",
        title: "Ramayan",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptate!",
        categories: ["Travel", "History"]
    },
    {
        imgSrc: "/img/bleach.jpg",
        title: "Naruto",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptate!",
        categories: ["Travel", "History"]
    },
    {
        imgSrc: "/img/dragon.jpg",
        title: "Ramayan",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptate!",
        categories: ["Travel", "History"]
    },
    {
        imgSrc: "/img/onepiece.avif",
        title: "Ramayan",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptate!",
        categories: ["Travel", "History"]
    },
    {
        imgSrc: "/img/fireforce.jpg",
        title: "Ramayan",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptate!",
        categories: ["Travel", "History"]
    },
    {
        imgSrc: "/img/jjk.avif",
        title: "Ramayan",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptate!",
        categories: ["Travel", "History"]
    },
    {
        imgSrc: "/img/solo.jpg",
        title: "Ramayan",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, voluptate!",
        categories: ["Travel", "History"]
    },
]

export default function Manga() {

    const swiperWrapedRef = useRef(null);

    function adjustMargin() {
        const screenWidth = window.innerWidth;

        if (swiperWrapedRef.current) {
            swiperWrapedRef.current.style.marginLeft =
                screenWidth <= 520
                    ? "0px"
                    : screenWidth <= 650
                        ? "-50px"
                        : screenWidth <= 800
                            ? "-100px"
                            : "-150px";
        }
    }

    useEffect(() => {
        adjustMargin();
        window.addEventListener("resize", adjustMargin);
        return () => window.removeEventListener("resize", adjustMargin);
    }, []);

    const [activeCategory, setActiveCategory] = useState("All");
    const navigate = useNavigate();
    return (
        <div>
            <main className="manga">
                <div className="container">
                    <Swiper
                        modules={[Pagination]}
                        grabCursor
                        initialSlide={2}
                        centeredSlides
                        slidesPerView="auto"
                        speed={800}
                        slideToClickedSlide
                        pagination={{ clickable: true }}
                        breakpoints={{
                            320: { spaceBetween: 40 },
                            320: { spaceBetween: 30 },
                            320: { spaceBetween: 20 }
                        }}
                         className="manga"

                        onSwiper={(swiper) => {
                            swiperWrapedRef.current = swiper.wrapperEl;
                        }}>
                        {slidesData.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <img className="mangaImage" src={slide.imgSrc} alt={slide.title} />
                                <div className="title">
                                    <h1>{slide.title}</h1>
                                </div>
                                <div className="content">
                                    <div className="text-box">
                                        <p>{slide.description}</p>
                                    </div>

                                    <div className="footer">
                                        <div className="category">
                                            {slide.categories.map((category, idx) => (
                                                <span key={idx} style={{ "--i": idx + 1 }}>
                                                    {category}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="footer-btn">
                                            <span className="label">More..</span>
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </main>
        </div>
    )
}

