'use client';

import { useState, ReactNode } from 'react';
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
    x: 55,
    y: 55,
    region: 'Kanto',
    description: 'The bustling capital city, perfect for first-time visitors with endless attractions.',
    topAttractions: [
      {
        id: 'senso-ji',
        name: 'Senso-ji Temple',
        category: ['free', 'culture', 'relaxing'],
        rating: 4.5,
        reviewCount: 85269,
        description: 'Tokyo\'s oldest temple with traditional atmosphere and shopping street.'
      },
      {
        id: 'shibuya-crossing',
        name: 'Shibuya Crossing',
        category: ['free', 'fun', 'iconic'],
        rating: 4.4,
        reviewCount: 52341,
        description: 'The world\'s busiest pedestrian crossing and Tokyo\'s most iconic spot.'
      },
      {
        id: 'tsukiji-market',
        name: 'Tsukiji Outer Market',
        category: ['food', 'paid', 'fun'],
        rating: 4.3,
        reviewCount: 28567,
        description: 'Famous food market with fresh sushi and street food.'
      },
      {
        id: 'tokyo-skytree',
        name: 'Tokyo Skytree',
        category: ['paid', 'views', 'fun'],
        rating: 4.0,
        reviewCount: 91456,
        description: 'Tokyo\'s tallest tower with panoramic city views.'
      },
      {
        id: 'meiji-shrine',
        name: 'Meiji Shrine',
        category: ['free', 'culture', 'relaxing'],
        rating: 4.4,
        reviewCount: 76234,
        description: 'Peaceful Shinto shrine surrounded by forest in the heart of Tokyo.'
      },
      {
        id: 'harajuku',
        name: 'Harajuku District',
        category: ['free', 'fun', 'shopping'],
        rating: 4.2,
        reviewCount: 45123,
        description: 'Colorful youth culture district with unique fashion and cafes.'
      },
      {
        id: 'imperial-palace',
        name: 'Imperial Palace Gardens',
        category: ['free', 'relaxing', 'nature'],
        rating: 4.2,
        reviewCount: 24789,
        description: 'Beautiful traditional gardens surrounding the Imperial Palace.'
      },
      {
        id: 'akihabara',
        name: 'Akihabara Electric Town',
        category: ['free', 'fun', 'technology'],
        rating: 4.1,
        reviewCount: 38965,
        description: 'Electronics and anime culture district with countless shops.'
      },
      {
        id: 'teamlab-borderless',
        name: 'teamLab Borderless',
        category: ['paid', 'fun', 'art'],
        rating: 4.6,
        reviewCount: 34567,
        description: 'Immersive digital art museum with stunning interactive exhibits.'
      },
      {
        id: 'ginza',
        name: 'Ginza District',
        category: ['free', 'shopping', 'luxury'],
        rating: 4.3,
        reviewCount: 29876,
        description: 'Upscale shopping and dining district with luxury brands.'
      }
    ],
    imageUrl: '/images/tokyo.jpg'
  },
  {
    id: 'osaka',
    name: 'Osaka',
    x: 37,
    y: 60,
    region: 'Kansai',
    description: 'Japan\'s kitchen - famous for incredible food and vibrant nightlife.',
    topAttractions: [
      {
        id: 'dotonbori',
        name: 'Dotonbori District',
        category: ['free', 'food', 'fun'],
        rating: 4.4,
        reviewCount: 89123,
        description: 'Vibrant entertainment district famous for neon lights and street food.'
      },
      {
        id: 'osaka-castle',
        name: 'Osaka Castle',
        category: ['paid', 'culture', 'history'],
        rating: 4.2,
        reviewCount: 67234,
        description: 'Historic castle with museum and beautiful surrounding park.'
      },
      {
        id: 'universal-studios',
        name: 'Universal Studios Japan',
        category: ['paid', 'fun', 'theme-park'],
        rating: 4.3,
        reviewCount: 127856,
        description: 'World-class theme park with Harry Potter and Nintendo worlds.'
      },
      {
        id: 'kuromon-market',
        name: 'Kuromon Ichiba Market',
        category: ['food', 'paid', 'culture'],
        rating: 4.1,
        reviewCount: 22567,
        description: 'Traditional market known as "Osaka\'s Kitchen" with fresh seafood.'
      },
      {
        id: 'sumiyoshi-taisha',
        name: 'Sumiyoshi Taisha Shrine',
        category: ['free', 'culture', 'relaxing'],
        rating: 4.4,
        reviewCount: 15642,
        description: 'One of Japan\'s oldest Shinto shrines with distinctive architecture.'
      },
      {
        id: 'shinsaibashi',
        name: 'Shinsaibashi Shopping',
        category: ['free', 'shopping', 'fun'],
        rating: 4.2,
        reviewCount: 41235,
        description: 'Premier shopping district with covered arcades and department stores.'
      },
      {
        id: 'osaka-aquarium',
        name: 'Osaka Aquarium Kaiyukan',
        category: ['paid', 'fun', 'family'],
        rating: 4.3,
        reviewCount: 56789,
        description: 'One of the world\'s largest aquariums featuring whale sharks.'
      },
      {
        id: 'namba-parks',
        name: 'Namba Parks',
        category: ['free', 'shopping', 'relaxing'],
        rating: 4.1,
        reviewCount: 18945,
        description: 'Modern shopping complex with rooftop garden and city views.'
      },
      {
        id: 'takoyaki-street',
        name: 'Takoyaki Museum',
        category: ['food', 'paid', 'fun'],
        rating: 4.0,
        reviewCount: 23456,
        description: 'Food theme park dedicated to Osaka\'s famous takoyaki.'
      },
      {
        id: 'tempozan-wheel',
        name: 'Tempozan Giant Ferris Wheel',
        category: ['paid', 'views', 'relaxing'],
        rating: 4.0,
        reviewCount: 14789,
        description: 'Large ferris wheel offering panoramic views of Osaka Bay.'
      }
    ],
    imageUrl: '/images/osaka.jpg'
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    x: 35,
    y: 58,
    region: 'Kansai',
    description: 'Ancient capital with traditional temples, gardens, and cultural experiences.',
    topAttractions: [
      {
        id: 'fushimi-inari',
        name: 'Fushimi Inari Shrine',
        category: ['free', 'culture', 'nature'],
        rating: 4.6,
        reviewCount: 123456,
        description: 'Famous shrine with thousands of red torii gates up the mountain.'
      },
      {
        id: 'kiyomizu-dera',
        name: 'Kiyomizu-dera Temple',
        category: ['paid', 'culture', 'views'],
        rating: 4.5,
        reviewCount: 89234,
        description: 'Historic wooden temple with stunning city views, especially during cherry blossom season.'
      },
      {
        id: 'arashiyama-bamboo',
        name: 'Arashiyama Bamboo Grove',
        category: ['free', 'nature', 'relaxing'],
        rating: 4.3,
        reviewCount: 67890,
        description: 'Magical bamboo forest creating natural green tunnels.'
      },
      {
        id: 'golden-pavilion',
        name: 'Kinkaku-ji Golden Pavilion',
        category: ['paid', 'culture', 'iconic'],
        rating: 4.4,
        reviewCount: 78901,
        description: 'Kyoto\'s most famous temple covered in gold leaf, reflected in a pond.'
      },
      {
        id: 'gion-district',
        name: 'Gion Historic District',
        category: ['free', 'culture', 'walking'],
        rating: 4.3,
        reviewCount: 45678,
        description: 'Traditional geisha district with historic wooden houses and tea shops.'
      },
      {
        id: 'philosopher-path',
        name: 'Philosopher\'s Path',
        category: ['free', 'nature', 'relaxing'],
        rating: 4.2,
        reviewCount: 34567,
        description: 'Peaceful walking path along a canal, beautiful during cherry blossom season.'
      },
      {
        id: 'nijo-castle',
        name: 'Nijo Castle',
        category: ['paid', 'culture', 'history'],
        rating: 4.3,
        reviewCount: 43210,
        description: 'Historic castle with "nightingale floors" and beautiful gardens.'
      },
      {
        id: 'ryoan-ji',
        name: 'Ryoan-ji Rock Garden',
        category: ['paid', 'culture', 'relaxing'],
        rating: 4.1,
        reviewCount: 23456,
        description: 'Famous zen rock garden perfect for contemplation and meditation.'
      },
      {
        id: 'pontocho-alley',
        name: 'Pontocho Alley',
        category: ['free', 'food', 'culture'],
        rating: 4.2,
        reviewCount: 29876,
        description: 'Narrow alley with traditional restaurants and bars along the river.'
      },
      {
        id: 'todai-ji-temple',
        name: 'Todai-ji Temple',
        category: ['paid', 'culture', 'history'],
        rating: 4.4,
        reviewCount: 65432,
        description: 'Home to one of Japan\'s largest bronze Buddha statues in a massive wooden hall.'
      }
    ],
    imageUrl: '/images/kyoto.jpg'
  }
];

