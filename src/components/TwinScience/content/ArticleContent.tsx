import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Edit3, Flag, ThumbsUp, Plus } from 'lucide-react';

interface ArticleContentProps {
  episode: {
    id: string;
    title: string;
    description: string;
  };
}

export function ArticleContent({ episode }: ArticleContentProps) {
  const [articleContent, setArticleContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContributing, setIsContributing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const { t, i18n } = useTranslation();

  // Mock comments data
  const [comments] = useState([
    {
      id: 1,
      author: 'Dr. Sarah Ahmed',
      content: 'This section could benefit from more examples of real-world implementations.',
      timestamp: '2 hours ago',
      likes: 3
    },
    {
      id: 2, 
      author: 'Engineering Student',
      content: 'The digital twin concept is clearer now, but I\'d love to see more technical details.',
      timestamp: '1 day ago',
      likes: 1
    }
  ]);

  const handleContribute = () => {
    if (isLoggedIn) {
      setIsContributing(true);
    } else {
      alert(t('contentViewer.needToLogin', 'Please log in to contribute'));
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      // Mock comment submission
      console.log('New comment:', newComment);
      setNewComment('');
      alert(t('contentViewer.commentSubmitted', 'Comment submitted successfully!'));
    }
  };

  useEffect(() => {
    const loadArticleContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Map episode ID to lesson path (e.g., "1-1" -> "1.1")
        const lessonId = episode.id.replace('-', '.');
        // Use current language to determine folder (en or ar)
        const langFolder = i18n.language === 'ar' ? 'ar' : 'en';
        const articlePath = `/article-assets/${lessonId}/${langFolder}/${lessonId}.html`;

        console.log('Loading article for episode:', episode.id);
        console.log('Current language:', i18n.language);
        console.log('Fetching from path:', articlePath);

        const response = await fetch(articlePath);
        if (!response.ok) {
          throw new Error(`Failed to load article: ${response.status}`);
        }

        const htmlContent = await response.text();
        console.log('Successfully loaded article content, length:', htmlContent.length);
        setArticleContent(htmlContent);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load article content';
        console.error('Error loading article:', err);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    loadArticleContent();
  }, [episode.id, i18n.language]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-red-600 mb-2">Failed to Load Article</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-6">
      {/* Main Article Content */}
      <div className="flex-grow bg-white border-2 border-slate-300 shadow-lg overflow-hidden">
        <article className="h-full flex flex-col">
          <div className="p-8 flex-grow overflow-y-auto">
            {/* Render the actual HTML content */}
            <div 
              className="article-content prose max-w-none"
              dangerouslySetInnerHTML={{ __html: articleContent }}
              style={{

                lineHeight: '1.6',
                color: '#333'
              }}
            />
          </div>
        </article>
      </div>
      
      {/* Wiki-style Sidebar with functional contribution features */}
      <div className="w-full lg:w-80 flex-shrink-0 bg-white border-2 border-slate-300 shadow-lg p-6 space-y-6">
        {/* Contribution Section */}
        <div className="text-center p-4 bg-blue-50 border-2 border-blue-300">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center justify-center gap-2">
            <Edit3 size={20} />
            {t('contentViewer.wantToContribute', '📝 Want to contribute?')}
          </h4>
          <p className="text-sm text-blue-700 mb-3">
            {t('contentViewer.wantToContributeDesc', 'Help improve this article by adding your insights and expertise.')}
          </p>
          <button 
            onClick={handleContribute}
            className="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            {isLoggedIn ? t('contentViewer.startEditing', 'Start Editing') : t('contentViewer.registerToEdit', 'Register to Edit')}
          </button>
          {isContributing && (
            <div className="mt-3 text-left">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t('contentViewer.addSuggestion', 'Add your suggestion or improvement...')}
                className="w-full p-2 border border-gray-300 rounded text-sm h-20 resize-none"
              />
              <button
                onClick={handleCommentSubmit}
                className="mt-2 w-full bg-green-600 text-white py-1 px-3 text-sm hover:bg-green-700 transition-colors"
              >
                {t('contentViewer.submitSuggestion', 'Submit Suggestion')}
              </button>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="p-4 bg-gray-50 border-2 border-gray-300">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <MessageCircle size={20} />
            {t('contentViewer.recentComments', '💬 Recent Comments')}
          </h4>
          {isLoggedIn ? (
            <div className="space-y-3">
              {showComments ? (
                <>
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-white p-3 border border-gray-200 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-sm text-gray-800">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600">
                          <ThumbsUp size={12} />
                          {comment.likes}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => setShowComments(false)}
                    className="w-full text-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {t('contentViewer.hideComments', 'Hide Comments')}
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowComments(true)}
                  className="w-full text-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  {t('contentViewer.showComments', 'Show Comments')} ({comments.length})
                </button>
              )}
            </div>
          ) : (
            <div className="text-sm">
              <p className="text-gray-600 mb-1">{t('contentViewer.loginToViewComments', 'Login required to view comments')}</p>
              <button className="text-blue-600 hover:text-blue-800 underline">
                {t('contentViewer.signInToParticipate', 'Sign in to participate')}
              </button>
            </div>
          )}
        </div>

        {/* Related Articles Section */}
        <div className="p-4 bg-green-50 border-2 border-green-300">
          <h4 className="font-bold text-green-800 mb-3">{t('contentViewer.relatedArticles', '📚 Related Articles')}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-green-700 hover:text-green-900 underline">Episode 1.2: The History of Digital Twins</a></li>
            <li><a href="#" className="text-green-700 hover:text-green-900 underline">Episode 1.3: Key Components</a></li>
            <li><a href="#" className="text-green-700 hover:text-green-900 underline">Episode 1.4: Benefits and Use Cases</a></li>
          </ul>
        </div>

        {/* Quality Control Section */}
        <div className="p-4 bg-yellow-50 border-2 border-yellow-300">
          <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
            <Flag size={20} />
            {t('contentViewer.articleQuality', '⭐ Article Quality')}
          </h4>
          <div className="text-sm text-yellow-700">
            <p className="mb-2">{t('contentViewer.helpMaintainQuality', 'Help us maintain quality:')}</p>
            <button className="w-full bg-yellow-600 text-white py-1 px-3 text-xs hover:bg-yellow-700 transition-colors mb-2">
              {t('contentViewer.reportIssue', 'Report an Issue')}
            </button>
            <button className="w-full bg-yellow-600 text-white py-1 px-3 text-xs hover:bg-yellow-700 transition-colors">
              {t('contentViewer.suggestImprovement', 'Suggest Improvement')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}