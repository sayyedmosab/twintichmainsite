import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Play, Pause, SkipBack, SkipForward, Download, Share2 } from 'lucide-react';

interface PodcastContentProps {
  lessonId: string;
  contentAvailability: {
    article: boolean;
    podcast: boolean;
    video: boolean;
    studyGuide: boolean;
  };
}

export function PodcastContent({ lessonId, contentAvailability }: PodcastContentProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.5);
  const [currentTime, setCurrentTime] = useState(0);
  const totalTime = 1847; // 30:47 in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const speeds = [1, 1.25, 1.5, 2];

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-6">
      {/* Podcast Player */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg bg-white border-2 border-gray-300 shadow-2xl p-8 relative">
          {/* Album Art */}
          <div className="relative -mt-16 mb-8 flex justify-center">
            <div className="w-64 h-64 border-2 border-gray-400 shadow-2xl overflow-hidden bg-slate-800 p-8 flex items-center justify-center">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1485579149621-3123dd979885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwbWljcm9waG9uZXxlbnwxfHx8fDE3NTg4OTk1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Podcast artwork"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs opacity-90">TwinTech Talks</p>
              </div>
            </div>
          </div>

          {/* Episode Title */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Episode {lessonId}</h2>
            <p className="text-gray-600 text-sm">TwinScience Podcast</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 h-2 mb-2">
              <div 
                className="bg-blue-600 h-2 transition-all duration-300" 
                style={{ width: `${(currentTime / totalTime) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalTime)}</span>
            </div>
          </div>

          {/* Playback Speed */}
          <div className="flex justify-center gap-2 mb-6">
            {speeds.map(speed => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-3 py-1 text-sm transition-all duration-200 border ${
                  playbackSpeed === speed 
                    ? 'bg-blue-100 text-blue-700 font-semibold' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <SkipBack size={24} />
            </button>
            
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-200 border-2 border-blue-700"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
            
            <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <SkipForward size={24} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-8 text-gray-600">
            <button className="flex flex-col items-center gap-1 hover:text-blue-600 transition-colors duration-200">
              <Download size={20} />
              <span className="text-xs">Download</span>
            </button>
            <button className="flex flex-col items-center gap-1 hover:text-blue-600 transition-colors duration-200">
              <Share2 size={20} />
              <span className="text-xs">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transcript and Comments */}
      <div className="w-full lg:w-96 flex-shrink-0 bg-white border border-gray-300 shadow-lg p-6 flex flex-col">
        <h3 className="font-bold mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Transcript
        </h3>
        
        <div className="flex-grow overflow-y-auto text-sm space-y-4 text-gray-600 mb-6 max-h-64">
          <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border border-gray-100">
            <span className="font-semibold text-blue-600">0:01:</span>
            <span className="ml-2">Welcome to TwinTech Talks, the podcast that explores the cutting edge of digital twin technology...</span>
          </div>
          <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border border-gray-100">
            <span className="font-semibold text-blue-600">0:15:</span>
            <span className="ml-2">In this episode, we're diving deep into what a digital twin really is and why it's revolutionizing industries worldwide.</span>
          </div>
          <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border border-gray-100">
            <span className="font-semibold text-blue-600">0:45:</span>
            <span className="ml-2">But first, let's start with the basics. A digital twin isn't just a 3D model or simulation...</span>
          </div>
          <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border border-gray-100">
            <span className="font-semibold text-blue-600">1:20:</span>
            <span className="ml-2">The key difference is the real-time data connection between the physical and digital worlds.</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Listener Comments
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">Great intro! Finally understand the difference between digital twins and regular simulations.</p>
              <p className="text-xs text-gray-500 mt-1">- Alex Kim • 3 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">Love the real-world examples. More episodes like this please!</p>
              <p className="text-xs text-gray-500 mt-1">- Taylor Morgan • 1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}