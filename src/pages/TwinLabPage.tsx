import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple standalone TwinLab page
const TwinLabPage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const chapters = [
    {
      id: "chapter-1",
      title: "CHAPTER 1",
      subtitle: "The Mechanics of Transformation",
      color: "from-purple-600 to-blue-600",
      episodes: [
        "What is an Organizational Transformation?",
        "What is a Sector Transformation?", 
        "What is the People Transformation?",
        "The Entangled Transformation Battleground"
      ]
    },
    {
      id: "chapter-2", 
      title: "CHAPTER 2",
      subtitle: "The Architectural Blueprint in Practice",
      color: "from-blue-600 to-indigo-600",
      episodes: [
        "Strategic Performance (KPIs)",
        "Portfolios & Initiatives",
        "Process Architecture",
        "Organizational Design"
      ]
    },
    {
      id: "chapter-3",
      title: "CHAPTER 3", 
      subtitle: "The Management Operating System",
      color: "from-indigo-600 to-purple-600",
      episodes: [
        "The Integrated Governance",
        "The Delivery Engine",
        "Change Architecture", 
        "The Enablers"
      ]
    },
    {
      id: "chapter-4",
      title: "CHAPTER 4",
      subtitle: "An Open-Source Toolkit for Your First 90 Days", 
      color: "from-purple-600 to-pink-600",
      episodes: [
        "Day 1-15: Diagnose Your Starting Point",
        "Day 16-60: Architect Your First Golden Thread",
        "Day 61-90: Launch Your First GenAI-powered Use Case",
        "Beyond 90 Days: Scale and Sustain"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-16 pb-8">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4">
                TwinLab
              </h1>
              <p className="text-2xl text-gray-300 mb-2">The Future, Ready Today</p>
              <p className="text-lg text-gray-400">Navigate the cosmos of digital twin knowledge</p>
            </motion.div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {chapters.map((chapter, index) => (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedChapter(chapter.id)}
                >
                  <div className={`relative p-6 rounded-lg bg-gradient-to-br ${chapter.color} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
                    <div className="absolute inset-0 bg-black/20 rounded-lg group-hover:bg-black/10 transition-colors"></div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-white mb-2">{chapter.title}</h3>
                      <p className="text-sm text-white/90 leading-relaxed">{chapter.subtitle}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-white/70">{chapter.episodes.length} episodes</span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-white text-xs">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pb-16">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                LOGIN / REGISTER
              </button>
              <button className="px-8 py-3 border-2 border-purple-500/50 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300">
                CONTRIBUTE KNOWLEDGE
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Chapter detail modal */}
      <AnimatePresence>
        {selectedChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setSelectedChapter(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const chapter = chapters.find(c => c.id === selectedChapter);
                if (!chapter) return null;
                
                return (
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{chapter.title}</h2>
                        <p className="text-gray-300">{chapter.subtitle}</p>
                      </div>
                      <button
                        onClick={() => setSelectedChapter(null)}
                        className="text-gray-400 hover:text-white transition-colors text-2xl"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {chapter.episodes.map((episode, index) => (
                        <div key={index} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{episode}</h4>
                              <p className="text-gray-400 text-sm">Available in multiple formats</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TwinLabPage;