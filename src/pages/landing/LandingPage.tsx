import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LandingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'AI Twin Tech';
  }, []);

  const { i18n } = useTranslation();

  return (
    <div style={{ backgroundColor: '#f0f8ff' }} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative w-full bg-blue-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Welcome to AI Twin Tech
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover the future of digital transformation
            </p>
            
            {/* Hero Video Placeholder */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl mb-8 bg-gray-800 flex items-center justify-center">
              <div className="text-gray-400">
                <p>Hero Video Placeholder</p>
                <p className="text-sm">(Video will be added here)</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-8 py-3 bg-electric-blue-400 text-blue-900 font-semibold rounded-lg hover:bg-opacity-90 transition-all">
                Explore
              </button>
              <button className="px-8 py-3 border-2 border-electric-blue-400 text-white font-semibold rounded-lg hover:bg-electric-blue-400 hover:text-blue-900 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Messaging Rows Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-32">
        <div className="grid gap-12">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="bg-blue-100 rounded-lg aspect-square flex items-center justify-center text-gray-400">
              Content Area 1
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Feature One
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Add your messaging content here
              </p>
              <button className="px-6 py-2 text-electric-blue-400 font-semibold hover:underline">
                Learn More →
              </button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Feature Two
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Add your messaging content here
              </p>
              <button className="px-6 py-2 text-electric-blue-400 font-semibold hover:underline">
                Learn More →
              </button>
            </div>
            <div className="order-1 lg:order-2 bg-blue-100 rounded-lg aspect-square flex items-center justify-center text-gray-400">
              Content Area 2
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="bg-blue-100 rounded-lg aspect-square flex items-center justify-center text-gray-400">
              Content Area 3
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Feature Three
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Add your messaging content here
              </p>
              <button className="px-6 py-2 text-electric-blue-400 font-semibold hover:underline">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join us on this transformative journey
          </p>
          <button className="px-8 py-3 bg-electric-blue-400 text-blue-900 font-semibold rounded-lg hover:bg-opacity-90 transition-all">
            Get Involved
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
