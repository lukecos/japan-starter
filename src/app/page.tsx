'use client';

import JapanMap from "../components/JapanMap";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Planning & Preparation
  {
    id: '1',
    question: 'When is the best time to visit Japan?',
    answer: 'Spring (March-May) and autumn (September-November) are ideal for pleasant weather and beautiful scenery. Spring offers cherry blossoms, while autumn has stunning fall colors. Summer can be hot and humid, but great for festivals. Winter is perfect for skiing and hot springs.',
    category: 'Planning'
  },
  {
    id: '2',
    question: 'Do I need a visa to visit Japan?',
    answer: 'Many countries have visa-free agreements with Japan for tourism (usually 90 days). Citizens of the US, EU, UK, Australia, Canada, and many others can visit without a visa. Check with the Japanese embassy in your country for specific requirements.',
    category: 'Planning'
  },
  {
    id: '3',
    question: 'How much should I budget for a trip to Japan?',
    answer: 'Budget travelers: ¥6,000-8,000/day ($40-55). Mid-range: ¥10,000-15,000/day ($70-100). Luxury: ¥20,000+/day ($140+). This includes accommodation, food, transportation, and activities. Tokyo and Kyoto tend to be more expensive than other cities.',
    category: 'Planning'
  },

  // Transportation
  {
    id: '4',
    question: 'Should I buy a JR Pass?',
    answer: 'Yes, if you\'re traveling between multiple cities. A 7-day JR Pass costs about ¥29,650 and pays for itself with just one Tokyo-Kyoto round trip. It covers most JR trains, including shinkansen (bullet trains), but not Nozomi and Mizuho services.',
    category: 'Transportation'
  },
  {
    id: '5',
    question: 'How do I navigate the train system?',
    answer: 'Download Google Maps and Hyperdia apps for route planning. Most signs have English. IC cards (Suica/Pasmo) work for most trains and buses. Follow the crowd during rush hours, and remember: no talking on phones in trains.',
    category: 'Transportation'
  },

  // Culture & Etiquette
  {
    id: '6',
    question: 'What are the most important etiquette rules?',
    answer: 'Remove shoes when entering homes, ryokan, and some restaurants. Bow slightly when greeting. Don\'t tip (it\'s not customary). Be quiet on trains. Don\'t eat while walking. Use both hands when giving/receiving business cards or money.',
    category: 'Culture'
  },

  // Language & Communication
  {
    id: '7',
    question: 'Do I need to speak Japanese?',
    answer: 'Not necessarily! Many signs have English, and people in tourist areas often speak basic English. Download Google Translate with camera function. Learn basic phrases like "arigatou gozaimasu" (thank you) and "sumimasen" (excuse me).',
    category: 'Language'
  },

  // Food & Dining
  {
    id: '8',
    question: 'Is it safe to eat street food and raw fish?',
    answer: 'Absolutely! Japan has extremely high food safety standards. Sushi, sashimi, and street food are very safe. Look for busy places with high turnover. Convenience store food is also excellent and safe.',
    category: 'Food'
  },

  // Money & Practical
  {
    id: '9',
    question: 'Should I bring cash or use cards?',
    answer: 'Bring cash! Japan is still largely cash-based. Many places don\'t accept cards. Withdraw from 7-Eleven ATMs or post office ATMs with international cards. Budget about ¥10,000-15,000 in cash per day.',
    category: 'Money'
  },
  {
    id: '10',
    question: 'What should I pack for Japan?',
    answer: 'Comfortable walking shoes, portable wifi or SIM card, cash, power adapter (Type A/B), any prescription medications, and appropriate clothing for the season. Pack light - you can buy most things in Japan.',
    category: 'Practical'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Japan Starter
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#map" className="text-gray-600 hover:text-red-500 font-medium transition-colors">
                Explore Map
              </a>
              <a href="#faq" className="text-gray-600 hover:text-red-500 font-medium transition-colors">
                Travel FAQs
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
          Your First
          <span className="block bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            Japan Adventure
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          New to Japan travel? Choose a city on the map below to discover the must-see destinations and start planning your perfect first trip to Japan.
        </p>
      </section>

      {/* Interactive Map Section */}
      <section id="map" className="container mx-auto px-4 py-8">
        <JapanMap />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-16" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Travel FAQs
        </h2>
        <div className="grid gap-6 max-w-4xl mx-auto">
          {faqData.map((faq, index) => (
            <article key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {faq.question}
              </h3>
              <div className="text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <h4 className="text-xl font-bold">Japan Starter</h4>
          </div>
          <p className="text-gray-400 mb-6">
            Your first stop on planning your Japan adventure.
          </p>
        </div>
      </footer>
    </div>
  );
}
