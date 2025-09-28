import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Episode {
  id: string;
  title: string;
  description: string;
  hasContent?: boolean;
}

interface ContentType {
  type: string;
  icon: string;
}

interface EpisodeCardProps {
  episode: Episode;
  chapterId: string;
  onContentSelect: (chapterId: string, episodeId: string, contentType: string) => void;
}

const contentTypes: ContentType[] = [
  { type: 'Article', icon: '/icons/wiki.png' },
  { type: 'Podcast', icon: '/icons/mic.png' },
  { type: 'Video', icon: '/icons/vid.png' },
  { type: 'Study Guide', icon: '/icons/study.png' }
];

export function EpisodeCard({ episode, chapterId, onContentSelect }: EpisodeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  const nextIcon = () => {
    setCurrentIconIndex((prev) => (prev + 1) % contentTypes.length);
  };

  const prevIcon = () => {
    setCurrentIconIndex((prev) => (prev - 1 + contentTypes.length) % contentTypes.length);
  };

  const currentContentType = contentTypes[currentIconIndex];

  return (
    <div 
      className={`group relative bg-white border-2 border-gray-300 shadow-lg overflow-hidden h-96 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-900 ${
        !episode.hasContent ? 'opacity-75' : ''
      }`}
      style={{fontFamily: 'Calibri, Arial, sans-serif'}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => episode.hasContent && onContentSelect(chapterId, episode.id, currentContentType.type)}
    >
      {/* Episode number badge */}
      <div className="absolute top-4 left-4 bg-blue-900 text-white px-3 py-1 text-sm font-bold" style={{fontFamily: 'Calibri, Arial, sans-serif', backgroundColor: '#1e3a8a'}}>
        {episode.id.toUpperCase()}
      </div>

      {/* Coming Soon Badge */}
      {!episode.hasContent && (
        <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 text-xs font-bold" style={{fontFamily: 'Calibri, Arial, sans-serif'}}>
          COMING SOON
        </div>
      )}

      {/* Content container */}
      <div className="relative w-full h-full flex flex-col justify-between p-6 pt-20">
        
        {/* Episode info - always visible */}
        <div className="flex-grow flex flex-col justify-center mt-4">
          <h3 className="text-gray-900 font-bold text-lg mb-4 leading-tight" style={{fontFamily: 'Calibri, Arial, sans-serif', fontWeight: 'bold'}}>
            {episode.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed" style={{fontFamily: 'Calibri, Arial, sans-serif'}}>
            {episode.description}
          </p>
        </div>

        {/* Content type carousel - visible on hover */}
        <div className={`transition-all duration-300 ${isHovered && episode.hasContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-gray-100 border-2 border-gray-300 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevIcon();
                }}
                className="text-gray-600 hover:text-blue-900 transition-colors duration-200 p-1"
                disabled={contentTypes.length <= 1 || !episode.hasContent}
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                  <img 
                    src={currentContentType.icon}
                    alt={currentContentType.type}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-gray-900 text-sm font-medium" style={{fontFamily: 'Calibri, Arial, sans-serif'}}>
                  {currentContentType.type}
                </span>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextIcon();
                }}
                className="text-gray-600 hover:text-blue-900 transition-colors duration-200 p-1"
                disabled={contentTypes.length <= 1 || !episode.hasContent}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                episode.hasContent && onContentSelect(chapterId, episode.id, currentContentType.type);
              }}
              className={`w-full mt-3 py-2 transition-colors duration-200 border-2 font-bold ${
                episode.hasContent 
                  ? 'text-white hover:opacity-90 border-blue-900' 
                  : 'bg-gray-400 text-gray-600 border-gray-400 cursor-not-allowed'
              }`}
              disabled={!episode.hasContent}
              style={{
                fontFamily: 'Calibri, Arial, sans-serif',
                fontWeight: 'bold',
                backgroundColor: episode.hasContent ? '#1e3a8a' : undefined
              }}
            >
              {episode.hasContent ? `Open ${currentContentType.type}` : 'Coming Soon'}
            </button>
            
            {/* Indicator dots */}
            <div className="flex justify-center gap-1 mt-3">
              {contentTypes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 transition-colors duration-200`}
                  style={{
                    backgroundColor: index === currentIconIndex ? '#1e3a8a' : '#9ca3af'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}