export default function JapanMap({ itinerarySection }: JapanMapProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showAttractions, setShowAttractions] = useState<boolean>(false);
  const { addToItinerary, isInItinerary } = useItinerary();

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
                          <button
                            className={`
                              relative z-20 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center
                              ${selectedCity?.id === city.id
                                ? 'text-red-600 scale-110 drop-shadow-lg'
                                : 'text-white hover:text-red-300 hover:scale-105 drop-shadow-md'
                              }
                            `}
                            onClick={() => handleCityClick(city)}
                            title={city.name}
                          >
                            <svg 
                              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                              fill="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* City labels */}
                    {cities.map((city) => (
                      <div
                        key={`label-${city.id}`}
                        className="absolute pointer-events-none z-50"
                        style={{
                          left: `${city.x}%`,
                          top: `${city.y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <div
                          className={`
                            absolute left-1/2 transform -translate-x-1/2
                            ${city.y < 45 ? 'top-6 sm:top-8' : 'bottom-6 sm:bottom-8'}
                            bg-gray-900/95 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md shadow-lg
                            text-xs sm:text-sm font-semibold text-white whitespace-nowrap
                            transition-all duration-200 ease-in-out
                            opacity-100 scale-100
                          `}
                        >
                          {city.name}
                          {/* Arrow pointing to marker */}
                          <div className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 
                            ${city.y < 45 
                              ? 'bottom-full border-l-3 border-r-3 border-b-3 border-transparent border-b-gray-900/95'
                              : 'top-full border-l-3 border-r-3 border-t-3 border-transparent border-t-gray-900/95'
                            }`}></div>
                        </div>
                      </div>
                    ))
                    }
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl xl:text-2xl font-bold text-gray-800">
                  Top 10 Things to Do in {selectedCity.name}
                </h2>
                <button 
                  onClick={() => setShowAttractions(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {selectedCity.topAttractions.map((attraction, index) => (
                  <div 
                    key={attraction.id} 
                    className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800 mb-1">
                          #{index + 1} {attraction.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {renderStars(attraction.rating)}
                          </div>
                        </div>
                      </div>
                      <button 
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          isInItinerary(attraction.id)
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                        onClick={() => handleAddToItinerary(attraction, selectedCity.name)}
                        disabled={isInItinerary(attraction.id)}
                      >
                        {isInItinerary(attraction.id) ? '✓ Added to Trip' : '+ Add to Trip'}
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm flex-grow">{attraction.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
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
                  </div>
                ))}
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
