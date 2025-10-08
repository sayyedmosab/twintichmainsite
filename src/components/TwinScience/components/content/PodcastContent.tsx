import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Play, Pause, SkipBack, SkipForward, Download, Share2, Lock, MessageCircle, Crown, ThumbsUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CommentsSystem from '../../../CommentsSystem';

interface PodcastContentProps {
  episode: {
    id: string;
    title: string;
    description: string;
  };
}

export function PodcastContent({ episode }: PodcastContentProps) {
  // Audio file path pattern: /article-assets/[episode]/[lang]/[episode].m4a
  const lessonId = episode.id.replace('-', '.');
  // Get current language from i18n using useTranslation hook
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const isRTL = i18n.language === 'ar';
  const audioPath = `/article-assets/${lang}/audio/${lessonId}.m4a`;
  
  // Subscription state
  const [isSubscribed, setIsSubscribed] = useState(false); // Mock subscription state
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState(1.5);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Mock comments data for subscribers
  const [subscriberComments] = useState([
    {
      id: 1,
      author: 'Pro Member',
      content: 'The audio quality is excellent. This really helps understand the concepts better.',
      timestamp: '1 hour ago',
      likes: 5,
      isPro: true
    },
    {
      id: 2, 
      author: 'Premium User',
      content: 'Love the discussion format. The expert insights are very valuable.',
      timestamp: '3 hours ago',
      likes: 3,
      isPro: true
    }
  ]);
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      console.log('New comment:', newComment);
      setNewComment('');
      alert(t('contentViewer.commentSubmitted', 'Comment submitted successfully!'));
    }
  };

  const handleSubscribe = () => {
    // Mock subscription
    setIsSubscribed(true);
    alert(t('contentViewer.subscriptionActivated', 'Subscription activated! You can now access premium features.'));
  };
  
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

  const speeds = [1, 1.25, 1.5, 2];

  // Update playback speed on audio element when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  return (
  <div className={`w-full h-full flex flex-col lg:flex-row gap-6 p-6 overflow-auto ${isRTL ? 'rtl' : 'ltr'}`} style={{ maxHeight: '90vh' }} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Podcast Player */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg bg-white border-2 border-gray-300 shadow-2xl p-8 relative" style={{ borderRadius: '0' }}>
          {/* Album Art */}
          <div className="relative -mt-16 mb-8 flex justify-center">
            <div className="w-64 h-64 border-2 border-gray-400 shadow-2xl overflow-hidden bg-slate-800 p-8 flex items-center justify-center" style={{ borderRadius: '0' }}>
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
                style={{ borderRadius: '0' }}
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
              <span className="text-xs">{t('contentViewer.share')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transcript and Comments */}
      <div className="w-full lg:w-96 flex-shrink-0 bg-white border border-gray-300 shadow-lg p-6 flex flex-col" style={{ borderRadius: '0' }}>
        <h3 className="font-bold mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500" style={{ borderRadius: '0' }}></span>
          {t('contentViewer.listenToDiscussion')}
        </h3>
        
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">{t('contentViewer.discussionDesc')}</p>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 transition-colors duration-200" style={{ borderRadius: '0' }}>
            {t('contentViewer.playPodcast')}
          </button>
        </div>

        {/* Real Commenting System */}
        <div className="border-t border-gray-200 pt-4">
          <CommentsSystem contentType="audio" episodeId={episode.id} />
        </div>
      </div>
    </div>
  );
}