export const metadata = {
  title: 'FAQ | Japan Starter',
  description: 'Frequently asked questions about planning your first trip to Japan.'
};

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Frequently Asked Questions</h1>
      <div className="space-y-8 max-w-3xl">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">What is Japan Starter?</h2>
          <p className="text-gray-600 mt-2">Japan Starter helps first-time visitors discover top attractions in Tokyo, Osaka, and Kyoto and build a simple personalized itinerary.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">How do I build an itinerary?</h2>
          <p className="text-gray-600 mt-2">Click a city on the map, review the attractions, and press &quot;Add to Trip&quot;. Your selections appear in the itinerary panel where you can download a PDF.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Can I reorder items?</h2>
          <p className="text-gray-600 mt-2">Reordering isn&apos;t available yet. Remove and re-add items to adjust grouping for now.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Are there more cities coming?</h2>
          <p className="text-gray-600 mt-2">Yes—future updates aim to add additional major destinations and trip planning features.</p>
        </div>
      </div>
    </main>
  );
}
