import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CommentStorage, SubscriptionService, Comment } from '../services/CommentService';

interface CommentsSystemProps {
  contentType: 'article' | 'audio' | 'video';
  episodeId: string;
}

const CommentsSystem: React.FC<CommentsSystemProps> = ({ contentType, episodeId }) => {
  const { t, i18n } = useTranslation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);

  useEffect(() => {
    loadComments();
    setIsSubscribed(SubscriptionService.isSubscribed());
  }, [contentType]);

  const loadComments = () => {
    const allComments = CommentStorage.getComments();
    const filteredComments = allComments.filter(c => c.type === contentType);
    setComments(filteredComments);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !authorName.trim()) {
      alert(t('Please fill in both name and comment'));
      return;
    }

    if (!isSubscribed) {
      setShowSubscriptionDialog(true);
      return;
    }

    const comment = CommentStorage.addComment({
      author: authorName,
      content: newComment,
      type: contentType,
      isPro: true
    });

    setComments(prev => [...prev, comment]);
    setNewComment('');
    setAuthorName('');
  };

  const handleSubscribe = () => {
    SubscriptionService.subscribe();
    setIsSubscribed(true);
    setShowSubscriptionDialog(false);
    handleAddComment();
  };

  const handleLike = (commentId: string) => {
    CommentStorage.likeComment(commentId);
    loadComments();
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        {t('Comments for')} {t(contentType)} - Episode {episodeId}
      </h3>

      {/* Add Comment Form */}
      <div className="mb-6 p-4 bg-white rounded border">
        <div className="mb-3">
          <input
            type="text"
            placeholder={t('Your name')}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder={t('Write your comment...')}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          {t('Add Comment')}
        </button>
        {!isSubscribed && (
          <p className="text-xs text-gray-500 mt-2">
            {t('Note: Subscription required for commenting')}
          </p>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            {t('No comments yet. Be the first to comment!')}
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-3 rounded border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-medium text-gray-800">
                    {comment.author}
                    {comment.isPro && (
                      <span className="ml-2 text-xs bg-gold-500 text-white px-2 py-1 rounded">
                        PRO
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(comment.timestamp).toLocaleDateString(i18n.language)}
                  </span>
                </div>
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center text-gray-500 hover:text-blue-600"
                >
                  <span className="text-xs">👍 {comment.likes || 0}</span>
                </button>
              </div>
              <p 
                className="text-gray-700 text-sm"
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              >
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Subscription Dialog */}
      {showSubscriptionDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {t('Subscription Required')}
            </h3>
            <p className="mb-4 text-gray-600">
              {t('To post comments, you need a TwinScience subscription. Subscribe now for full access!')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleSubscribe}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {t('Subscribe Now')}
              </button>
              <button
                onClick={() => setShowSubscriptionDialog(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                {t('Cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsSystem;