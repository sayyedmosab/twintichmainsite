import { useState } from 'react';
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



const learningData: { chapters: Chapter[] } = {
  chapters: [
    {
      id: "chapter-1",
      title: "Chapter 1: Introduction to Transformations",
      episodes: [
        { 
          id: "1-1", 
          title: "What is an Organizational Transformation?", 
          description: "The anatomy of organizations and understanding when transformation becomes necessary for strategic ambitions.",
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
          title: "What is a Sector Transformation?", 
          description: "Understanding sector value chains and how government policies reshape entire industries.",
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
          title: "The People Transformation", 
          description: "Why people transformation is pivotal - managing Old Guard and New Pioneers in complex change.",
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
          title: "The Entangled Transformation", 
          description: "How organizational, sector, and people transformations are woven together in complex change.",
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
      title: "Chapter 2: Architecture & Design",
      episodes: [
        { 
          id: "2-1", 
          title: "Strategic Performance (KPIs)", 
          description: "Translating macro ambitions into measurable, manageable achievements that aggregate using real Saudi Arabia indicators.",
          hasContent: true
        },
        { 
          id: "2-2", 
          title: "Portfolios & Initiatives", 
          description: "Master sophisticated techniques for organizing and managing transformation portfolios and strategic initiatives.",
          hasContent: true
        },
        { 
          id: "2-3", 
          title: "Process Architecture", 
          description: "Understanding how process architecture provides the critical foundation for systematic transformation.",
          hasContent: true
        },
        { 
          id: "2-4", 
          title: "Organizational Design", 
          description: "Explore organizational design principles for creating structures that enable transformation success.",
          hasContent: true
        }
      ]
    },
    {
      id: "chapter-3",
      title: "Chapter 3: Implementation & Governance",
      episodes: [
        { 
          id: "3-1", 
          title: "The Integrated Governance", 
          description: "Learn how integrated governance enables coordinated transformation across complex organizational ecosystems.",
          hasContent: true
        },
        { 
          id: "3-2", 
          title: "The Delivery Engine", 
          description: "Discover how to build and operate the delivery engine that transforms strategic vision into operational reality.",
          hasContent: true
        },
        { 
          id: "3-3", 
          title: "Change Architecture", 
          description: "Explore the architecture of change that provides structure and coordination for complex transformation programs.",
          hasContent: true
        },
        { 
          id: "3-4", 
          title: "The Enablers", 
          description: "Understand the critical enablers that support and accelerate transformation success across all organizational levels.",
          hasContent: true
        }
      ]
    },
    {
      id: "chapter-4",
      title: "Chapter 4: 90-Day Implementation Sprints",
      episodes: [
        { 
          id: "4-1", 
          title: "Day 1-15: Diagnose Your Starting Point", 
          description: "Use the Public Sector Complexity Index to analyze your portfolio and identify critical objectives for your transformation sprint.",
          hasContent: true
        },
        { 
          id: "4-2", 
          title: "Day 16-60: Architect Your First Golden Thread", 
          description: "Build complete L0-L3 cascade using Entity-Relationship Diagrams, define KPIs, map processes, and assign owners.",
          hasContent: true
        },
        { 
          id: "4-3", 
          title: "Day 61-90: Launch Your First Integrated Governance Forum", 
          description: "Stand up monthly integrated reviews with GenAI-powered data presentation to demonstrate immediate transformation value.",
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
};

export function TwinScienceLearningHub() {
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
    console.log('🔵 TwinScienceLearningHub (App.tsx) - handleContentSelect called:', { chapterId, episodeId, contentType });
    const chapter = learningData.chapters.find(c => c.id === chapterId);
    const episode = chapter?.episodes.find(e => e.id === episodeId);
    
    console.log('🔵 TwinScienceLearningHub (App.tsx) - found chapter:', chapter?.title);
    console.log('🔵 TwinScienceLearningHub (App.tsx) - found episode:', episode?.title);
    
    // Map short content type names to full content type names used by ContentModal
    const contentTypeMap: { [key: string]: string } = {
      'Article': 'Wiki-Article - Beyond pushing content, we invite you to shape it',
      'Podcast': 'Audio Podcast - Listen to professional hosts take the Deep Dive',
      'Video': 'Video Presentation - Watch engaging visuals to enhance your learning',
      'Study Guide': 'Study Guide - Enrich your learning with core concepts and exercises'
    };
    
    const mappedContentType = contentTypeMap[contentType] || contentTypeMap['Article'];
    
    if (episode) {
      console.log('🔵 TwinScienceLearningHub (App.tsx) - setting modal state to open with contentType:', mappedContentType);
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
  <div className="twin-science-learning-hub">
      <div className="container mx-auto px-6 py-12">
        <div className="space-y-16">
          {learningData.chapters.map((chapter) => (
            <section key={chapter.id} className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 relative inline-block" style={{fontWeight: 'bold'}}>
                  {chapter.title}
                  <div className="absolute -bottom-2 left-0 w-full h-1" style={{backgroundColor: '#1e3a8a'}}></div>
                </h2>
                <p className="text-gray-600 max-w-2xl">
                  Master the fundamentals and explore practical applications through our interactive learning modules.
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