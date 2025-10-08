import { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { ArticleContent } from './components/content/ArticleContent';
import { PodcastContent } from './components/content/PodcastContent';
import { VideoContent } from './components/content/VideoContent';
import { StudyGuideContent } from './components/content/StudyGuideContent';
import documentIcon from '/icons/wiki.png';
import microphoneIcon from '/icons/mic.png';
import studyGuideIcon from '/icons/study.png';
import videoIcon from '/icons/vid.png';


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

const getContentTypes = (t: any) => [
  {
    type: t('twinScience.contentTypes.article'),
    icon: documentIcon,
    transparent: true
  },
  {
    type: t('twinScience.contentTypes.podcast'),
    icon: microphoneIcon,
  },
  {
    type: t('twinScience.contentTypes.video'),
    icon: videoIcon,
  },
  {
    type: t('twinScience.contentTypes.studyGuide'),
    icon: studyGuideIcon,
  }
];

export function ContentModal({ isOpen, onClose, episode, initialContentType }: ContentModalProps) {
  const { t, i18n } = useTranslation();
  const contentTypes = useMemo(() => getContentTypes(t), [t]);
  const [activeContentType, setActiveContentType] = useState(initialContentType);
  const [key, setKey] = useState(0); // Force re-render on language change
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLanguageChange = () => {
      setKey(prev => prev + 1); // Force re-render
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Update activeContentType when initialContentType changes
  useEffect(() => {
    setActiveContentType(initialContentType);
  }, [initialContentType]);

  if (!isOpen || !episode) {
    return null;
  }

  const renderContent = () => {
    const articleType = t('twinScience.contentTypes.article');
    const podcastType = t('twinScience.contentTypes.podcast');
    const videoType = t('twinScience.contentTypes.video');
    const studyGuideType = t('twinScience.contentTypes.studyGuide');

    switch (activeContentType) {
      case articleType:
        return <ArticleContent episode={episode} />;
      case podcastType:
        return <PodcastContent episode={episode} />;
      case videoType:
        return <VideoContent episode={episode} />;
      case studyGuideType:
        return <StudyGuideContent episode={episode} />;
      default:
        return <ArticleContent episode={episode} />;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="bg-gray-100 w-full h-full max-w-7xl max-h-[90vh] flex flex-col shadow-2xl transform transition-all duration-300 overflow-hidden border-2 border-gray-300"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Modal Header - Flex Row, 3 Columns */}
        <div className="flex flex-row items-stretch px-6 py-3 bg-white shadow-lg border-b-2 border-gray-300 w-full" style={{ minHeight: 90, height: 90 }}>
          {/* Left: Title/Subtitle */}
          <div className="flex flex-col items-start justify-start min-w-[220px] max-w-[440px]">
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-0">
              {activeContentType.split(' - ')[0]}
            </h2>
            <h4 className="text-lg text-  gray-700 font-normal mt-2 mb-3" style={{ lineHeight: '1.2' }}>
              {activeContentType.split(' - ')[1]}
            </h4>
          </div>
          {/* Center: Tabs Bar */}
          <div className="flex items-end justify-center gap-3 flex-1 mt-auto">
            {contentTypes.map((contentType) => (
              <button
                key={contentType.type}
                onClick={() => setActiveContentType(contentType.type)}
                className={`flex flex-row items-center justify-center transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeContentType === contentType.type ? 'bg-blue-50 border-blue-400 shadow scale-110' : 'bg-gray-100 hover:bg-gray-200 border-gray-300'}`}
                style={{ width: 200, height: 80, padding: 0, overflow: 'hidden' }}
                title={contentType.type}
              >
                <img
                  src={contentType.icon}
                  alt={contentType.type}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: 'contain',
                    display: 'block',
                    marginRight: i18n.language === 'en' ? 12 : 12,
                    flexShrink: 0
                  }}
                />
                <span
                  className="font-semibold text-left"
                  style={{
                    whiteSpace: 'nowrap',
                    fontSize: i18n.language === 'en' ? 12: undefined,
                    flexShrink: 1
                  }}
                >
                  {contentType.type.split(' - ')[0]}
                </span>
              </button>
            ))}
          </div>
          {/* Right: X Button */}
          <div className="flex items-end justify-end">
            <button
              onClick={() => onClose()}
              className="ml-8 flex items-center justify-center w-10 h-10 border-2 border-gray-300 bg-white shadow hover:bg-gray-100 hover:border-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ minWidth: 40 }}
              title="Close"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        {/* Modal Body */}
        <div className="flex-grow min-h-0 overflow-hidden bg-gray-50">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}