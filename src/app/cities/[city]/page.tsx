import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface CityData {
  id: string;
  name: string;
  region: string;
  description: string;
  longDescription: string;
  attractions: Array<{
    name: string;
    description: string;
    category: string;
    website?: string;
  }>;
  food: string[];
  bestTimeToVisit: string;
  gettingThere: string;
  imageUrl: string;
}

const citiesData: { [key: string]: CityData } = {
  tokyo: {
    id: 'tokyo',
    name: 'Tokyo',
    region: 'Kanto',
    description: 'The bustling capital city, a perfect blend of traditional and modern Japan.',
    longDescription: 'Tokyo, Japan\'s capital and largest city, is a fascinating blend of cutting-edge technology and traditional culture. From towering skyscrapers to serene temples, bustling markets to tranquil gardens, Tokyo offers an incredible diversity of experiences. The city is a global hub for fashion, food, technology, and pop culture, while still maintaining its deep cultural roots.',
    attractions: [
      {
        name: 'Tokyo Skytree',
        description: 'The tallest structure in Japan offering panoramic views of the city.',
        category: 'Landmark',
        website: 'https://www.tokyo-skytree.jp/en/'
      },
      {
        name: 'Senso-ji Temple',
        description: 'Tokyo\'s oldest Buddhist temple in the historic Asakusa district.',
        category: 'Temple',
        website: 'https://www.senso-ji.jp/english/'
      },
      {
        name: 'Shibuya Crossing',
        description: 'The world\'s busiest pedestrian crossing and iconic Tokyo landmark.',
        category: 'Landmark'
      },
      {
        name: 'Tsukiji Outer Market',
        description: 'Famous market for the freshest sushi and seafood in the world.',
        category: 'Market'
      },
      {
        name: 'Imperial Palace',
        description: 'The primary residence of the Emperor of Japan with beautiful gardens.',
        category: 'Palace'
      },
      {
        name: 'Harajuku District',
        description: 'Center of youth culture and fashion with unique street style.',
        category: 'District'
      }
    ],
    food: ['Sushi', 'Ramen', 'Tempura', 'Yakitori', 'Monjayaki', 'Taiyaki'],
    bestTimeToVisit: 'March to May (Spring) and September to November (Autumn)',
    gettingThere: 'Tokyo has two major airports: Narita and Haneda. The city has an excellent public transportation system with JR, metro, and private railway lines.',
    imageUrl: '/images/tokyo.jpg'
  },
  osaka: {
    id: 'osaka',
    name: 'Osaka',
    region: 'Kansai',
    description: 'Known as Japan\'s kitchen, famous for incredible food and vibrant nightlife.',
    longDescription: 'Osaka is Japan\'s culinary capital, where food culture reigns supreme. Known for its down-to-earth people, excellent street food, and vibrant entertainment districts, Osaka offers a more relaxed atmosphere compared to Tokyo. The city is famous for its comedy culture, incredible takoyaki (octopus balls), and the bustling Dotonbori district.',
    attractions: [
      {
        name: 'Osaka Castle',
        description: 'A magnificent reconstruction of the original castle from the 16th century.',
        category: 'Castle',
        website: 'https://www.osakacastle.net/english/'
      },
      {
        name: 'Dotonbori District',
        description: 'Famous entertainment district known for neon lights, street food, and nightlife.',
        category: 'District'
      },
      {
        name: 'Universal Studios Japan',
        description: 'Theme park featuring attractions from popular movies and anime.',
        category: 'Theme Park',
        website: 'https://www.usj.co.jp/web/en/us'
      },
      {
        name: 'Kuromon Ichiba Market',
        description: '190-year-old market famous for fresh seafood and local delicacies.',
        category: 'Market'
      },
      {
        name: 'Sumiyoshi Taisha Shrine',
        description: 'One of Japan\'s oldest Shinto shrines with unique architecture.',
        category: 'Shrine'
      },
      {
        name: 'Shitennoji Temple',
        description: 'One of the oldest Buddhist temples in Japan, founded in 593 AD.',
        category: 'Temple'
      }
    ],
    food: ['Takoyaki', 'Okonomiyaki', 'Kushikatsu', 'Kitsune Udon', 'Butaman', 'Tamagoyaki'],
    bestTimeToVisit: 'March to May (Spring) and September to November (Autumn)',
    gettingThere: 'Kansai International Airport serves Osaka. The city is well-connected by train, including the Shinkansen bullet train.',
    imageUrl: '/images/osaka.jpg'
  },
  kyoto: {
    id: 'kyoto',
    name: 'Kyoto',
    region: 'Kansai',
    description: 'The ancient capital with thousands of temples, gardens, and traditional architecture.',
    longDescription: 'Kyoto served as Japan\'s capital for over 1,000 years and is considered the cultural heart of Japan. With over 2,000 temples and shrines, traditional wooden houses, and carefully maintained gardens, Kyoto offers a glimpse into Japan\'s rich history. The city is also famous for its geisha districts, traditional crafts, and exquisite cuisine.',
    attractions: [
      {
        name: 'Fushimi Inari Shrine',
        description: 'Famous shrine with thousands of vermillion torii gates on Mount Inari.',
        category: 'Shrine'
      },
      {
        name: 'Kiyomizu-dera Temple',
        description: 'UNESCO World Heritage temple offering panoramic views of the city.',
        category: 'Temple'
      },
      {
        name: 'Arashiyama Bamboo Grove',
        description: 'Mesmerizing bamboo forest creating natural green tunnels.',
        category: 'Nature'
      },
      {
        name: 'Gion District',
        description: 'Historic district where you might spot geishas in traditional dress.',
        category: 'District'
      },
      {
        name: 'Philosopher\'s Path',
        description: 'Beautiful walking path lined with cherry trees and temples.',
        category: 'Nature'
      },
      {
        name: 'Nijo Castle',
        description: 'Historic castle with "nightingale floors" and beautiful gardens.',
        category: 'Castle'
      }
    ],
    food: ['Kaiseki', 'Tofu Cuisine', 'Matcha', 'Wagyu Beef', 'Kyoto-style Sushi', 'Yudofu'],
    bestTimeToVisit: 'March to May (Cherry Blossoms) and November (Autumn Colors)',
    gettingThere: 'Accessible via Kansai International Airport or by train from other Japanese cities. The Shinkansen bullet train connects Kyoto to major cities.',
    imageUrl: '/images/kyoto.jpg'
  }
};

