import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EpisodeCard } from './components/EpisodeCard';
import { ContentModal } from './ContentModal';

// Export types for external use
export interface Episode {
  id: string;
  title: string;
  description: string;
  hasContent?: boolean;
  contentAvailability?: {
    article: boolean;
    podcast: boolean;
    video: boolean;
    studyGuide: boolean;
  };
}

export interface Chapter {
  id: string;
  title: string;
  episodes: Episode[];
}



const getLearningData = (t: any): { chapters: Chapter[] } => ({
  chapters: [
    {
      id: "chapter-1",
      title: t('twinScience.chapters.chapter1.title'),
      episodes: [
        {
          id: "1-1",
          title: t('twinScience.chapters.chapter1.episodes.1-1.title'),
          description: t('twinScience.chapters.chapter1.episodes.1-1.description'),
          hasContent: true,
          contentAvailability: {
            article: true,
            podcast: true,
            video: true,
            studyGuide: true
          }
        },
        {
          id: "1-2",
          title: t('twinScience.chapters.chapter1.episodes.1-2.title'),
          description: t('twinScience.chapters.chapter1.episodes.1-2.description'),
          hasContent: true,
          contentAvailability: {
            article: true,
            podcast: false,
            video: false,
            studyGuide: false
          }
        },
        {
          id: "1-3",
          title: t('twinScience.chapters.chapter1.episodes.1-3.title'),
          description: t('twinScience.chapters.chapter1.episodes.1-3.description'),
          hasContent: true,
          contentAvailability: {
            article: true,
            podcast: false,
            video: false,
            studyGuide: false
          }
        },
        {
          id: "1-4",
          title: t('twinScience.chapters.chapter1.episodes.1-4.title'),
          description: t('twinScience.chapters.chapter1.episodes.1-4.description'),
          hasContent: true,
          contentAvailability: {
            article: true,
            podcast: false,
            video: false,
            studyGuide: false
          }
        }
      ]
    },
    {
      id: "chapter-2",
      title: t('twinScience.chapters.chapter2.title'),
      episodes: [
        {
          id: "2-1",
          title: t('twinScience.chapters.chapter2.episodes.2-1.title'),
          description: t('twinScience.chapters.chapter2.episodes.2-1.description'),
          hasContent: true
        },
        {
          id: "2-2",
          title: t('twinScience.chapters.chapter2.episodes.2-2.title'),
          description: t('twinScience.chapters.chapter2.episodes.2-2.description'),
          hasContent: true
        },
        {
          id: "2-3",
          title: t('twinScience.chapters.chapter2.episodes.2-3.title'),
          description: t('twinScience.chapters.chapter2.episodes.2-3.description'),
          hasContent: true
        },
        {
          id: "2-4",
          title: t('twinScience.chapters.chapter2.episodes.2-4.title'),
          description: t('twinScience.chapters.chapter2.episodes.2-4.description'),
          hasContent: true
        }
      ]
    },
    {
      id: "chapter-3",
      title: t('twinScience.chapters.chapter3.title'),
      episodes: [
        {
          id: "3-1",
          title: t('twinScience.chapters.chapter3.episodes.3-1.title'),
          description: t('twinScience.chapters.chapter3.episodes.3-1.description'),
          hasContent: true
        },
        {
          id: "3-2",
          title: t('twinScience.chapters.chapter3.episodes.3-2.title'),
          description: t('twinScience.chapters.chapter3.episodes.3-2.description'),
          hasContent: true
        },
        {
          id: "3-3",
          title: t('twinScience.chapters.chapter3.episodes.3-3.title'),
          description: t('twinScience.chapters.chapter3.episodes.3-3.description'),
          hasContent: true
        },
        {
          id: "3-4",
          title: t('twinScience.chapters.chapter3.episodes.3-4.title'),
          description: t('twinScience.chapters.chapter3.episodes.3-4.description'),
          hasContent: true
        }
      ]
    },
    {
      id: "chapter-4",
      title: t('twinScience.chapters.chapter4.title'),
      episodes: [
        {
          id: "4-1",
          title: t('twinScience.chapters.chapter4.episodes.4-1.title'),
          description: t('twinScience.chapters.chapter4.episodes.4-1.description'),
          hasContent: true
        },
        {
          id: "4-2",
          title: t('twinScience.chapters.chapter4.episodes.4-2.title'),
          description: t('twinScience.chapters.chapter4.episodes.4-2.description'),
          hasContent: true
        },
        {
          id: "4-3",
          title: t('twinScience.chapters.chapter4.episodes.4-3.title'),
          description: t('twinScience.chapters.chapter4.episodes.4-3.description'),
          hasContent: true
        },
        {
          id: "4-4",
          title: "Measuring Success",
          description: "Establish key performance indicators and metrics to evaluate your transformation implementation success.",
          hasContent: false
        }
      ]
    }
  ]
});

