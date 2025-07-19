import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  buttonVariant: 'primary' | 'secondary';
}

const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    title: 'Отопительное оборудование',
    subtitle: 'Для вашего дома',
    description: 'Широкий выбор труб, радиаторов, теплых полов и комплектующих от ведущих производителей',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    buttonText: 'Перейти в каталог',
    buttonLink: '#products',
    buttonVariant: 'primary'
  },
  {
    id: 2,
    title: 'Проектирование систем',
    subtitle: 'Отопления и водоснабжения',
    description: 'Профессиональное проектирование отопительных систем с учетом всех технических требований и норм',
    image: 'https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    buttonText: 'Заказать проект',
    buttonLink: '/design',
    buttonVariant: 'secondary'
  },
  {
    id: 3,
    title: 'Профессиональная установка',
    subtitle: 'И обслуживание',
    description: 'Наши специалисты помогут подобрать и установить отопительное оборудование с гарантией качества',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    buttonText: 'Получить консультацию',
    buttonLink: '/consultation',
    buttonVariant: 'secondary'
  },
  {
    id: 4,
    title: 'Доставка по Краснодару',
    subtitle: 'И краю',
    description: 'Быстрая доставка отопительного оборудования по Краснодару и Краснодарскому краю',
    image: 'https://images.unsplash.com/photo-1509599589979-3b5a15d2816e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    buttonText: 'Узнать о доставке',
    buttonLink: '/delivery',
    buttonVariant: 'primary'
  }
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    console.log('Next slide clicked, current:', currentSlide);
    setIsPaused(true);
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    // Resume auto-advance after 3 seconds
    setTimeout(() => setIsPaused(false), 3000);
  };

  const prevSlide = () => {
    console.log('Prev slide clicked, current:', currentSlide);
    setIsPaused(true);
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    // Resume auto-advance after 3 seconds
    setTimeout(() => setIsPaused(false), 3000);
  };

  const goToSlide = (index: number) => {
    console.log('Go to slide clicked, index:', index, 'current:', currentSlide);
    if (index !== currentSlide) {
      setIsPaused(true);
      setCurrentSlide(index);
      // Resume auto-advance after 3 seconds
      setTimeout(() => setIsPaused(false), 3000);
    }
  };

  const currentSlideData = carouselSlides[currentSlide];

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Carousel Slides */}
      <div className="relative w-full h-full">
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="container mx-auto px-4 text-center text-white">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-sky-300 animate-fade-in-delay">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-delay-2">
                    {slide.description}
                  </p>
                  <div className="animate-fade-in-delay-3">
                    {slide.buttonVariant === 'primary' ? (
                      slide.buttonLink === '#products' ? (
                        <button 
                          onClick={() => {
                            const productsSection = document.getElementById('products');
                            if (productsSection) {
                              productsSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 transform hover:scale-105"
                        >
                          {slide.buttonText}
                        </button>
                      ) : (
                        <Link 
                          to={slide.buttonLink}
                          className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 transform hover:scale-105 inline-block"
                        >
                          {slide.buttonText}
                        </Link>
                      )
                    ) : (
                      <Link 
                        to={slide.buttonLink}
                        className="border-2 border-white text-white font-medium py-3 px-8 rounded-md hover:bg-white hover:text-gray-800 transition duration-300 transform hover:scale-105 inline-block"
                      >
                        {slide.buttonText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition duration-300 backdrop-blur-sm z-20 cursor-pointer"
        aria-label="Previous slide"
        type="button"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition duration-300 backdrop-blur-sm z-20 cursor-pointer"
        aria-label="Next slide"
        type="button"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition duration-300 cursor-pointer ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-sky-500 transition-all duration-500 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / carouselSlides.length) * 100}%` 
          }}
        />
      </div>
    </section>
  );
};