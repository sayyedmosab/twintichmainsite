import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import documentIcon from 'figma:asset/b359489b0f3c782aecf984af93b2162e3dd420ea.png';
import microphoneIcon from 'figma:asset/914128a845781b950904a129e16aba74567d83b1.png';
import studyGuideIcon from 'figma:asset/cc2e9938961f1ab1e50787550bbc713943b17718.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Episode {
  id: string;
  title: string;
  description: string;
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
  { type: 'Article', icon: documentIcon },
  { type: 'Podcast', icon: microphoneIcon },
  { type: 'Video', icon: 'https://images.unsplash.com/photo-1612548403247-aa2873e9422d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGNhbWVyYXxlbnwxfHx8fDE3NTg5MjAwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { type: 'Study Guide', icon: studyGuideIcon }
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
      className="group relative bg-slate-800 border border-gray-600 shadow-lg overflow-hidden h-80 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-slate-900/90" />
      
      {/* Episode number badge */}
      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-sm font-bold">
        {episode.id.toUpperCase()}
      </div>

      {/* Content container */}
      <div className="relative w-full h-full flex flex-col justify-between p-6">
        
        {/* Episode info - always visible */}
        <div className="flex-grow flex flex-col justify-center">
          <h3 className="text-white font-bold text-lg mb-4 leading-tight">{episode.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{episode.description}</p>
        </div>

        {/* Content type carousel - visible on hover */}
        <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-slate-700 border border-gray-500 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevIcon();
                }}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
                disabled={contentTypes.length <= 1}
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white flex items-center justify-center overflow-hidden">
                  <img 
                    src={currentContentType.icon}
                    alt={currentContentType.type}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-white text-sm font-medium">
                  {currentContentType.type}
                </span>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextIcon();
                }}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
                disabled={contentTypes.length <= 1}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onContentSelect(chapterId, episode.id, currentContentType.type);
              }}
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 transition-colors duration-200 border border-blue-500"
            >
              Open {currentContentType.type}
            </button>
            
            {/* Indicator dots */}
            <div className="flex justify-center gap-1 mt-3">
              {contentTypes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 transition-colors duration-200 ${
                    index === currentIconIndex ? 'bg-blue-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}