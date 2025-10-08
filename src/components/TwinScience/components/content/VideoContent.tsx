import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Maximize, Settings, Lock, MessageCircle, Crown, ThumbsUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CommentsSystem from '../../../CommentsSystem';

interface VideoContentProps {
  episode: {
    id: string;
    title: string;
    description: string;
  };
}

export function VideoContent({ episode }: VideoContentProps) {
  // Video file path pattern: /article-assets/[episode]/[lang]/[episode].mp4
  const lessonId = episode.id.replace('-', '.');
  // Get current language from i18n using useTranslation hook
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const isRTL = i18n.language === 'ar';
  const videoPath = `/article-assets/${lang}/video/${lessonId}.mp4`;
  const [videoExists, setVideoExists] = useState(true);
  
  // Subscription state
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  
  // Mock premium comments
  const [premiumComments] = useState([
    {
      id: 1,
      author: 'Expert Member',
      content: 'The visual demonstrations really help clarify these complex concepts. Great work!',
      timestamp: '45 minutes ago',
      likes: 8,
      isPro: true
    },
    {
      id: 2,
      author: 'Pro Subscriber',
      content: 'This video format is perfect for understanding the technical details.',
      timestamp: '2 hours ago',
      likes: 5,
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
    setIsSubscribed(true);
    alert(t('contentViewer.subscriptionActivated', 'Subscription activated! You can now access premium features.'));
  };

  // Check if video file exists
  useEffect(() => {
    fetch(videoPath, { method: 'HEAD' })
      .then(res => setVideoExists(res.ok))
      .catch(() => setVideoExists(false));
  }, [videoPath]);

  return (
    <div className={`w-full h-full flex flex-col p-6 gap-6 overflow-auto ${isRTL ? 'rtl' : 'ltr'}`} style={{ maxHeight: '90vh' }} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Video Player - Reduced by 25% from max-w-6xl to max-w-4xl (roughly 75% of original) */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-4xl aspect-video bg-white border-2 border-gray-300 shadow-2xl overflow-hidden relative group flex items-center justify-center" style={{ borderRadius: '0' }}>
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
      <div className="w-full max-w-4xl mx-auto flex-shrink-0">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video Description */}
          <div className="flex-grow">
            <p className="text-sm text-gray-600 mb-4">{t('contentViewer.videoDesc')}</p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 transition-colors duration-200" style={{ borderRadius: '0' }}>
              {t('contentViewer.watchVideo')}
            </button>
          </div>

          {/* Real Commenting System */}
          <div className="lg:w-80 bg-white border border-gray-300 shadow-lg p-6" style={{ borderRadius: '0' }}>
            <CommentsSystem contentType="video" episodeId={episode.id} />
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500" style={{ borderRadius: '0' }}></span>
                {t('contentViewer.suggestedAdditions')}
              </h4>
              <div className="p-3 bg-green-50 border-2 border-green-300" style={{ borderRadius: '0' }}>
                <p className="text-sm text-green-800">{t('contentViewer.implementationCosts')}</p>
                <button className="text-xs text-green-600 hover:text-green-800 mt-1">+1 {t('contentViewer.support')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}