import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Play, Pause, SkipBack, SkipForward, Download, Share2 } from 'lucide-react';

interface PodcastContentProps {
  episode: {
    id: string;
    title: string;
    description: string;
  };
}

export function PodcastContent({ episode }: PodcastContentProps) {
  // Audio file path pattern: /article-assets/[episode]/[episode].m4a
  const lessonId = episode.id.replace('-', '.');
  const audioPath = `/article-assets/${lessonId}/${lessonId}.m4a`;
  // Download handler
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioPath;
    link.download = `${lessonId}.m4a`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share handler
  const handleShare = async () => {
    const shareUrl = window.location.origin + audioPath;
    if (navigator.share) {
      try {
        await navigator.share({
          title: episode.title,
          text: episode.description,
          url: shareUrl,
        });
      } catch (e) {
        // User cancelled or error
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Audio link copied to clipboard!');
      } catch (e) {
        alert('Could not copy link.');
      }
    }
  };
  const [playbackSpeed, setPlaybackSpeed] = useState(1.5);
  const audioRef = useRef<HTMLAudioElement>(null);
  // Audio file path pattern: /article-assets/[episode]/[episode].m4a
  // (removed duplicate lessonId/audioPath)
  const speeds = [1, 1.25, 1.5, 2];

  // Update playback speed on audio element when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  return (
  <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-6 overflow-auto" style={{ maxHeight: '90vh' }}>
      {/* Podcast Player */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg bg-white border-2 border-gray-300 shadow-2xl p-8 relative">
          {/* Album Art */}
          <div className="relative -mt-16 mb-8 flex justify-center">
            <div className="w-64 h-64 border-2 border-gray-400 shadow-2xl overflow-hidden bg-slate-800 p-8 flex items-center justify-center">
              <ImageWithFallback 
                src="/images/podcast-art.jpg"
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
            <h2 className="text-xl font-bold text-gray-900 mb-2">{episode.title}</h2>
            <p className="text-gray-600 text-sm">{episode.description}</p>
          </div>

          {/* Audio Player */}
          <div className="mb-6 flex flex-col items-center">
            <audio ref={audioRef} controls style={{ width: '100%' }}>
              <source src={audioPath} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="text-xs text-gray-500 mt-2">If the player does not appear, the audio file is not yet uploaded.</div>
          </div>

          {/* Video Player removed: now in Video tab only */}

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
                aria-label={`Set playback speed to ${speed}x`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Controls removed as requested */}

          {/* Action Buttons */}
          <div className="flex justify-center gap-8 text-gray-600">
            <button
              className="flex flex-col items-center gap-1 hover:text-blue-600 transition-colors duration-200"
              onClick={handleDownload}
            >
              <Download size={20} />
              <span className="text-xs">Download</span>
            </button>
            <button
              className="flex flex-col items-center gap-1 hover:text-blue-600 transition-colors duration-200"
              onClick={handleShare}
            >
              <Share2 size={20} />
              <span className="text-xs">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transcript and Comments */}
      <div className="w-full lg:w-96 flex-shrink-0 bg-white border border-gray-300 shadow-lg p-6 flex flex-col">
        <h3 className="font-bold mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500"></span>
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
            <span className="w-2 h-2 bg-green-500"></span>
            Listener Comments
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50">
              <p className="text-sm text-gray-700">Great intro! Finally understand the difference between digital twins and regular simulations.</p>
              <p className="text-xs text-gray-500 mt-1">- Alex Kim • 3 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50">
              <p className="text-sm text-gray-700">Love the real-world examples. More episodes like this please!</p>
              <p className="text-xs text-gray-500 mt-1">- Taylor Morgan • 1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}