'use client';

import { useState } from 'react';

interface City {
  id: string;
  name: string;
  x: number; // Percentage coordinates for positioning
  y: number;
  region: string;
  description: string;
  attractions: {
    name: string;
    rating: number;
    reviewCount: number;
  }[];
  imageUrl: string;
}

const cities: City[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    x: 55,
    y: 55,
    region: 'Kanto',
    description: 'The bustling capital city, a perfect blend of traditional and modern Japan.',
    attractions: [
      { name: 'Tsukiji Outer Market', rating: 4.4, reviewCount: 32145 },
      { name: 'Senso-ji Temple', rating: 4.3, reviewCount: 65123 },
      { name: 'Shibuya Crossing', rating: 4.2, reviewCount: 45876 },
      { name: 'Imperial Palace', rating: 4.2, reviewCount: 28734 },
      { name: 'Tokyo Skytree', rating: 4.1, reviewCount: 89542 }
    ],
    imageUrl: '/images/tokyo.jpg'
  },
  {
    id: 'osaka',
    name: 'Osaka',
    x: 37,
    y: 60,
    region: 'Kansai',
    description: 'Known as the kitchen, famous for incredible food and vibrant nightlife.',
    attractions: [
      { name: 'Dotonbori District', rating: 4.5, reviewCount: 78123 },
      { name: 'Universal Studios Japan', rating: 4.4, reviewCount: 95672 },
      { name: 'Sumiyoshi Taisha Shrine', rating: 4.4, reviewCount: 12387 },
      { name: 'Osaka Castle', rating: 4.3, reviewCount: 52341 },
      { name: 'Kuromon Ichiba Market', rating: 4.2, reviewCount: 18456 }
    ],
    imageUrl: '/images/osaka.jpg'
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    x: 40,
    y: 57,
    region: 'Kansai',
    description: 'The ancient capital with thousands of temples, gardens, and traditional architecture.',
    attractions: [
      { name: 'Fushimi Inari Shrine', rating: 4.5, reviewCount: 67234 },
      { name: 'Kiyomizu-dera Temple', rating: 4.4, reviewCount: 48567 },
      { name: 'Arashiyama Bamboo Grove', rating: 4.3, reviewCount: 35678 },
      { name: 'Nijo Castle', rating: 4.3, reviewCount: 22156 },
      { name: 'Gion District', rating: 4.2, reviewCount: 29845 }
    ],
    imageUrl: '/images/kyoto.jpg'
  },
  {
    id: 'hiroshima',
    name: 'Hiroshima',
    x: 22,
    y: 60,
    region: 'Chugoku',
    description: 'A city of peace and remembrance, with beautiful nearby Miyajima Island.',
    attractions: [
      { name: 'Peace Memorial Park', rating: 4.6, reviewCount: 45234 },
      { name: 'Itsukushima Shrine (Miyajima)', rating: 4.5, reviewCount: 38967 },
      { name: 'Atomic Bomb Dome', rating: 4.4, reviewCount: 34567 },
      { name: 'Shukkei-en Garden', rating: 4.3, reviewCount: 12456 },
      { name: 'Hiroshima Castle', rating: 4.2, reviewCount: 18734 }
    ],
    imageUrl: '/images/hiroshima.jpg'
  },
  {
    id: 'mount-fuji',
    name: 'Mount Fuji',
    x: 50,
    y: 57,
    region: 'Chubu',
    description: 'Sacred mountain and highest peak.',
    attractions: [
      { name: 'Chureito Pagoda', rating: 4.5, reviewCount: 19834 },
      { name: 'Hakone National Park', rating: 4.4, reviewCount: 31245 },
      { name: 'Fuji Five Lakes', rating: 4.3, reviewCount: 28567 },
      { name: 'Kawaguchi Lake', rating: 4.2, reviewCount: 22456 },
      { name: 'Oshino Hakkai', rating: 4.1, reviewCount: 14567 }
    ],
    imageUrl: '/images/mount-fuji.jpg'
  },
  {
    id: 'sapporo',
    name: 'Sapporo',
    x: 63,
    y: 18,
    region: 'Hokkaido',
    description: 'The snowy northern city famous for beer, ramen, and winter festivals.',
    attractions: [
      { name: 'Sapporo Snow Festival', rating: 4.6, reviewCount: 25634 },
      { name: 'Jozankei Hot Springs', rating: 4.5, reviewCount: 12845 },
      { name: 'Odori Park', rating: 4.4, reviewCount: 22134 },
      { name: 'Sapporo Beer Garden', rating: 4.3, reviewCount: 14567 },
      { name: 'Susukino District', rating: 4.2, reviewCount: 18945 }
    ],
    imageUrl: '/images/sapporo.jpg'
  },
  {
    id: 'nara',
    name: 'Nara',
    x: 37,
    y: 64,
    region: 'Kansai',
    description: 'First permanent capital, famous for free-roaming deer and ancient temples.',
    attractions: [
      { name: 'Todai-ji Temple', rating: 4.5, reviewCount: 42567 },
      { name: 'Nara Park', rating: 4.4, reviewCount: 38234 },
      { name: 'Isuien Garden', rating: 4.4, reviewCount: 8734 },
      { name: 'Kasuga Taisha Shrine', rating: 4.3, reviewCount: 24567 },
      { name: 'Kofuku-ji Temple', rating: 4.2, reviewCount: 18945 }
    ],
    imageUrl: '/images/nara.jpg'
  },
  {
    id: 'nikko',
    name: 'Nikko',
    x: 57,
    y: 48,
    region: 'Kanto',
    description: 'A UNESCO World Heritage site with ornate shrines and beautiful nature.',
    attractions: [
      { name: 'Nikko National Park', rating: 4.6, reviewCount: 28945 },
      { name: 'Toshogu Shrine', rating: 4.5, reviewCount: 35234 },
      { name: 'Kegon Falls', rating: 4.4, reviewCount: 19867 },
      { name: 'Lake Chuzenji', rating: 4.3, reviewCount: 15623 },
      { name: 'Rinnai-ji Temple', rating: 4.2, reviewCount: 12456 }
    ],
    imageUrl: '/images/nikko.jpg'
  },
  {
    id: 'nagoya',
    name: 'Nagoya',
    x: 42,
    y: 59,
    region: 'Chubu',
    description: 'Major industrial city with impressive castle and unique local cuisine.',
    attractions: [
      { name: 'SCMAGLEV Railway Park', rating: 4.4, reviewCount: 16789 },
      { name: 'Nagoya Castle', rating: 4.3, reviewCount: 28567 },
      { name: 'Atsuta Shrine', rating: 4.2, reviewCount: 19834 },
      { name: 'Tokugawa Art Museum', rating: 4.2, reviewCount: 8945 },
      { name: 'Osu Shopping District', rating: 4.1, reviewCount: 14623 }
    ],
    imageUrl: '/images/nagoya.jpg'
  },
  {
    id: 'fukuoka',
    name: 'Fukuoka',
    x: 15,
    y: 64,
    region: 'Kyushu',
    description: 'Gateway to Asia with delicious ramen and vibrant street food culture.',
    attractions: [
      { name: 'Yatai Food Stalls', rating: 4.5, reviewCount: 15967 },
      { name: 'Dazaifu Tenmangu Shrine', rating: 4.4, reviewCount: 26834 },
      { name: 'Nakasu District', rating: 4.3, reviewCount: 22567 },
      { name: 'Canal City Hakata', rating: 4.2, reviewCount: 19456 },
      { name: 'Fukuoka Castle Ruins', rating: 4.1, reviewCount: 18234 }
    ],
    imageUrl: '/images/fukuoka.jpg'
  }
];

