'use client';

import { useState, ReactNode, useRef, useEffect } from 'react';
import { useItinerary } from '../contexts/ItineraryContext';

interface JapanMapProps {
  itinerarySection?: ReactNode;
}

interface Attraction {
  id: string;
  name: string;
  category: string[];
  rating: number;
  reviewCount: number;
  description: string;
  imageUrl: string;
}

interface City {
  id: string;
  name: string;
  x: number; // Percentage coordinates for positioning
  y: number;
  region: string;
  description: string;
  topAttractions: Attraction[];
  imageUrl: string;
}

const cities: City[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    x: 54,
    y: 58,
    region: 'Kanto',
    description: 'The bustling capital city, perfect for first-time visitors with endless attractions.',
    topAttractions: [
      {
        id: 'senso-ji',
        name: 'Senso-ji Temple',
        category: ['free', 'culture', 'relaxing'],
        rating: 4.5,
        reviewCount: 85269,
        description: 'Tokyo\'s oldest temple with traditional atmosphere and shopping street.',
        imageUrl: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop'
      },
      {
        id: 'shibuya-crossing',
        name: 'Shibuya Crossing',
        category: ['free', 'fun', 'iconic'],
        rating: 4.4,
        reviewCount: 52341,
        description: 'The world\'s busiest pedestrian crossing and Tokyo\'s most iconic spot.',
        imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop'
      },
      {
        id: 'tsukiji-market',
        name: 'Tsukiji Outer Market',
        category: ['food', 'paid', 'fun'],
        rating: 4.3,
        reviewCount: 28567,
        description: 'Famous food market with fresh sushi and street food.',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
      },
      {
        id: 'tokyo-skytree',
        name: 'Tokyo Skytree',
        category: ['paid', 'views', 'fun'],
        rating: 4.0,
        reviewCount: 91456,
        description: 'Tokyo\'s tallest tower with panoramic city views.',
        imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&h=300&fit=crop'
      },
      {
        id: 'meiji-shrine',
        name: 'Meiji Shrine',
        category: ['free', 'culture', 'relaxing'],
        rating: 4.4,
        reviewCount: 76234,
        description: 'Peaceful Shinto shrine surrounded by forest in the heart of Tokyo.',
        imageUrl: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=300&fit=crop'
      },
      {
        id: 'harajuku',
        name: 'Harajuku District',
        category: ['free', 'fun', 'shopping'],
        rating: 4.2,
        reviewCount: 45123,
        description: 'Colorful youth culture district with unique fashion and cafes.',
        imageUrl: 'https://images.unsplash.com/photo-1542640244-4dc0b3ac6420?w=400&h=300&fit=crop'
      },
      {
        id: 'imperial-palace',
        name: 'Imperial Palace Gardens',
        category: ['free', 'relaxing', 'nature'],
        rating: 4.2,
        reviewCount: 24789,
        description: 'Beautiful traditional gardens surrounding the Imperial Palace.',
        imageUrl: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=300&fit=crop'
      },
      {
        id: 'akihabara',
        name: 'Akihabara Electric Town',
        category: ['free', 'fun', 'technology'],
        rating: 4.1,
        reviewCount: 38965,
        description: 'Electronics and anime culture district with countless shops.',
        imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop'
      },
      {
        id: 'teamlab-borderless',
        name: 'teamLab Borderless',
        category: ['paid', 'fun', 'art'],
        rating: 4.6,
        reviewCount: 34567,
        description: 'Immersive digital art museum with stunning interactive exhibits.',
        imageUrl: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400&h=300&fit=crop'
      },
      {
        id: 'ginza',
        name: 'Ginza District',
        category: ['free', 'shopping', 'luxury'],
        rating: 4.3,
        reviewCount: 29876,
        description: 'Upscale shopping and dining district with luxury brands.',
        imageUrl: 'https://images.unsplash.com/photo-1551622165-a31720d8b1b8?w=400&h=300&fit=crop'
      }
    ],
    imageUrl: '/images/tokyo.jpg'
  },
  {
    id: 'osaka',
    name: 'Osaka',
    x: 36,
    y: 61,
    region: 'Kansai',
    description: 'Japan\'s kitchen - famous for incredible food and vibrant nightlife.',
    topAttractions: [
      {
        id: 'dotonbori',
        name: 'Dotonbori District',
        category: ['free', 'food', 'fun'],
        rating: 4.4,
        reviewCount: 89123,
        description: 'Vibrant entertainment district famous for neon lights and street food.',
        imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop'
      },
      {
        id: 'osaka-castle',
        name: 'Osaka Castle',
        category: ['paid', 'culture', 'history'],
        rating: 4.2,
        reviewCount: 67234,
        description: 'Historic castle with museum and beautiful surrounding park.',
        imageUrl: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=400&h=300&fit=crop'
      },
      {
        id: 'universal-studios',
        name: 'Universal Studios Japan',
        category: ['paid', 'fun', 'theme-park'],
        rating: 4.3,
        reviewCount: 127856,
        description: 'World-class theme park with Harry Potter and Nintendo worlds.',
        imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=300&fit=crop'
      },
      {
        id: 'kuromon-market',
        name: 'Kuromon Ichiba Market',
        category: ['food', 'paid', 'culture'],
        rating: 4.1,
        reviewCount: 22567,
        description: 'Traditional market known as "Osaka\'s Kitchen" with fresh seafood.',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
      },
      {
        id: 'sumiyoshi-taisha',
        name: 'Sumiyoshi Taisha Shrine',
        category: ['free', 'culture', 'relaxing'],
        rating: 4.4,
        reviewCount: 15642,
        description: 'One of Japan\'s oldest Shinto shrines with distinctive architecture.',
        imageUrl: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=300&fit=crop'
      },
      {
        id: 'shinsaibashi',
        name: 'Shinsaibashi Shopping',
        category: ['free', 'shopping', 'fun'],
        rating: 4.2,
        reviewCount: 41235,
        description: 'Premier shopping district with covered arcades and department stores.',
        imageUrl: 'https://images.unsplash.com/photo-1551622165-a31720d8b1b8?w=400&h=300&fit=crop'
      },
      {
        id: 'osaka-aquarium',
        name: 'Osaka Aquarium Kaiyukan',
        category: ['paid', 'fun', 'family'],
        rating: 4.3,
        reviewCount: 56789,
        description: 'One of the world\'s largest aquariums featuring whale sharks.',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop'
      },
      {
        id: 'namba-parks',
        name: 'Namba Parks',
        category: ['free', 'shopping', 'relaxing'],
        rating: 4.1,
        reviewCount: 18945,
        description: 'Modern shopping complex with rooftop garden and city views.',
        imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'
      },
      {
        id: 'takoyaki-street',
        name: 'Takoyaki Museum',
        category: ['food', 'paid', 'fun'],
        rating: 4.0,
        reviewCount: 23456,
        description: 'Food theme park dedicated to Osaka\'s famous takoyaki.',
        imageUrl: 'https://images.unsplash.com/photo-1606135609603-63b7b11ba3c5?w=400&h=300&fit=crop'
      },
      {
        id: 'tempozan-wheel',
        name: 'Tempozan Giant Ferris Wheel',
        category: ['paid', 'views', 'relaxing'],
        rating: 4.0,
        reviewCount: 14789,
        description: 'Large ferris wheel offering panoramic views of Osaka Bay.',
        imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'
      }
    ],
    imageUrl: '/images/osaka.jpg'
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    x: 37,
    y: 59,
    region: 'Kansai',
    description: 'Ancient capital with traditional temples, gardens, and cultural experiences.',
    topAttractions: [
      {
        id: 'fushimi-inari',
        name: 'Fushimi Inari Shrine',
        category: ['free', 'culture', 'nature'],
        rating: 4.6,
        reviewCount: 123456,
        description: 'Famous shrine with thousands of red torii gates up the mountain.',
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop'
      },
      {
        id: 'kiyomizu-dera',
        name: 'Kiyomizu-dera Temple',
        category: ['paid', 'culture', 'views'],
        rating: 4.5,
        reviewCount: 89234,
        description: 'Historic wooden temple with stunning city views, especially during cherry blossom season.',
        imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop'
      },
      {
        id: 'arashiyama-bamboo',
        name: 'Arashiyama Bamboo Grove',
        category: ['free', 'nature', 'relaxing'],
        rating: 4.3,
        reviewCount: 67890,
        description: 'Magical bamboo forest creating natural green tunnels.',
        imageUrl: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=300&fit=crop'
      },
      {
        id: 'golden-pavilion',
        name: 'Kinkaku-ji Golden Pavilion',
        category: ['paid', 'culture', 'iconic'],
        rating: 4.4,
        reviewCount: 78901,
        description: 'Kyoto\'s most famous temple covered in gold leaf, reflected in a pond.',
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop'
      },
      {
        id: 'gion-district',
        name: 'Gion Historic District',
        category: ['free', 'culture', 'walking'],
        rating: 4.3,
        reviewCount: 45678,
        description: 'Traditional geisha district with historic wooden houses and tea shops.',
        imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop'
      },
      {
        id: 'philosopher-path',
        name: 'Philosopher\'s Path',
        category: ['free', 'nature', 'relaxing'],
        rating: 4.2,
        reviewCount: 34567,
        description: 'Peaceful walking path along a canal, beautiful during cherry blossom season.',
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop'
      },
      {
        id: 'nijo-castle',
        name: 'Nijo Castle',
        category: ['paid', 'culture', 'history'],
        rating: 4.3,
        reviewCount: 43210,
        description: 'Historic castle with "nightingale floors" and beautiful gardens.',
        imageUrl: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=400&h=300&fit=crop'
      },
      {
        id: 'ryoan-ji',
        name: 'Ryoan-ji Rock Garden',
        category: ['paid', 'culture', 'relaxing'],
        rating: 4.1,
        reviewCount: 23456,
        description: 'Famous zen rock garden perfect for contemplation and meditation.',
        imageUrl: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=300&fit=crop'
      },
      {
        id: 'pontocho-alley',
        name: 'Pontocho Alley',
        category: ['free', 'food', 'culture'],
        rating: 4.2,
        reviewCount: 29876,
        description: 'Narrow alley with traditional restaurants and bars along the river.',
        imageUrl: 'https://images.unsplash.com/photo-1551622165-a31720d8b1b8?w=400&h=300&fit=crop'
      },
      {
        id: 'todai-ji-temple',
        name: 'Todai-ji Temple',
        category: ['paid', 'culture', 'history'],
        rating: 4.4,
        reviewCount: 65432,
        description: 'Home to one of Japan\'s largest bronze Buddha statues in a massive wooden hall.',
        imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop'
      }
    ],
    imageUrl: '/images/kyoto.jpg'
  }
];

