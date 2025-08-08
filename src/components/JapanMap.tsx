'use client';

import { useState } from 'react';

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

export default function JapanMap() {
  const [selectedCity, setSelectedCity] = useState<City | null>(cities.find(city => city.id === 'tokyo') || null);

  return (
    <div className="w-full space-y-4">
      {/* City Selection Buttons */}
      <div className="bg-white rounded-lg p-4 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Choose City to Explore</h3>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <button
              key={`button-${city.id}`}
              onClick={() => setSelectedCity(city)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                ${selectedCity?.id === city.id
                  ? 'bg-red-600 text-white shadow-md border-red-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }
              `}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Container */}
      <div className="w-full bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 p-2 sm:p-3 md:p-6 rounded-xl shadow-lg">
      <div className="grid lg:grid-cols-3 gap-3 sm:gap-6 w-full">
        {/* Interactive Japan Map */}
        <div className="lg:col-span-2 w-full">
          <div className="relative w-full flex justify-center items-center p-2 sm:p-4 min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
            {/* Image and markers container - they scale together */}
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
              {/* Cities positioned directly on the image - they scale with the image */}
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
                  {/* City marker with enhanced visibility */}
                  <div className="relative">
                    <button
                      className={`
                        relative z-20 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center
                        ${selectedCity?.id === city.id
                          ? 'text-red-600 scale-110 drop-shadow-lg'
                          : 'text-white hover:text-red-300 hover:scale-105 drop-shadow-md'
                        }
                      `}
                      onClick={() => setSelectedCity(city)}
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
                    
                    {/* Enhanced selected city effect */}
                  </div>
                </div>
              ))}
              
              {/* City labels - positioned separately with higher z-index */}
              {cities.map((city) => (
                selectedCity?.id === city.id && (
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
                )
              ))}
            </div>
          </div>
        </div>

        {/* City Details Sidebar */}
        <div className="lg:col-span-1 w-full min-w-0">
          <div className="h-auto min-h-[400px] sm:h-[500px] md:h-[600px] max-h-[600px] w-full">
            {selectedCity ? (
              <div className="bg-white rounded-lg border p-3 sm:p-4 lg:p-6 h-full max-h-[600px] overflow-hidden flex flex-col w-full max-w-full">
                {/* City Info */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800">{selectedCity.name}</h3>
                    <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                      {selectedCity.region}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {selectedCity.description}
                  </p>
                </div>

                {/* Attractions */}
                <div>
                  <h4 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-4">Must-See Attractions</h4>
                  <div className="space-y-1.5 sm:space-y-3">
                    {selectedCity.topAttractions.map((attraction, index) => (
                      <a
                        key={index}
                        href={`https://www.google.com/search?q=${encodeURIComponent(attraction.name + ' ' + selectedCity.name + ' Japan')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-1.5 sm:gap-3 p-1.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-1.5 sm:gap-3 flex-1 min-w-0">
                          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-gray-700 font-medium block text-xs sm:text-sm truncate group-hover:text-gray-900">{attraction.name}</span>
                            <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                              <div className="flex items-center text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-xs ${i < Math.floor(attraction.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="text-xs text-gray-600 truncate">
                                {attraction.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 bg-blue-500 group-hover:bg-blue-600 text-white rounded-full transition-colors flex-shrink-0">
                          <svg 
                            className="w-2 h-2 sm:w-3 sm:h-3" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border p-3 sm:p-8 text-center h-auto flex flex-col justify-center">
                <div className="text-gray-400 mb-2 sm:mb-4">
                  <svg className="w-10 h-10 sm:w-16 sm:h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h3 className="text-sm sm:text-lg font-semibold text-gray-600 mb-1 sm:mb-2">Choose Your First Destination</h3>
                <p className="text-gray-500 text-xs sm:text-sm">New to Japan? Start here! Click any city above or on the map to discover beginner-friendly attractions and start planning your adventure.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}