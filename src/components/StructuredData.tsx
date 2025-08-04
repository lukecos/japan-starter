export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    "name": "Japan Starter - Complete Japan Travel Guide",
    "description": "Interactive travel guide for first-time visitors to Japan with city guides, attraction reviews, and essential travel tips.",
    "url": "https://japan-starter.vercel.app",
    "author": {
      "@type": "Organization",
      "name": "Japan Starter"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Japan Starter"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When is the best time to visit Japan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Spring (March-May) and autumn (September-November) are ideal for pleasant weather and beautiful scenery. Spring offers cherry blossoms, while autumn has stunning fall colors."
          }
        },
        {
          "@type": "Question", 
          "name": "Do I need a visa to visit Japan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Many countries have visa-free agreements with Japan for tourism (usually 90 days). Citizens of the US, EU, UK, Australia, Canada, and many others can visit without a visa."
          }
        },
        {
          "@type": "Question",
          "name": "Should I buy a JR Pass?",
          "acceptedAnswer": {
            "@type": "Answer", 
            "text": "Yes, if you're traveling between multiple cities. A 7-day JR Pass costs about ¥29,650 and pays for itself with just one Tokyo-Kyoto round trip."
          }
        }
      ]
    },
    "about": [
      {
        "@type": "Place",
        "name": "Tokyo",
        "description": "The bustling capital city, a perfect blend of traditional and modern Japan."
      },
      {
        "@type": "Place", 
        "name": "Kyoto",
        "description": "The ancient capital with thousands of temples, gardens, and traditional architecture."
      },
      {
        "@type": "Place",
        "name": "Osaka", 
        "description": "Known as Japan's kitchen, famous for incredible food and vibrant nightlife."
      }
    ],
    "keywords": "Japan travel guide, Tokyo attractions, Kyoto travel, Osaka guide, Japan itinerary, first time Japan, Japan travel tips"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
