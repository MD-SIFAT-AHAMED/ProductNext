"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "https://i.ibb.co/chnd4fXs/1.jpg",
  "https://i.ibb.co/N2Sby6JY/2.jpg",
  "https://i.ibb.co/5Xrc46gY/3.jpg",
  "https://i.ibb.co/xKVWYWfB/4.jpg",
];

const HeroSlider = () => {
  return (
    <div className="w-full overflow-hidden shadow-lg">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-64 md:h-80 lg:h-96"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`Banner ${i + 1}`}
              className="object-cover w-full h-full block"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
