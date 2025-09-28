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
    icon: documentIcon,
    color: 'bg-blue-200 text-blue-800 border-blue-300'
  },
  { 
    type: 'Podcast', 
    icon: microphoneIcon,
    color: 'bg-purple-200 text-purple-800 border-purple-300'
  },
  { 
    type: 'Video', 
    icon: 'https://images.unsplash.com/photo-1612548403247-aa2873e9422d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGNhbWVyYXxlbnwxfHx8fDE3NTg5MjAwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'bg-red-200 text-red-800 border-red-300'
  },
  { 
    type: 'Study Guide', 
    icon: studyGuideIcon,
    color: 'bg-green-200 text-green-800 border-green-300'
  }
];

export function ContentModal({ isOpen, onClose, episode, initialContentType }: ContentModalProps) {
  const [activeContentType, setActiveContentType] = useState(initialContentType);

  console.log('🟢 ContentModal - rendered with props:', { isOpen, episode: episode?.id, initialContentType });

  if (!isOpen || !episode) {
    console.log('🟢 ContentModal - not rendering (isOpen:', isOpen, ', episode:', !!episode, ')');
    return null;
  }

  const renderContent = () => {
    console.log('🟢 ContentModal - renderContent called with activeContentType:', activeContentType);
    switch (activeContentType) {
      case 'Article':
        console.log('🟢 ContentModal - returning ArticleContent component');
        return <ArticleContent episode={episode} />;
      case 'Podcast':
        console.log('🟢 ContentModal - returning PodcastContent component');
        return <PodcastContent episode={episode} />;
      case 'Video':
        console.log('🟢 ContentModal - returning VideoContent component');
        return <VideoContent episode={episode} />;
      case 'Study Guide':
        console.log('🟢 ContentModal - returning StudyGuideContent component');
        return <StudyGuideContent episode={episode} />;
      default:
        console.log('🟢 ContentModal - returning default ArticleContent component');
        return <ArticleContent episode={episode} />;
    }
  };

  console.log('🟢 ContentModal - About to render JSX, episode:', episode?.title);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-100 w-full h-full max-w-7xl max-h-[90vh] flex flex-col shadow-2xl transform transition-all duration-300 overflow-hidden border-2 border-gray-300" style={{fontFamily: 'Calibri, Arial, sans-serif'}}>
        
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
                onClick={() => {
                  console.log('🟢 ContentModal - content type changed to:', contentType.type);
                  setActiveContentType(contentType.type);
                }}
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
            onClick={() => {
              console.log('🟢 ContentModal - close button clicked');
              onClose();
            }}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-200 p-2 hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-grow overflow-hidden bg-gray-50">
          {(() => {
            console.log('🟢 ContentModal - About to render content, calling renderContent()');
            return renderContent();
          })()}
        </div>
      </div>
    </div>
  );
}