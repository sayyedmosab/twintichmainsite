import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EpisodeCard } from './EpisodeCard';
import { ContentModal } from './ContentModal';

// Export types for external use
export interface Episode {
  id: string;
  title: string;
  description: string;
  hasContent?: boolean;
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
          hasContent: true
        },
        {
          id: "1-2",
          title: t('twinScience.chapters.chapter1.episodes.1-2.title'),
          description: t('twinScience.chapters.chapter1.episodes.1-2.description'),
          hasContent: true
        },
        {
          id: "1-3",
          title: t('twinScience.chapters.chapter1.episodes.1-3.title'),
          description: t('twinScience.chapters.chapter1.episodes.1-3.description'),
          hasContent: true
        },
        {
          id: "1-4",
          title: t('twinScience.chapters.chapter1.episodes.1-4.title'),
          description: t('twinScience.chapters.chapter1.episodes.1-4.description'),
          hasContent: true
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
          hasContent: false
        }
      ]
    }
  ]
});

export function TwinScienceLearningHub() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const learningData = getLearningData(t);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      console.log('🔄 TwinScience: Language changed to:', lng);
      console.log('🔄 TwinScience: Title translation:', t('twinScience.title'));
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

  // Re-calculate data when language changes
  const updatedLearningData = useMemo(() => getLearningData(t), [t, currentLanguage]);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    episode: Episode | null;
    contentType: string;
  }>({
    isOpen: false,
    episode: null,
    contentType: 'Article'
  });

  const handleContentSelect = (chapterId: string, episodeId: string, contentType: string) => {
    console.log('🔵 TwinScienceLearningHub - handleContentSelect called:', { chapterId, episodeId, contentType });
    console.log('🔵 Current language:', currentLanguage);
    console.log('🔵 Title translation:', t('twinScience.title'));
    const chapter = updatedLearningData.chapters.find(c => c.id === chapterId);
    const episode = chapter?.episodes.find(e => e.id === episodeId);
    
    console.log('🔵 TwinScienceLearningHub - found chapter:', chapter?.title);
    console.log('🔵 TwinScienceLearningHub - found episode:', episode?.title);
    
    // Map short content type names to full content type names used by ContentModal
    const contentTypeMap: { [key: string]: string } = {
      'Article': t('twinScience.contentTypes.article'),
      'Podcast': t('twinScience.contentTypes.podcast'),
      'Video': t('twinScience.contentTypes.video'),
      'Study Guide': t('twinScience.contentTypes.studyGuide')
    };
    
    const mappedContentType = contentTypeMap[contentType] || contentTypeMap['Article'];
    
    if (episode) {
      console.log('🔵 TwinScienceLearningHub - setting modal state to open with contentType:', mappedContentType);
      setModalState({
        isOpen: true,
        episode,
        contentType: mappedContentType
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
    <div className="twin-science-learning-hub min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-blue-800 bg-clip-text text-transparent">
            {t('twinScience.title')}
          </h1>
          <p className="text-xl text-blue-800 max-w-3xl mx-auto leading-relaxed">
            {t('twinScience.subtitle')}
          </p>
        </div>

        <div className="space-y-16">
          {updatedLearningData.chapters.map((chapter) => (
            <section key={chapter.id} className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-blue-900 mb-4 relative inline-block">
                  {chapter.title}
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-700 to-blue-900"></div>
                </h2>
                <p className="text-blue-700 max-w-2xl">
                  {t('twinScience.sectionDescription')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

export default TwinScienceLearningHub;