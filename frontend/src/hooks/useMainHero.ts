import { useState, useEffect } from 'react';
import { fetchHomePage } from '../services/api';

export interface SliderSlide {
  id: number;
  title: string;
  description?: string;
  excerpt?: string;
  author?: string;
  tags?: string;
  read_time?: number;
  image?: {
    url: string;
    alt: string;
  } | null;
  link?: {
    url: string;
    is_external: boolean;
  } | null;
  date?: string;
  category?: string;
  featured: boolean;
}

export interface SliderData {
  id: number;
  title: string;
  subtitle?: string;
  slides: SliderSlide[];
  settings: {
    autoplay: boolean;
    autoplay_delay: number;
    show_navigation: boolean;
    show_pagination: boolean;
  };
}

export interface MainHeroData {
  title: string;
  hero_text_static: string;
  changing_text_words: string[];
  description: string;
  hero_image?: {
    url: string;
    alt: string;
  } | null;
  hero_video?: {
    url: string;
  } | null;
  primary_cta: {
    text: string;
    link: string;
  };
  secondary_cta?: {
    text: string;
    link: string;
  } | null;
  show_blog_slider: boolean;
  slider_title: string;
  slider_type: 'none' | 'news' | 'blog';
  active_slider?: SliderData | null;
  news_slider?: SliderData | null;
  blog_slider?: SliderData | null;
}

interface UseMainHeroReturn {
  loading: boolean;
  error: string | null;
  heroData: MainHeroData | null;
}

export const useMainHero = (): UseMainHeroReturn => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<MainHeroData | null>(null);

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchHomePage();
        
        
        if (data && data.hero_section_data) {
          setHeroData(data.hero_section_data);
        } else {
          throw new Error('No hero section data found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load hero section data');
        console.warn('Hero API failed, using fallback data:', err);
        
        // Provide fallback data when API is not available
        const fallbackHeroData: MainHeroData = {
          title: 'CREATE',
          hero_text_static: 'Something',
          changing_text_words: ['ELEGANT', 'STUNNING', 'PREMIUM', 'CLASSIC'],
          description: '',
          hero_video: {
            url: '/images/home_hero.mp4'
          },
          primary_cta: {
            text: 'Start a Project',
            link: '/projects'
          },
          show_blog_slider: true,
          slider_title: 'Latest News',
          slider_type: 'news',
          active_slider: null,
          news_slider: null,
          blog_slider: null
        };
        
        setHeroData(fallbackHeroData);
      } finally {
        setLoading(false);
      }
    };

    loadHeroData();
  }, []);

  return {
    loading,
    error,
    heroData,
  };
};