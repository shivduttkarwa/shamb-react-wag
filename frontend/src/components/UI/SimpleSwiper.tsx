import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface SimpleSwiperProps {
  images: string[];
  autoplaySpeed?: number;
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
}

const SimpleSwiper: React.FC<SimpleSwiperProps> = ({ 
  images, 
  autoplaySpeed = 4000,
  className = '',
  showPagination = true,
  showNavigation = false
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleSlideChange = (swiper: SwiperType) => {
    // Account for loop mode - get real index
    setCurrentSlide(swiper.realIndex + 1);
  };
  return (
    <div className={`simple-swiper-wrapper ${className}`} style={{ position: 'relative' }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: autoplaySpeed,
          disableOnInteraction: false,
        }}
        pagination={showPagination ? {
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        } : false}
        navigation={showNavigation}
        loop={true}
        speed={800}
        className="simple-swiper"
        style={{ height: '100%' }}
        wrapperClass="swiper-wrapper"
        onSlideChange={handleSlideChange}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-image-container">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="swiper-image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Minimal pagination counter - positioned outside swiper */}
      <div className="swiper-counter">
        {currentSlide}/{images.length}
      </div>
    </div>
  );
};

export default SimpleSwiper;