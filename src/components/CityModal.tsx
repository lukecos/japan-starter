'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface City {
  id: string;
  name: string;
  x: number;
  y: number;
  region: string;
  description: string;
  attractions: string[];
  imageUrl: string;
}

interface CityModalProps {
  city: City;
  onClose: () => void;
}

export default function CityModal({ city, onClose }: CityModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative">
          <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-2xl overflow-hidden">
            {/* Placeholder for city image */}
            <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-blue-300 to-purple-400">
              {getEmoji(city.id)}
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-opacity-30 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-800">{city.name}</h2>
            <span className="bg-gradient-to-r from-red-100 to-pink-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
              {city.region} Region
            </span>
          </div>

          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {city.description}
          </p>

          {/* Attractions */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🎯</span>
              Top Attractions
            </h3>
            <div className="grid gap-3">
              {city.attractions.map((attraction, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover:shadow-md transition-all duration-200"
                >
                  <span className="text-2xl mr-3">{getAttractionEmoji(attraction)}</span>
                  <span className="text-gray-700 font-medium">{attraction}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap">
            <a
              href={`/cities/${city.id}`}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center"
            >
              <span className="mr-2">�</span>
              Learn More
            </a>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center">
              <span className="mr-2">📍</span>
              Get Directions
            </button>
            <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center">
              <span className="mr-2">🍜</span>
              Local Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getEmoji(cityId: string): string {
  const emojiMap: { [key: string]: string } = {
    'tokyo': '🏙️',
    'osaka': '🍜',
    'kyoto': '⛩️',
    'hiroshima': '🕊️',
    'mount-fuji': '🗻',
    'sapporo': '❄️',
    'nara': '🦌',
    'nikko': '🌲'
  };
  return emojiMap[cityId] || '🏯';
}

function getAttractionEmoji(attraction: string): string {
  const attractionLower = attraction.toLowerCase();
  
  if (attractionLower.includes('temple') || attractionLower.includes('shrine')) return '⛩️';
  if (attractionLower.includes('castle')) return '🏯';
  if (attractionLower.includes('park') || attractionLower.includes('garden')) return '🌳';
  if (attractionLower.includes('market') || attractionLower.includes('food')) return '🍜';
  if (attractionLower.includes('museum') || attractionLower.includes('memorial')) return '🏛️';
  if (attractionLower.includes('tower') || attractionLower.includes('skytree')) return '🗼';
  if (attractionLower.includes('mountain') || attractionLower.includes('fuji')) return '🗻';
  if (attractionLower.includes('bamboo')) return '🎋';
  if (attractionLower.includes('hot spring') || attractionLower.includes('onsen')) return '♨️';
  if (attractionLower.includes('bridge')) return '🌉';
  if (attractionLower.includes('lake')) return '🏞️';
  if (attractionLower.includes('festival') || attractionLower.includes('snow')) return '❄️';
  if (attractionLower.includes('deer')) return '🦌';
  if (attractionLower.includes('crossing')) return '🚶';
  if (attractionLower.includes('district') || attractionLower.includes('harajuku')) return '🛍️';
  
  return '🎌';
}
