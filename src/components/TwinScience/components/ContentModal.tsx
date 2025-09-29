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
          <div className="flex flex-col justify-center min-w-[220px] max-w-[320px]">
            {/* Main Title (h2) and Subtitle (h4) based on active tab */}
            {activeContentType === 'Article' && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">Wiki Article</h2>
                <h4 className="text-sm text-gray-600 font-normal mt-1">Explore the full written guide and key concepts for this episode.</h4>
              </>
            )}
            {activeContentType === 'Podcast' && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">Audio Podcast</h2>
                <h4 className="text-sm text-gray-600 font-normal mt-1">Listen to the expert discussion and insights for this topic.</h4>
              </>
            )}
            {activeContentType === 'Video' && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">Video Lesson</h2>
                <h4 className="text-sm text-gray-600 font-normal mt-1">Watch the visual walkthrough and demonstrations.</h4>
              </>
            )}
            {activeContentType === 'Study Guide' && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">Study Guide</h2>
                <h4 className="text-sm text-gray-600 font-normal mt-1">Review the summary and key takeaways for revision.</h4>
              </>
            )}
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