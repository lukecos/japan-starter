'use client';

import JapanMap from "../components/JapanMapNew";
import { ItineraryProvider, useItinerary } from "../contexts/ItineraryContext";
import jsPDF from 'jspdf';

function ItinerarySection({ variant = 'default' }: { variant?: 'default' | 'embedded' }) {
  const { itineraryItems, removeFromItinerary, clearItinerary } = useItinerary();

  const generateGoogleMapsUrl = (attractionName: string, cityName: string) => {
    const query = encodeURIComponent(`${attractionName} ${cityName} Japan`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const getAttractionTimeHours = (attraction: { name: string; city: string; category: string[]; rating: number; description: string; id: string }) => {
    // Research-based time estimates for different attraction types and specific venues
    const name = attraction.name.toLowerCase();
    
    // Full-day attractions (8+ hours)
    if (name.includes('universal studios') || name.includes('disneyland')) {
      return 8; // Theme parks are full-day experiences
    }
    
    // Half-day attractions (3-4 hours)
    if (name.includes('teamlab') || name.includes('aquarium') || 
        name.includes('zoo') || name.includes('palace gardens')) {
      return 3.5;
    }
    
    // Museum/Castle attractions (2-3 hours)
    if (name.includes('castle') || name.includes('museum') || 
        name.includes('temple') && (name.includes('todai-ji') || name.includes('kiyomizu'))) {
      return 2.5;
    }
    
    // Major temples/shrines (1.5-2 hours)
    if (name.includes('temple') || name.includes('shrine') || 
        name.includes('pavilion') || name.includes('golden')) {
      return 1.5;
    }
    
    // Markets and food areas (2-3 hours)
    if (name.includes('market') || name.includes('takoyaki') || 
        name.includes('tsukiji') || name.includes('kuromon')) {
      return 2;
    }
    
    // Walking districts/areas (2-4 hours depending on size)
    if (name.includes('shibuya') || name.includes('dotonbori') || 
        name.includes('ginza') || name.includes('shinsaibashi')) {
      return 3;
    }
    if (name.includes('harajuku') || name.includes('akihabara') || 
        name.includes('gion') || name.includes('pontocho')) {
      return 2;
    }
    
    // Nature/walking paths (1-3 hours)
    if (name.includes('bamboo') || name.includes('path') || 
        name.includes('park') || name.includes('garden')) {
      return 1.5;
    }
    
    // Quick visits/viewpoints (30 min - 1 hour)
    if (name.includes('crossing') || name.includes('tower') || 
        name.includes('skytree') || name.includes('wheel')) {
      return 1;
    }
    
    // Default for other attractions
    return 1.5;
  };

  const estimateTripLength = () => {
    if (itineraryItems.length === 0) return null;
    
    // Calculate total hours needed based on individual attractions
    let totalHours = 0;
    itineraryItems.forEach(item => {
      totalHours += getAttractionTimeHours(item);
    });
    
    // Group by city to calculate travel time
    const citiesVisited = new Set(itineraryItems.map(item => item.city));
    const cityCount = citiesVisited.size;
    
    // Add travel time between cities (4 hours per additional city)
    const travelHours = cityCount > 1 ? (cityCount - 1) * 4 : 0;
    
    // Add buffer time for meals, rest, and getting around (20% of sightseeing time)
    const bufferHours = totalHours * 0.2;
    
    const grandTotalHours = totalHours + travelHours + bufferHours;
    
    // Convert to days (assuming 8-10 hours of sightseeing per day)
    const totalDays = grandTotalHours / 9; // 9 hours average per day
    
    // Format the result more precisely
    if (totalDays <= 0.6) return "Half day";
    if (totalDays <= 1.2) return "1 day";
    if (totalDays <= 1.8) return "1-2 days";
    if (totalDays <= 2.2) return "2 days";
    if (totalDays <= 2.8) return "2-3 days";
    if (totalDays <= 3.2) return "3 days";
    if (totalDays <= 3.8) return "3-4 days";
    if (totalDays <= 4.5) return "4-5 days";
    if (totalDays <= 5.5) return "5-6 days";
    if (totalDays <= 6.5) return "6-7 days";
    
    // For longer trips
    const roundedDays = Math.round(totalDays);
    if (roundedDays === totalDays || Math.abs(roundedDays - totalDays) < 0.3) {
      return `${roundedDays} days`;
    } else {
      const lowerBound = Math.floor(totalDays);
      const upperBound = Math.ceil(totalDays);
      return `${lowerBound}-${upperBound} days`;
    }
  };

  const downloadItinerary = () => {
    if (itineraryItems.length === 0) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('JAPAN TRIP ITINERARY', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Generated by Japan Starter', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // Summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Trip Summary:', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total attractions: ${itineraryItems.length}`, margin, yPosition);
    yPosition += 6;

    const estimatedLength = estimateTripLength();
    if (estimatedLength) {
      doc.text(`Estimated trip length: ${estimatedLength}`, margin, yPosition);
      yPosition += 6;
    }
    doc.text(`Cities to visit: ${[...new Set(itineraryItems.map(item => item.city))].join(', ')}`, margin, yPosition);
    yPosition += 6;
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 20;

    // Attractions
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Attractions by City:', margin, yPosition);
    yPosition += 15;

    // Group items by city preserving first-seen order
    const cityOrder: string[] = [];
    const grouped: Record<string, typeof itineraryItems> = {};
    itineraryItems.forEach(item => {
      if (!grouped[item.city]) {
        grouped[item.city] = [];
        cityOrder.push(item.city);
      }
      grouped[item.city].push(item);
    });

    cityOrder.forEach((city) => {
      // Page break if near bottom before new city header
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = margin;
      }

      // City heading
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 30, 30);
      doc.text(city.toUpperCase(), margin, yPosition);
      yPosition += 10;

      grouped[city].forEach((item, idx) => {
        if (yPosition > pageHeight - 70) {
          doc.addPage();
          yPosition = margin;
        }

        // Attraction title within city
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        const titleText = `${idx + 1}. ${item.name}`;
        doc.text(titleText, margin, yPosition);
        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0,0,0);
        doc.text(`Location: ${item.city}`, margin + 5, yPosition);
        yPosition += 6;

        doc.text(`Categories: ${item.category.join(', ')}`, margin + 5, yPosition);
        yPosition += 6;

        const descriptionLines = doc.splitTextToSize(item.description, pageWidth - margin * 2 - 10);
        doc.text(descriptionLines, margin + 5, yPosition);
        yPosition += descriptionLines.length * 5 + 3;

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 100, 200);
        const mapsUrl = generateGoogleMapsUrl(item.name, item.city);
        doc.textWithLink('View on Google Maps', margin + 5, yPosition, { url: mapsUrl });
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        yPosition += 12;

        // Divider between attractions (not after last in city)
        if (idx < grouped[city].length - 1) {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = margin;
          }
          yPosition += 3;
          doc.setDrawColor(200, 200, 200);
          doc.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += 8;
        }
      });

      // Extra spacing & subtle line between cities (not after last city)
      if (city !== cityOrder[cityOrder.length - 1]) {
        if (yPosition > pageHeight - 40) {
          doc.addPage();
          yPosition = margin;
        }
        doc.setDrawColor(150, 150, 150);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 14;
      }
    });

    if (yPosition > pageHeight - 50) {
      doc.addPage();
      yPosition = pageHeight - 30;
    } else {
      yPosition = pageHeight - 30;
    }
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('Visit japan-starter.vercel.app for more travel planning!', pageWidth / 2, yPosition, { align: 'center' });
    doc.save('japan-trip-itinerary.pdf');
  };

  return (
    <section
      id={variant === 'default' ? 'itinerary' : undefined}
      className={variant === 'default' ? 'container mx-auto px-4 py-16' : 'mt-6'}
    >
      <div className={variant === 'default' ? 'bg-white rounded-xl shadow-lg p-8' : 'bg-white rounded-xl shadow-lg p-6'}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={variant === 'default' ? 'text-3xl font-bold text-gray-800' : 'text-xl xl:text-2xl font-bold text-gray-800'}>
            Your Japan Itinerary
          </h2>
          {itineraryItems.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={downloadItinerary}
                className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden sm:inline">Download </span>PDF
              </button>
              <button
                onClick={clearItinerary}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {itineraryItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Click &quot;Add to Trip&quot; on any attraction above to start building your personalized Japan itinerary. 
              Once you&apos;ve added some places, you&apos;ll be able to download your trip plan as a PDF with Google Maps links!
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500">
                Your itinerary is empty. Start exploring cities above to add attractions!
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-gray-600">
                  You&apos;ve added {itineraryItems.length} attraction{itineraryItems.length !== 1 ? 's' : ''} to your trip!
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-blue-600 font-medium">
                    Estimated trip length: {estimateTripLength()}
                  </span>
                </div>
              </div>
            </div>
            {/* Always compact layout now */}
            <div className="grid gap-3 md:grid-cols-2">
              {itineraryItems.map((item, index) => (
                <div key={item.id} className="bg-gray-50 rounded-lg border p-3 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-800 truncate">#{index + 1} {item.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <span>📍</span>{item.city}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromItinerary(item.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 h-6 w-6 flex items-center justify-center rounded transition-colors shrink-0"
                    title="Remove"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <ItineraryProvider>
      <div className="min-h-screen water-bg">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {/* Japanese Flag */}
                  <div className="w-8 h-6 rounded-sm overflow-hidden shadow-sm border border-gray-200">
                    <div className="w-full h-full bg-white flex items-center justify-center">
                      <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                    Japan Starter Map
                  </div>
                </div>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#map" className="text-gray-600 hover:text-red-500 font-medium transition-colors">Explore Destinations</a>
                <a href="#itinerary" className="text-gray-600 hover:text-red-500 font-medium transition-colors">My Itinerary</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Japan&apos;s
            <span className="block bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent pb-2">Big Three</span>
          </h1>
          <p className="text-xl text-white mb-4 max-w-2xl mx-auto">
            Explore Japan&apos;s three most iconic destinations: Tokyo&apos;s modern energy, Osaka&apos;s incredible food culture, and Kyoto&apos;s timeless traditions.
          </p>
        </section>

        {/* Interactive Map Section */}
        <section id="map" className="container mx-auto px-4 py-4">
          <JapanMap itinerarySection={<ItinerarySection variant="embedded" />} />
        </section>

        {/* Itinerary Section */}
        <div className="xl:hidden">
          <ItinerarySection />
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 mt-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <h4 className="text-xl font-bold">Japan&apos;s Big Three</h4>
            </div>
            <p className="text-gray-400 mb-6">Discover Japan&apos;s three most iconic travel destinations.</p>
          </div>
        </footer>
      </div>
    </ItineraryProvider>
  );
}
