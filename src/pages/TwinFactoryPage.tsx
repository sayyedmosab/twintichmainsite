import React from 'react';
import { useTranslation } from 'react-i18next';

const TwinFactoryPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="standardized-title text-gray-900 mb-8">
            {t('pages.twinFactory.title')}
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-blue-600 mb-12 font-light">
            {t('pages.twinFactory.subtitle')}
          </h2>
          
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-semibold mb-12 shadow-lg">
            {t('pages.twinFactory.comingSoon')}
          </div>
          
          <div className="text-lg text-gray-700 leading-relaxed space-y-6 max-w-2xl mx-auto">
            <p>{t('pages.twinFactory.description1')}</p>
            <p>{t('pages.twinFactory.description2')}</p>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white backdrop-blur-sm rounded-lg p-6 border border-gray-200 shadow-lg">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('pages.twinFactory.feature1Title')}
              </h3>
              <p className="text-gray-700">
                {t('pages.twinFactory.feature1Description')}
              </p>
            </div>
            
            <div className="bg-white backdrop-blur-sm rounded-lg p-6 border border-gray-200 shadow-lg">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('pages.twinFactory.feature2Title')}
              </h3>
              <p className="text-gray-700">
                {t('pages.twinFactory.feature2Description')}
              </p>
            </div>
            
            <div className="bg-white backdrop-blur-sm rounded-lg p-6 border border-gray-200 shadow-lg">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('pages.twinFactory.feature3Title')}
              </h3>
              <p className="text-gray-700">
                {t('pages.twinFactory.feature3Description')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TwinFactoryPage;