export default function CityPage({ params }: { params: { city: string } }) {
  const cityData = citiesData[params.city];

  if (!cityData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Discover Japan
              </h1>
            </Link>
            <Link
              href="/"
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-200"
            >
              ← Back to Map
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <div className="text-9xl opacity-30">{getEmoji(cityData.id)}</div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">{cityData.name}</h1>
            <p className="text-xl bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
              {cityData.region} Region
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About {cityData.name}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {cityData.longDescription}
            </p>
          </section>

          {/* Attractions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Attractions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cityData.attractions.map((attraction, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">{getAttractionEmoji(attraction.name)}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{attraction.name}</h3>
                      <p className="text-gray-600 mb-3">{attraction.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                          {attraction.category}
                        </span>
                        {attraction.website && (
                          <a
                            href={attraction.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:text-red-600 font-medium"
                          >
                            Visit Website →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Food & Travel Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Local Food */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-3">🍜</span>
                Local Specialties
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {cityData.food.map((food, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-red-100 to-pink-100 text-red-600 px-3 py-2 rounded-lg text-center text-sm font-medium"
                  >
                    {food}
                  </span>
                ))}
              </div>
            </div>

            {/* Travel Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-3">📅</span>
                Best Time to Visit
              </h3>
              <p className="text-gray-600 mb-4">{cityData.bestTimeToVisit}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <span className="mr-2">✈️</span>
                Getting There
              </h4>
              <p className="text-gray-600">{cityData.gettingThere}</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-block"
            >
              🗾 Explore More Cities
            </Link>
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
  if (attractionLower.includes('universal') || attractionLower.includes('theme')) return '🎢';
  
  return '🎌';
}
