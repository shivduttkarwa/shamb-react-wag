import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./FeaturedProperties.css";
import AestheticButton from "../UI/AestheticButton";

const publicUrl = import.meta.env.BASE_URL;

interface PropertySlide {
  id: number;
  category: string;
  title: string;
  leftImage: string;
  rightImage: string;
  tabletImage: string;
  subtitle: string;
  description: string;
  link: string;
}

const defaultProperties: PropertySlide[] = [
  {
    id: 1,
    category: "",
    title: '"WHERE VISION\nMEETS\nDREAMS"',
    leftImage: `${publicUrl}images/l4.jpg`,
    rightImage: `${publicUrl}images/zz.jpg`,
    tabletImage: `${publicUrl}images/zz.jpg`,
    subtitle: "Creating exceptional living spaces",
    description:
      "Building tomorrow's homes today. Our vision is to transform how Australians live by creating homes that harmonize with nature, embrace sustainability, and foster community connections. Every shambala home is designed to enhance your lifestyle while respecting the environment. Thoughtful design, timeless comfort.",
    link: "/projects",
  },
  {
    id: 2,
    category: "",
    title: '"SUSTAINABLE\nDESIGN\nTOMORROW"',
    leftImage: `${publicUrl}images/pr3.jpg`,
    rightImage: `${publicUrl}images/pexels-fotoaibe-1571460.jpg`,
    tabletImage: `${publicUrl}images/pexels-fotoaibe-1571460.jpg`,
    subtitle: "Sustainable design philosophy",
    description:
      "Innovation meets responsibility. We believe in building homes that give back to the environment through renewable materials and energy-efficient systems. Our sustainable design philosophy creates homes that care for our planet. Efficiency without compromise.",
    link: "/projects",
  },
  {
    id: 3,
    category: "",
    title: '"COMMUNITY\nCENTERED\nLIVING"',
    leftImage: `${publicUrl}images/net2.jpg`,
    rightImage: `${publicUrl}images/net1.jpg`,
    tabletImage: `${publicUrl}images/net2.jpg`,
    subtitle: "Community-centered approach",
    description:
      "Building connections, not just homes. Our vision extends beyond individual homes to creating vibrant communities that encourage interaction and wellbeing. We design neighborhoods that foster lasting relationships between residents and their environment. Spaces that bring people together.",
    link: "/projects",
  },
  
];

interface FeaturedPropertiesProps {
  properties?: PropertySlide[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties = defaultProperties,
}) => {
  const swiperRef = useRef<any>(null);
  return (
    <section id="fp-home_accommodation">
      {/* Navigation buttons positioned to overlay exactly where they were */}
      <div className="fp-left-navigation">
        <button className="fp-nav-btn fp-swiper-button-prev">
          <div className="fp-btn-outline fp-btn-outline-1"></div>
          <div className="fp-btn-outline fp-btn-outline-2"></div>
          <div className="fp-arrow-container">
            <svg
              width="30"
              height="12"
              viewBox="0 0 30 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 6H1M1 6L6 1M1 6L6 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
        <button className="fp-nav-btn fp-swiper-button-next">
          <div className="fp-btn-outline fp-btn-outline-1"></div>
          <div className="fp-btn-outline fp-btn-outline-2"></div>
          <div className="fp-arrow-container">
            <svg
              width="30"
              height="12"
              viewBox="0 0 30 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6H29M29 6L24 1M29 6L24 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>

      <div className="fp-accommodation_swipe">
        <Swiper
          ref={swiperRef}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          speed={1000}
          navigation={{
            nextEl: ".fp-swiper-button-next",
            prevEl: ".fp-swiper-button-prev",
          }}
          className="fp-swiper swiper"
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id} className="fp-swiper-slide">
              <div className="fp-left">
                {property.category && <p>{property.category}</p>}
                <h2>{property.title}</h2>
                <div className="fp-image">
                  <img src={property.leftImage} alt={property.subtitle} />
                  <img
                    className="fp-image-tablet"
                    src={property.tabletImage}
                    alt={property.subtitle}
                  />
                </div>
              </div>
              <div className="fp-right">
                <div className="fp-image">
                  <img src={property.rightImage} alt={property.subtitle} />
                </div>
                <div className="fp-content-wrapper">
                  <h4>{property.subtitle}</h4>
                  <div className="fp-text">
                    <p>{property.description}</p>
                  </div>
                  <div data-gsap="btn-clip-bottom">
                    <AestheticButton className="essence-cta-btn" href={property.link}>
                      Discover
                    </AestheticButton>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
};

export default FeaturedProperties;