export default function JapanMap({ itinerarySection }: JapanMapProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showAttractions, setShowAttractions] = useState<boolean>(false);
  const { addToItinerary, isInItinerary } = useItinerary();
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  // Update items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2); // Tablet: 2 items
      } else {
        setItemsPerSlide(3); // Desktop: 3 items
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  // Reset carousel when city changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedCity]);

  const renderStars = (rating: number) => {
    const stars = [];
    const decimal = rating % 1;
    let fullStars = Math.floor(rating);
    let hasHalfStar = false;
    
    // Determine if we need a half star (between 0.3 and 0.7)
    if (decimal >= 0.3 && decimal <= 0.7) {
      hasHalfStar = true;
    } else if (decimal > 0.7) {
      fullStars += 1; // Round up
    }
    // If decimal < 0.3, we round down (do nothing)
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400 text-lg">★</span>
      );
    }
    
    // Add half star if needed - using a different approach for visibility
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-lg relative">
          <span className="text-gray-300">☆</span>
          <span className="absolute left-0 top-0 overflow-hidden w-1/2">★</span>
        </span>
      );
    }
    
    // Add empty stars to make 5 total
    const totalStarsUsed = fullStars + (hasHalfStar ? 1 : 0);
    const emptyStars = 5 - totalStarsUsed;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-lg">☆</span>
      );
    }
    
    return stars;
  };

  const handleCityClick = (city: City) => {
    setSelectedCity(city);
    setShowAttractions(true);
  };

  const handleAddToItinerary = (attraction: Attraction, cityName: string) => {
    addToItinerary({
      id: attraction.id,
      name: attraction.name,
      city: cityName,
      category: attraction.category,
      rating: attraction.rating,
      description: attraction.description
    });
  };

  // Carousel navigation functions
  const getMaxSlides = () => {
    if (!selectedCity) return 0;
    const attractions = selectedCity.topAttractions;
    return Math.max(0, Math.ceil(attractions.length / itemsPerSlide) - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, getMaxSlides()));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(Math.min(slideIndex, getMaxSlides()));
  };

  // Touch/mouse handlers for swipe functionality
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStartX(clientX);
    setDragStartTime(Date.now());
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return;
    
    const dragDistance = clientX - dragStartX;
    const dragTime = Date.now() - dragStartTime;
    const velocity = Math.abs(dragDistance) / dragTime;
    
    // Swipe threshold: either distance > 50px or velocity > 0.5px/ms
    if (Math.abs(dragDistance) > 50 || velocity > 0.5) {
      if (dragDistance > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    setIsDragging(false);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleDragEnd(e.changedTouches[0].clientX);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    handleDragEnd(e.clientX);
  };

  return (
    <div className="w-full space-y-6">
      {/* Main Layout Container */}
      <div className="w-full xl:flex xl:gap-6 xl:space-y-0 space-y-6 xl:space-y-0">
        
        {/* Left Column on Desktop */}
        <div className="xl:w-1/2 space-y-6">
          {/* Map Container - now bare */}
          <div className="w-full">
            <div className="w-full">
              {/* Interactive Japan Map */}
              <div className="w-full">
                <div className="relative w-full flex justify-center items-center p-2 sm:p-4 min-h-[300px] sm:min-h-[400px] xl:min-h-[450px]">
                  {/* Image and markers container */}
                  <div className="relative inline-block w-full max-w-full">
                    <img 
                      src="/images/image.png" 
                      alt="Japan Map" 
                      className="block object-contain w-full h-auto max-w-full"
                      style={{ 
                        maxWidth: '100%',
                        height: 'auto',
                        minHeight: '250px'
                      }}
                    />
                    {/* Cities positioned directly on the image */}
                    {cities.map((city) => (
                      <div
                        key={city.id}
                        className="absolute pointer-events-auto"
                        style={{
                          left: `${city.x}%`,
                          top: `${city.y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        {/* City marker */}
                        <div className="relative">
                          <div
                            className={`
                              relative z-20 transition-all duration-300 ease-in-out flex items-center justify-center pointer-events-none
                              ${selectedCity?.id === city.id
                                ? 'text-red-600 scale-110 drop-shadow-lg'
                                : 'text-white drop-shadow-md'
                              }
                            `}
                          >
                            <svg 
                              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                              fill="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* City labels with connecting lines */}
                    {cities.map((city) => {
                      // Define label positions and curved line paths for each city
                      let labelX, labelY, curvePath;
                      
                      if (city.id === 'tokyo') {
                        // Tokyo: curved line to the right
                        labelX = city.x + 14;
                        labelY = city.y;
                        const startX = city.x + 2;
                        const startY = city.y;
                        const endX = city.x + 11;
                        const endY = city.y;
                        const controlX = city.x + 6;
                        const controlY = city.y - 1;
                        curvePath = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
                      } else if (city.id === 'kyoto') {
                        // Kyoto: curved line up
                        labelX = city.x;
                        labelY = city.y - 14;
                        const startX = city.x;
                        const startY = city.y - 2;
                        const endX = city.x;
                        const endY = city.y - 11;
                        const controlX = city.x + 1;
                        const controlY = city.y - 6;
                        curvePath = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
                      } else if (city.id === 'osaka') {
                        // Osaka: curved line down
                        labelX = city.x;
                        labelY = city.y + 14;
                        const startX = city.x;
                        const startY = city.y + 2;
                        const endX = city.x;
                        const endY = city.y + 11;
                        const controlX = city.x - 1;
                        const controlY = city.y + 6;
                        curvePath = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
                      }
                      
                      return (
                        <div key={`label-${city.id}`}>
                          {/* Curved dashed connecting line */}
                          <svg 
                            className="absolute pointer-events-none z-40"
                            style={{
                              left: 0,
                              top: 0,
                              width: '100%',
                              height: '100%'
                            }}
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                          >
                            <path
                              d={curvePath}
                              stroke="rgba(255, 255, 255, 0.9)"
                              strokeWidth="1.5"
                              strokeDasharray="2.5,2"
                              fill="none"
                              className="drop-shadow-sm"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                          
                          {/* Clickable Label */}
                          <div
                            className="absolute z-50 cursor-pointer"
                            style={{
                              left: `${labelX}%`,
                              top: `${labelY}%`,
                              transform: 'translate(-50%, -50%)',
                            }}
                            onClick={() => handleCityClick(city)}
                            title={`Click to explore ${city.name}`}
                          >
                            <div
                              className={`bg-gray-900/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-lg
                                text-sm font-semibold text-white whitespace-nowrap
                                transition-all duration-200 ease-in-out hover:bg-gray-800/95 hover:scale-105
                                ${selectedCity?.id === city.id ? 'bg-red-600/95 hover:bg-red-500/95' : ''}`}
                            >
                              {city.name}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary section on desktop always visible at xl */}
          <div className="hidden xl:block">
            {itinerarySection}
          </div>
        </div>

        {/* Right side - Attractions List or Empty State */}
        <div className="xl:w-1/2 bg-white rounded-xl shadow-lg p-6">
          {showAttractions && selectedCity ? (
            <>
              <div className="mb-6">
                <h2 className="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                  {selectedCity.name}
                </h2>
              </div>
              
              {/* Carousel Container */}
              <div className="relative">
                {/* Navigation Arrows */}
                {getMaxSlides() > 0 && (
                  <>
                    <button
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 bg-white rounded-full shadow-lg border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextSlide}
                      disabled={currentSlide === getMaxSlides()}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 bg-white rounded-full shadow-lg border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Carousel Content */}
                <div className="overflow-hidden">
                  <div 
                    ref={carouselRef}
                    className="flex transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                  >
                    {Array.from({ length: Math.ceil(selectedCity.topAttractions.length / itemsPerSlide) }, (_, slideIndex) => (
                      <div 
                        key={slideIndex}
                        className="w-full flex-shrink-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                        style={{ gridTemplateColumns: `repeat(${itemsPerSlide}, minmax(0, 1fr))` }}
                      >
                        {selectedCity.topAttractions
                          .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                          .map((attraction, index) => (
                            <div 
                              key={attraction.id} 
                              className="bg-white rounded-lg border hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden"
                            >
                              {/* Image */}
                              <div className="relative h-48 bg-gray-200">
                                <img 
                                  src={attraction.imageUrl} 
                                  alt={attraction.name}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                                  <span className="text-sm font-semibold text-gray-800">
                                    #{slideIndex * itemsPerSlide + index + 1}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Content */}
                              <div className="p-4 flex flex-col flex-grow">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                      {attraction.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="flex items-center">
                                        {renderStars(attraction.rating)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <p className="text-gray-600 text-sm flex-grow mb-4">{attraction.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {attraction.category.map((tag) => (
                                    <span 
                                      key={tag}
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        tag === 'free' ? 'bg-green-100 text-green-800' :
                                        tag === 'paid' ? 'bg-red-100 text-red-800' :
                                        tag === 'food' ? 'bg-orange-100 text-orange-800' :
                                        tag === 'fun' ? 'bg-purple-100 text-purple-800' :
                                        tag === 'relaxing' ? 'bg-blue-100 text-blue-800' :
                                        tag === 'culture' ? 'bg-indigo-100 text-indigo-800' :
                                        'bg-gray-100 text-gray-800'
                                      }`}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="space-y-2">
                                  <button 
                                    className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                      isInItinerary(attraction.id)
                                        ? 'bg-green-600 hover:bg-green-700 text-white cursor-default'
                                        : 'bg-red-600 hover:bg-red-700 text-white'
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddToItinerary(attraction, selectedCity.name);
                                    }}
                                    disabled={isInItinerary(attraction.id)}
                                  >
                                    {isInItinerary(attraction.id) ? '✓ Added to Trip' : '+ Add to Trip'}
                                  </button>
                                  
                                  <div className="flex gap-2">
                                    <button
                                      className="flex-1 px-2 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-medium rounded-md transition-colors flex items-center justify-center"
                                      onClick={() => {
                                        const searchQuery = encodeURIComponent(attraction.name);
                                        window.open(`https://www.instagram.com/explore/search/keyword/?q=${searchQuery}`, '_blank');
                                      }}
                                      title="Search on Instagram"
                                    >
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                      </svg>
                                    </button>
                                    
                                    <button
                                      className="flex-1 px-2 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-md transition-colors flex items-center justify-center"
                                      onClick={() => {
                                        const searchQuery = encodeURIComponent(`${attraction.name} Japan`);
                                        window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
                                      }}
                                      title="Search on Google"
                                    >
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination Dots */}
                {getMaxSlides() > 0 && (
                  <div className="flex justify-center space-x-2 mt-6">
                    {Array.from({ length: getMaxSlides() + 1 }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentSlide ? 'bg-red-600' : 'bg-gray-300'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl xl:text-2xl font-bold text-gray-800">
                  Top Things to Do
                </h2>
              </div>
              
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a City to Explore</h3>
                <p className="text-gray-500">
                  Click on Tokyo, Osaka, or Kyoto on the map to see the top 10 must-do activities in that city.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
