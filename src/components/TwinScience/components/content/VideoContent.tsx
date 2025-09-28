import { useState } from 'react';
import { Play, Pause, Volume2, Maximize, Settings } from 'lucide-react';

interface VideoContentProps {
  episode: {
    id: string;
    title: string;
    description: string;
  };
}

export function VideoContent({ episode }: VideoContentProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalTime = 1245; // 20:45 in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full bg-black flex flex-col p-6 gap-6">
      {/* Video Player */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-6xl aspect-video bg-gray-900 border-2 border-gray-700 shadow-2xl overflow-hidden relative group">
          {/* Video placeholder with gradient overlay */}
          <div className="absolute inset-0 bg-black/60" />
          
          {/* Video content area */}
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="text-white text-center">
              <div className="w-24 h-24 bg-white/20 flex items-center justify-center mb-4 mx-auto border-2 border-white/50">
                <Play size={32} className="ml-2" />
              </div>
              <p className="text-xl font-semibold mb-2">{episode.title}</p>
              <p className="text-gray-300">Click to play video content</p>
            </div>
          </div>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-white/20 h-1 mb-2">
                <div 
                  className="bg-red-500 h-1 transition-all duration-300" 
                  style={{ width: `${(currentTime / totalTime) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-white/80">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalTime)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-red-400 transition-colors duration-200"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <div className="flex items-center gap-2">
                  <Volume2 size={20} className="text-white" />
                  <div className="w-20 bg-white/20 h-1">
                    <div className="bg-white w-3/4 h-1"></div>
                  </div>
                </div>
                <span className="text-white text-sm">{formatTime(currentTime)} / {formatTime(totalTime)}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="text-white hover:text-red-400 transition-colors duration-200">
                  <Settings size={20} />
                </button>
                <button className="text-white hover:text-red-400 transition-colors duration-200">
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info and Comments */}
      <div className="w-full max-w-6xl mx-auto flex-shrink-0">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video Description */}
          <div className="flex-grow">
            <div className="text-white mb-4">
              <h2 className="text-2xl font-bold mb-2">{episode.title}</h2>
              <p className="text-gray-300 leading-relaxed">{episode.description}</p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
              <span>1.2K views</span>
              <span>•</span>
              <span>2 days ago</span>
              <span>•</span>
              <span>TwinTech Learning</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 border border-red-700 transition-colors duration-200 flex items-center gap-2">
                <span>👍</span>
                <span>124</span>
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 border border-gray-600 transition-colors duration-200 flex items-center gap-2">
                <span>👎</span>
                <span>3</span>
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 border border-gray-600 transition-colors duration-200">
                Share
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="lg:w-80 bg-gray-900 border border-gray-700 p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500"></span>
              Comments (47)
            </h3>
            
            <div className="space-y-4 mb-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  JD
                </div>
                <div className="flex-grow">
                  <p className="text-white text-sm">
                    <span className="font-semibold">Jordan Davis</span>
                    <span className="text-gray-400 ml-2">2 hours ago</span>
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    This explanation of digital twin architecture is exactly what I needed for my thesis!
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-600 flex items-center justify-center text-white text-sm font-bold">
                  SM
                </div>
                <div className="flex-grow">
                  <p className="text-white text-sm">
                    <span className="font-semibold">Sarah Martinez</span>
                    <span className="text-gray-400 ml-2">4 hours ago</span>
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    Great visuals! The 3D models really help understand the concepts.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <textarea 
                placeholder="Add a comment..."
                className="w-full bg-gray-800 text-white border border-gray-600 p-3 text-sm resize-none focus:outline-none focus:border-red-500"
                rows={3}
              />
              <button className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 border border-red-700 text-sm transition-colors duration-200">
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}