import { useState } from 'react';
import { X } from 'lucide-react';
import { ArticleContent } from './content/ArticleContent';
import { PodcastContent } from './content/PodcastContent';
import { VideoContent } from './content/VideoContent';
import { StudyGuideContent } from './content/StudyGuideContent';
import documentIcon from 'figma:asset/b359489b0f3c782aecf984af93b2162e3dd420ea.png';
import microphoneIcon from 'figma:asset/914128a845781b950904a129e16aba74567d83b1.png';
import studyGuideIcon from 'figma:asset/cc2e9938961f1ab1e50787550bbc713943b17718.png';

interface Episode {
  id: string;
  title: string;
  description: string;
}

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  episode: Episode | null;
  initialContentType: string;
}

const contentTypes = [
  { 
    type: 'Article', 
    icon: '/icons/wiki.png',
    color: 'bg-blue-900 text-white border-blue-900'
  },
  { 
    type: 'Podcast', 
    icon: '/icons/mic.png',
    color: 'bg-blue-900 text-white border-blue-900'
  },
  { 
    type: 'Video', 
    icon: '/icons/vid.png',
    color: 'bg-blue-900 text-white border-blue-900'
  },
  { 
    type: 'Study Guide', 
    icon: '/icons/study.png',
    color: 'bg-blue-900 text-white border-blue-900'
  }
];

export function ContentModal({ isOpen, onClose, episode, initialContentType }: ContentModalProps) {
  const [activeContentType, setActiveContentType] = useState(initialContentType);

  if (!isOpen || !episode) return null;

  const renderContent = () => {
    switch (activeContentType) {
      case 'Article':
        return <ArticleContent episode={episode} />;
      case 'Podcast':
        return <PodcastContent episode={episode} />;
      case 'Video':
        return <VideoContent episode={episode} />;
      case 'Study Guide':
        return <StudyGuideContent episode={episode} />;
      default:
        return <ArticleContent episode={episode} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-100 w-full h-full max-w-7xl max-h-[90vh] flex flex-col shadow-2xl transform transition-all duration-300 overflow-hidden border-2 border-gray-300">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 bg-white shadow-lg border-b-2 border-gray-300">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 flex items-center justify-center">
              <span className="text-white font-bold text-sm">TT</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{episode.title}</h3>
              <p className="text-sm text-gray-600">{activeContentType}</p>
            </div>
          </div>
          
          {/* Content Type Navigation */}
          <div className="flex gap-2">
            {contentTypes.map((contentType) => (
              <button
                key={contentType.type}
                onClick={() => setActiveContentType(contentType.type)}
                className={`p-3 border-2 transition-all duration-200 ${
                  activeContentType === contentType.type 
                    ? contentType.color 
                    : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                }`}
                title={contentType.type}
              >
                <div className="w-6 h-6 bg-white flex items-center justify-center overflow-hidden">
                  <img 
                    src={contentType.icon}
                    alt={contentType.type}
                    className="w-4 h-4 object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
          
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-200 p-2 hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-grow overflow-hidden bg-gray-50">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}