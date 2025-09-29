import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Maximize, Settings } from 'lucide-react';

interface VideoContentProps {
  episode: {
    id: string;
    title: string;
    description: string;
  };
}

export function VideoContent({ episode }: VideoContentProps) {
  // Video file path pattern: /article-assets/[episode]/[episode].mp4
  const lessonId = episode.id.replace('-', '.');
  const videoPath = `/article-assets/${lessonId}/${lessonId}.mp4`;
  const [videoExists, setVideoExists] = useState(true);

  // Check if video file exists
  useEffect(() => {
    fetch(videoPath, { method: 'HEAD' })
      .then(res => setVideoExists(res.ok))
      .catch(() => setVideoExists(false));
  }, [videoPath]);

  return (
    <div className="w-full h-full flex flex-col p-6 gap-6 overflow-auto" style={{ maxHeight: '90vh' }}>
      {/* Video Player */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-6xl aspect-video bg-white border-2 border-gray-300 shadow-2xl overflow-hidden relative group flex items-center justify-center">
          {videoExists ? (
            <video controls style={{ width: '100%', height: '100%' }}>
              <source src={videoPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
              Video not available yet.
            </div>
          )}
        </div>
      </div>

      {/* Video Info and Comments */}
      <div className="w-full max-w-6xl mx-auto flex-shrink-0">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video Description */}
          <div className="flex-grow">
            <div className="text-gray-900 mb-4">
              <h2 className="text-2xl font-bold mb-2">{episode.title}</h2>
              <p className="text-gray-600 leading-relaxed">{episode.description}</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
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
              <button className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 border border-gray-500 transition-colors duration-200 flex items-center gap-2">
                <span>👎</span>
                <span>3</span>
              </button>
              <button className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 border border-gray-500 transition-colors duration-200">
                Share
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="lg:w-80 bg-gray-700 border border-gray-600 p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500"></span>
              Comments (47)
            </h3>
            <div className="space-y-4 mb-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white text-sm font-bold">JD</div>
                <div className="flex-grow">
                  <p className="text-white text-sm"><span className="font-semibold">Jordan Davis</span><span className="text-gray-400 ml-2">2 hours ago</span></p>
                  <p className="text-gray-300 text-sm mt-1">This explanation of digital twin architecture is exactly what I needed for my thesis!</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-600 flex items-center justify-center text-white text-sm font-bold">SM</div>
                <div className="flex-grow">
                  <p className="text-white text-sm"><span className="font-semibold">Sarah Martinez</span><span className="text-gray-400 ml-2">4 hours ago</span></p>
                  <p className="text-gray-300 text-sm mt-1">Great visuals! The 3D models really help understand the concepts.</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-600 pt-4">
              <textarea 
                placeholder="Add a comment..."
                className="w-full bg-gray-600 text-white border border-gray-500 p-3 text-sm resize-none focus:outline-none focus:border-red-500"
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