export default function JapanMap() {
  const [selectedCity, setSelectedCity] = useState<City | null>(cities.find(city => city.id === 'tokyo') || null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

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
      <div className="w-full bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 p-3 sm:p-6 rounded-xl shadow-lg overflow-hidden">
      <div className="grid lg:grid-cols-3 gap-3 sm:gap-6 w-full min-w-0">
        {/* Interactive Japan Map */}
        <div className="lg:col-span-2 w-full min-w-0">
          <div className="relative w-full flex justify-center items-center overflow-hidden h-[400px] min-h-[350px] pt-2 pb-2 sm:h-[550px] sm:pt-5 sm:pb-5">
            {/* Image and markers container - they scale together */}
            <div className="relative inline-block">
              <img 
                src="/images/image.png" 
                alt="Japan Map" 
                className="block object-contain"
                style={{ 
                  maxWidth: '1100px', 
                  maxHeight: '510px', 
                  minWidth: '250px', 
                  minHeight: '150px',
                  width: 'auto',
                  height: 'auto'
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
                        className="w-6 h-6 md:w-7 md:h-7"
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
                (hoveredCity === city.id || selectedCity?.id === city.id) && (
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
                        ${city.y < 45 ? 'top-8' : 'bottom-8'}
                        bg-gray-900/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-lg
                        text-xs md:text-sm font-semibold text-white whitespace-nowrap
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
                    {selectedCity.attractions.map((attraction, index) => (
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