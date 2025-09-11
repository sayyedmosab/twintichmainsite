import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Domain, Topic, ContentPiece } from '../../types/cosmic/index';

interface KnowledgeMapSpaceshipProps {
  domains: Domain[];
  onContentSelect: (content: ContentPiece, topic: Topic, domain: Domain) => void;
  searchQuery: string;
}

export function KnowledgeMapSpaceship({ domains, onContentSelect, searchQuery }: KnowledgeMapSpaceshipProps) {
  const [hoveredContent, setHoveredContent] = useState<string | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<{
    content: ContentPiece;
    topic: Topic;
    domain: Domain;
  } | null>(null);

  // Podcast state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(45);
  const [duration] = useState(180);
  const [playbackSpeed, setPlaybackSpeed] = useState('1');
  const [language, setLanguage] = useState('en');

  // Video state
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [quality, setQuality] = useState('1080p');
  const [audioLang, setAudioLang] = useState('en');

  // Wiki state
  const [isEditing, setIsEditing] = useState(false);
  const [wikiContent, setWikiContent] = useState('');

  // Study guide state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Reset state when content changes
  React.useEffect(() => {
    if (selectedContent) {
      // Reset all content-specific state when switching content
      setIsPlaying(false);
      setCurrentTime(45);
      setPlaybackSpeed('1');
      setLanguage('en');
      setVideoPlaying(false);
      setShowCaptions(true);
      setQuality('1080p');
      setAudioLang('en');
      setIsEditing(false);
      setWikiContent(selectedContent.content.description);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  }, [selectedContent]);

  // Filter content based on search query
  const filteredDomains = domains.map(domain => ({
    ...domain,
    topics: domain.topics.map(topic => ({
      ...topic,
      content: topic.content.filter(content =>
        searchQuery === '' ||
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })).filter(topic => topic.content.length > 0 || searchQuery === '')
  })).filter(domain => domain.topics.length > 0 || searchQuery === '');

  const getDomainColor = (index: number) => {
    const colors = [
      'from-purple-300 to-purple-500',
      'from-purple-400 to-purple-600', 
      'from-purple-500 to-purple-700',
      'from-purple-600 to-purple-800'
    ];
    return colors[index % colors.length];
  };

  const getContentTypeInfo = (type: ContentPiece['type']) => {
    switch (type) {
      case 'wiki': return { icon: '■', label: 'Wiki Read' };
      case 'podcast': return { icon: '▶', label: 'Podcast Discussion' };
      case 'video': return { icon: '▣', label: 'Video Presentation' };
      case 'guide': return { icon: '≡', label: 'Study Guide' };
    }
  };

  // Chapter and Episode Names
  const chapterNames = [
    "The Mechanics of Transformation",
    "The Architectural Blueprint in Practice", 
    "The Management Operating System",
    "An Open-Source Toolkit for Your First 90 Days"
  ];

  const episodeNames = [
    [
      "What is an Organizational Transformation?",
      "What is a Sector Transformation?", 
      "What is the People Transformation?",
      "The Entangled Transformation Battleground"
    ],
    [
      "Strategic Performance (KPIs)",
      "Portfolios & Initiatives",
      "Process Architecture", 
      "Organizational Design"
    ],
    [
      "The Integrated Governance",
      "The Delivery Engine",
      "Change Architecture",
      "The Enablers"
    ],
    [
      "Day 1-15: Diagnose Your Starting Point",
      "Day 16-60: Architect Your First \"Golden Thread\"",
      "Day 61-90: Launch Your First GenAI-powered Use Case",
      "Beyond 90 Days: Scale and Sustain"
    ]
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Spaceship Frame - Thin Panel Edges - Rusty Silver */}
      <div className="absolute inset-0">
        {/* Left Panel Edge - 5% width with gray background */}
        <div className="absolute top-0 bottom-12 left-0 w-[5%] bg-gradient-to-r from-stone-500/80 to-stone-500/60">
          <div className="w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
          {/* Panel Bolts */}
          <div className="absolute top-4 left-2 w-1 h-1 bg-cyan-400"></div>
          <div className="absolute bottom-4 left-2 w-1 h-1 bg-cyan-400"></div>
        </div>

        {/* Bottom Panel Edge */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-stone-500/80 to-transparent">
          <div className="absolute bottom-0 h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-8 text-xs text-gray-300 font-inter">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-green-400"></div>
                <span>POWER: 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-400"></div>
                <span>COMMS: ACTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-purple-400"></div>
                <span>AI: ONLINE</span>
              </div>
            </div>
          </div>
          {/* Panel Bolts */}
          <div className="absolute bottom-2 left-4 w-1 h-1 bg-cyan-400"></div>
          <div className="absolute bottom-2 right-4 w-1 h-1 bg-cyan-400"></div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-8 ml-[5%] mb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-2 h-2 bg-cyan-400 animate-pulse"></div>
              <h1 className="text-3xl font-bold text-gray-200 font-inter">KNOWLEDGE MAP</h1>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"></div>
            </div>
            <p className="text-gray-400 font-inter">Navigate the cosmos of digital twin knowledge</p>
          </div>

          {/* Knowledge Domains */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDomains.map((domain, index) => (
              <Card key={domain.id} className={`bg-gradient-to-br ${getDomainColor(index)} border-cyan-400/20 border-2`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{domain.icon}</div>
                    <div>
                      <h2 className="text-xl font-bold text-white font-inter">{domain.title}</h2>
                      <p className="text-purple-100 text-sm font-inter">{domain.description}</p>
                    </div>
                  </div>
                  
                  {domain.topics.map(topic => (
                    <div key={topic.id} className="mb-4">
                      <button
                        onClick={() => setExpandedChapter(expandedChapter === topic.id ? null : topic.id)}
                        className="w-full text-left p-3 bg-black/20 hover:bg-black/30 border border-white/10 transition-all font-inter"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{topic.title}</span>
                          <span className="text-white/60">{expandedChapter === topic.id ? '−' : '+'}</span>
                        </div>
                        <p className="text-white/70 text-sm mt-1">{topic.description}</p>
                      </button>
                      
                      <AnimatePresence>
                        {expandedChapter === topic.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-black/10 border-l-2 border-cyan-400/50">
                              <div className="grid grid-cols-2 gap-2">
                                {topic.content.map(content => {
                                  const typeInfo = getContentTypeInfo(content.type);
                                  return (
                                    <motion.button
                                      key={content.id}
                                      onClick={() => onContentSelect(content, topic, domain)}
                                      onMouseEnter={() => setHoveredContent(content.id)}
                                      onMouseLeave={() => setHoveredContent(null)}
                                      className="flex items-center gap-2 p-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 transition-all text-left font-inter"
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      <span className="text-cyan-400 font-mono text-sm">{typeInfo.icon}</span>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-white text-xs font-medium truncate">{content.title}</div>
                                        <div className="text-purple-200 text-xs">{typeInfo.label}</div>
                                      </div>
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}