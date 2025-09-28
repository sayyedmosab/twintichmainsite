import { useState } from 'react';
import { EpisodeCard } from './components/EpisodeCard';
import { ContentModal } from './components/ContentModal';

// Export types for external use
export interface Episode {
  id: string;
  title: string;
  description: string;
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
          title: "What is a Digital Twin?", 
          description: "Understand the core definition and foundational concepts of digital twin technology that's revolutionizing industries worldwide." 
        },
        { 
          id: "1-2", 
          title: "The History of Digital Twins", 
          description: "Explore the fascinating origins and evolution of digital twins, from NASA's space missions to modern manufacturing." 
        },
        { 
          id: "1-3", 
          title: "Key Components", 
          description: "Learn about the essential elements that make up a functional and effective digital twin system." 
        },
        { 
          id: "1-4", 
          title: "Benefits and Use Cases", 
          description: "Discover the real-world advantages and applications of digital twins across various sectors and industries." 
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
          description: "Dive into the advanced methods and IoT sensors used to gather real-time data from physical assets." 
        },
        { 
          id: "2-2", 
          title: "Modeling and Simulation", 
          description: "Master the sophisticated techniques for creating accurate virtual models and running predictive simulations." 
        },
        { 
          id: "2-3", 
          title: "Integration with IoT", 
          description: "Understand how the Internet of Things (IoT) provides the critical data pipeline for seamless connectivity." 
        },
        { 
          id: "2-4", 
          title: "Visualization Techniques", 
          description: "Explore cutting-edge methods to visualize complex digital twin data for actionable business insights." 
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
          description: "Learn how digital twins enable proactive maintenance strategies that reduce downtime and costs." 
        },
        { 
          id: "3-2", 
          title: "Smart Manufacturing", 
          description: "Discover how digital twins are transforming production lines and enabling Industry 4.0 initiatives." 
        },
        { 
          id: "3-3", 
          title: "Supply Chain Optimization", 
          description: "Explore how digital twins provide end-to-end visibility and optimization across complex supply networks." 
        },
        { 
          id: "3-4", 
          title: "Future Trends", 
          description: "Stay ahead of the curve with emerging trends and future possibilities in digital twin technology." 
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
    const chapter = learningData.chapters.find(c => c.id === chapterId);
    const episode = chapter?.episodes.find(e => e.id === episodeId);
    
    if (episode) {
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
    <div className="twin-science-learning-hub">
      <div className="container mx-auto px-6 py-12">
        <div className="space-y-16">
          {learningData.chapters.map((chapter) => (
            <section key={chapter.id} className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 relative inline-block">
                  {chapter.title}
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-600"></div>
                </h2>
                <p className="text-gray-600 max-w-2xl">
                  Master the fundamentals and explore practical applications through our interactive learning modules.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Learning Stats */}
        <div className="mt-20 bg-white border-2 border-gray-300 shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">12</div>
              <div className="text-gray-600">Episodes</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-indigo-600">4</div>
              <div className="text-gray-600">Content Types</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">3</div>
              <div className="text-gray-600">Chapters</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-pink-600">∞</div>
              <div className="text-gray-600">Possibilities</div>
            </div>
          </div>
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