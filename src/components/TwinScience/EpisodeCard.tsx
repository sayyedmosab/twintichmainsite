import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useContentAvailability } from '../../services/ContentAvailabilityService';

interface Episode {
  id: string;
  title: string;
  description: string;
  hasContent?: boolean;
  availability?: {
    isAvailable: boolean;
    reason?: string;
    requiredProgress?: string[];
  };
}

interface ContentType {
  type: string;
  icon: string;
}

interface EpisodeCardProps {
  episode: Episode;
  chapterId: string;
  onContentSelect: (chapterId: string, episodeId: string, contentType: string) => void;
  userProgress?: string[];
}

const getContentTypes = (t: any): ContentType[] => [
  { type: t('twinScience.contentTypes.article').split(' - ')[0], icon: '/icons/wiki.png' },
  { type: t('twinScience.contentTypes.podcast').split(' - ')[0], icon: '/icons/mic.png' },
  { type: t('twinScience.contentTypes.video').split(' - ')[0], icon: '/icons/vid.png' },
  { type: t('twinScience.contentTypes.studyGuide').split(' - ')[0], icon: '/icons/study.png' }
];

export function EpisodeCard({ episode, chapterId, onContentSelect, userProgress = [] }: EpisodeCardProps) {
  const { t, i18n } = useTranslation();
  const contentTypes = useMemo(() => getContentTypes(t), [t]);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [key, setKey] = useState(0); // Force re-render on language change
  const { checkAvailability } = useContentAvailability();

  useEffect(() => {
    const handleLanguageChange = () => {
      setKey(prev => prev + 1); // Force re-render
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const availability = episode.availability || checkAvailability(episode, userProgress);

  const nextIcon = () => {
    setCurrentIconIndex((prev) => (prev + 1) % contentTypes.length);
  };

  const prevIcon = () => {
    setCurrentIconIndex((prev) => (prev - 1 + contentTypes.length) % contentTypes.length);
  };

  const currentContentType = contentTypes[currentIconIndex];

  return (
    <div 
      className="group relative bg-white border-2 border-blue-300 shadow-lg overflow-hidden h-96 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-600"
      style={{ borderRadius: '0' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`episode-${episode.id}`}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Episode number badge */}
      <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-800 to-blue-900 text-white px-4 py-2 text-sm font-bold shadow-lg z-10" style={{ borderRadius: '0' }}>
        {episode.id.toUpperCase()}
      </div>

      {/* Content container */}
      <div className="relative w-full h-full flex flex-col justify-between p-6 pt-16">
        
        {/* Episode info - always visible with proper spacing */}
        <div className="flex-grow flex flex-col justify-start">
          <h3 className="text-blue-900 font-bold text-xl mb-4 leading-tight group-hover:text-blue-700 transition-colors duration-300" style={{fontFamily: "'Calibri', 'Arial', sans-serif"}}>
            {episode.title}
            {!availability.isAvailable && (
              <span className="block text-xs text-red-600 font-normal mt-2">
                {availability.reason || 'Coming Soon'}
              </span>
            )}
          </h3>
          <p className="text-blue-700 text-sm leading-relaxed group-hover:text-blue-800 transition-colors duration-300" style={{fontFamily: "'Calibri', 'Arial', sans-serif"}}>
            {episode.description}
          </p>
        </div>

        {/* Content type carousel - visible on hover */}
        <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white border-2 border-blue-300 p-6 shadow-xl" style={{ borderRadius: '0' }}>
            <div className="flex items-center justify-between" dir="ltr">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevIcon();
                }}
                className="text-blue-500 hover:text-blue-800 transition-all duration-200 p-2"
                disabled={contentTypes.length <= 1}
              >
<                <ChevronLeft size={28} />
>              </button>
              
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-blue-50 border-2 border-blue-300 flex items-center justify-center shadow-lg" style={{ borderRadius: '0' }}>
                  <img 
                    src={currentContentType.icon}
                    alt={currentContentType.type}
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      // Fallback if icon doesn't load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-blue-900 text-xl font-bold" style={{fontFamily: "'Calibri', 'Arial', sans-serif"}}>
                  {currentContentType.type}
                </span>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextIcon();
                }}
                className="text-blue-500 hover:text-blue-800 transition-all duration-200 p-2"
                disabled={contentTypes.length <= 1}
              >
                <ChevronRight size={28} />
              </button>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onContentSelect(chapterId, episode.id, currentContentType.type);
              }}
              className={`w-full mt-6 py-4 px-6 transition-all duration-200 font-bold shadow-lg text-lg ${
                availability.isAvailable
                  ? 'bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-black text-white'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
              style={{fontFamily: "'Calibri', 'Arial', sans-serif", borderRadius: '0'}}
              disabled={!availability.isAvailable}
            >
              {availability.isAvailable ? `${t('common.open', 'Open')} ${currentContentType.type}` : (availability.reason || t('common.comingSoon', 'Coming Soon'))}
            </button>
            
            {/* Indicator dots */}
            <div className="flex justify-center gap-3 mt-6">
              {contentTypes.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 transition-all duration-200 ${
                    index === currentIconIndex 
                      ? 'bg-blue-800' 
                      : 'bg-blue-400 hover:bg-blue-600'
                  }`}
                  style={{ borderRadius: '0' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}