export function TwinScienceLearningHub() {
  const { t, i18n } = useTranslation();
  const learningData = useMemo(() => getLearningData(t), [t]);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    episode: Episode | null;
    contentType: string;
  }>({
    isOpen: false,
    episode: null,
    contentType: 'Article'
  });

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      console.log('🔄 TwinScience: Language changed to:', lng);
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Debug logging
  console.log('🎯 TwinScience rendering with language:', currentLanguage);
  console.log('🎯 Current title:', t('twinScience.title'));

  const handleContentSelect = (chapterId: string, episodeId: string, contentType: string) => {
    console.log('🔵 TwinScienceLearningHub (App.tsx) - handleContentSelect called:', { chapterId, episodeId, contentType });
    const chapter = learningData.chapters.find(c => c.id === chapterId);
    const episode = chapter?.episodes.find(e => e.id === episodeId);
    
    console.log('🔵 TwinScienceLearningHub (App.tsx) - found chapter:', chapter?.title);
    console.log('🔵 TwinScienceLearningHub (App.tsx) - found episode:', episode?.title);
    
    // Map short content type names to full content type names used by ContentModal
    const contentTypeMap: { [key: string]: string } = {
      'Article': t('twinScience.contentTypes.article'),
      'Podcast': t('twinScience.contentTypes.podcast'),
      'Video': t('twinScience.contentTypes.video'),
      'Study Guide': t('twinScience.contentTypes.studyGuide')
    };

    // Get the full translated content type name
    const fullContentType = contentTypeMap[contentType] || contentTypeMap['Article'];
    
    const mappedContentType = contentTypeMap[contentType] || contentTypeMap['Article'];
    
    if (episode) {
      console.log('🔵 TwinScienceLearningHub (App.tsx) - setting modal state to open with contentType:', fullContentType);
      setModalState({
        isOpen: true,
        episode,
        contentType: fullContentType
      });
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      episode: null,
      contentType: 'Article'
    });
  };

  return (
  <div className={`twin-science-learning-hub min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-blue-800 bg-clip-text text-transparent">
            {t('twinScience.title')}
          </h1>
          <p className="text-xl text-blue-800 max-w-3xl mx-auto leading-relaxed">
            {t('twinScience.subtitle')}
          </p>
        </div>

        <div className="space-y-16">
          {learningData.chapters.map((chapter) => (
            <section key={chapter.id} className="space-y-8">
              <div className={`text-center lg:${isRTL ? 'text-right' : 'text-left'}`}>
                <h2 className={`text-3xl font-bold text-gray-900 mb-4 relative inline-block ${isRTL ? 'text-right' : 'text-left'}`} style={{fontWeight: 'bold'}}>
                  {chapter.title}
                  <div className={`absolute -bottom-2 ${isRTL ? 'right-0' : 'left-0'} w-full h-1`} style={{backgroundColor: '#1e3a8a'}}></div>
                </h2>
                <p className={`text-gray-600 max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('twinScience.sectionDescription')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {chapter.episodes.map((episode) => (
                  <EpisodeCard
                    key={episode.id}
                    episode={episode}
                    chapterId={chapter.id}
                    onContentSelect={handleContentSelect}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

      <ContentModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        episode={modalState.episode}
        initialContentType={modalState.contentType}
      />
      </div>
    </div>
  );
}

// Default export for backwards compatibility
export default TwinScienceLearningHub;