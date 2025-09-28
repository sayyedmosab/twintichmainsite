import { useState } from 'react';
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

const learningData: { chapters: Chapter[] } = {
  chapters: [
    {
      id: "chapter-1",
      title: "Chapter 1: Introduction to Digital Twins",
      episodes: [
        { 
          id: "1-1", 
          title: "What is an Organizational Transformation?", 
          description: "Learn about organizational transformation as a structural response to strategic ambition that exceeds current institutional capacity.",
          hasContent: true
        },
        { 
          id: "1-2", 
          title: "The History of Digital Twins", 
          description: "Explore the fascinating origins and evolution of digital twins, from NASA's space missions to modern manufacturing.",
          hasContent: true
        },
        { 
          id: "1-3", 
          title: "Key Components", 
          description: "Learn about the essential elements that make up a functional and effective digital twin system.",
          hasContent: true
        },
        { 
          id: "1-4", 
          title: "Benefits and Use Cases", 
          description: "Discover the real-world advantages and applications of digital twins across various sectors and industries.",
          hasContent: true
        }
      ]
    },
    {
      id: "chapter-2",
      title: "Chapter 2: Building a Digital Twin",
      episodes: [
        { 
          id: "2-1", 
          title: "Data Acquisition", 
          description: "Dive into the advanced methods and IoT sensors used to gather real-time data from physical assets.",
          hasContent: true
        },
        { 
          id: "2-2", 
          title: "Modeling and Simulation", 
          description: "Master the sophisticated techniques for creating accurate virtual models and running predictive simulations.",
          hasContent: true
        },
        { 
          id: "2-3", 
          title: "Integration with IoT", 
          description: "Understand how the Internet of Things (IoT) provides the critical data pipeline for seamless connectivity.",
          hasContent: true
        },
        { 
          id: "2-4", 
          title: "Visualization Techniques", 
          description: "Explore cutting-edge methods to visualize complex digital twin data for actionable business insights.",
          hasContent: true
        }
      ]
    },
    {
      id: "chapter-3",
      title: "Chapter 3: Advanced Applications",
      episodes: [
        { 
          id: "3-1", 
          title: "Predictive Maintenance", 
          description: "Learn how digital twins enable proactive maintenance strategies that reduce downtime and costs.",
          hasContent: true
        },
        { 
          id: "3-2", 
          title: "Smart Manufacturing", 
          description: "Discover how digital twins are transforming production lines and enabling Industry 4.0 initiatives.",
          hasContent: true
        },
        { 
          id: "3-3", 
          title: "Supply Chain Optimization", 
          description: "Explore how digital twins provide end-to-end visibility and optimization across complex supply networks.",
          hasContent: true
        },
        { 
          id: "3-4", 
          title: "Future Trends", 
          description: "Stay ahead of the curve with emerging trends and future possibilities in digital twin technology.",
          hasContent: true
        }
      ]
    },
    {
      id: "chapter-4",
      title: "Chapter 4: Implementation and Best Practices",
      episodes: [
        { 
          id: "4-1", 
          title: "Project Planning and Strategy", 
          description: "Learn essential planning strategies for successful digital twin implementation projects.",
          hasContent: true
        },
        { 
          id: "4-2", 
          title: "Technology Stack Selection", 
          description: "Understand how to choose the right tools and technologies for your digital twin solution.",
          hasContent: true
        },
        { 
          id: "4-3", 
          title: "Common Challenges and Solutions", 
          description: "Navigate typical implementation challenges with proven strategies and best practices.",
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
    console.log('🔵 TwinScienceLearningHub - handleContentSelect called:', { chapterId, episodeId, contentType });
    const chapter = learningData.chapters.find(c => c.id === chapterId);
    const episode = chapter?.episodes.find(e => e.id === episodeId);
    
    console.log('🔵 TwinScienceLearningHub - found chapter:', chapter?.title);
    console.log('🔵 TwinScienceLearningHub - found episode:', episode?.title);
    
    if (episode) {
      console.log('🔵 TwinScienceLearningHub - setting modal state to open');
      setModalState({
        isOpen: true,
        episode,
        contentType
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
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-blue-800 bg-clip-text text-transparent" style={{fontFamily: "'Calibri', 'Arial', sans-serif"}}>
            TwinScience Learning Hub
          </h1>
          <p className="text-xl text-blue-800 max-w-3xl mx-auto leading-relaxed" style={{fontFamily: "'Calibri', 'Arial', sans-serif"}}>
            Master the cutting-edge world of Digital Twin technology through interactive learning experiences. 
            Explore comprehensive modules designed for the future of intelligent systems.
          </p>
        </div>

        <div className="space-y-16">
          {learningData.chapters.map((chapter) => (
            <section key={chapter.id} className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-blue-900 mb-4 relative inline-block" style={{fontFamily: "'Calibri', 'Arial', sans-serif"}}>
                  {chapter.title}
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-700 to-blue-900"></div>
                </h2>
                <p className="text-blue-700 max-w-2xl" style={{fontFamily: "'Calibri', 'Arial', sans-serif"}}>
                  Master the fundamentals and explore practical applications through our interactive learning modules.
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