import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const loadArticleContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Map episode ID to lesson path (e.g., "1-1" -> "1.1")
        const lessonId = episode.id.replace('-', '.');
        const articlePath = `/lessons/${lessonId}/${lessonId}.htm`;
        
        console.log('Loading article for episode:', episode.id);
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
  }, [episode.id]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
          <div className="w-full h-64 bg-gradient-to-r from-slate-600 to-slate-800 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-2xl font-bold">Real Article Content</h3>
              <p className="text-slate-300 mt-2">Episode {episode.id.replace('-', '.')}</p>
            </div>
          </div>
          <div className="p-8 flex-grow overflow-y-auto">
            {/* Render the actual HTML content */}
            <div 
              className="article-content prose max-w-none"
              dangerouslySetInnerHTML={{ __html: articleContent }}
              style={{
                fontFamily: 'Arial, sans-serif',
                lineHeight: '1.6',
                color: '#333'
              }}
            />
          </div>
        </article>
      </div>
      
      {/* Wiki-style Sidebar with contribution features */}
      <div className="w-full lg:w-80 flex-shrink-0 bg-white border-2 border-slate-300 shadow-lg p-6 space-y-6">
        <div className="text-center p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
          <h4 className="font-bold text-blue-800 mb-2">📝 Want to contribute?</h4>
          <p className="text-sm text-blue-700 mb-3">
            Help improve this article by adding your insights and expertise.
          </p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
            Register to Edit
          </button>
        </div>

        <div className="p-4 bg-gray-50 border-2 border-gray-300 rounded-lg">
          <h4 className="font-bold text-gray-800 mb-3">💬 Recent Comments</h4>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-600 mb-1">Login required to view comments</p>
              <button className="text-blue-600 hover:text-blue-800 underline">
                Sign in to participate
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
          <h4 className="font-bold text-green-800 mb-3">📚 Related Articles</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-green-700 hover:text-green-900 underline">Episode 1.2: The History of Digital Twins</a></li>
            <li><a href="#" className="text-green-700 hover:text-green-900 underline">Episode 1.3: Key Components</a></li>
            <li><a href="#" className="text-green-700 hover:text-green-900 underline">Episode 1.4: Benefits and Use Cases</a></li>
          </ul>
        </div>

        <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
          <h4 className="font-bold text-yellow-800 mb-3">⭐ Article Quality</h4>
          <div className="text-sm text-yellow-700">
            <p className="mb-2">Help us maintain quality:</p>
            <button className="w-full bg-yellow-600 text-white py-1 px-3 rounded text-xs hover:bg-yellow-700 transition-colors mb-2">
              Report an Issue
            </button>
            <button className="w-full bg-yellow-600 text-white py-1 px-3 rounded text-xs hover:bg-yellow-700 transition-colors">
              Suggest Improvement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
            Help improve this article by adding comments or suggestions.
          </p>
          <button className="mt-3 bg-slate-700 hover:bg-slate-900 text-white font-semibold py-2 px-4 transition-colors duration-200 border-2 border-slate-800">
            Join Community
          </button>
        </div>
        
        <div>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-slate-900">
            <span className="w-2 h-2 bg-blue-600"></span>
            Recent Comments
          </h4>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 border-2 border-slate-200">
              <p className="text-sm text-slate-600">Great explanation of the core concepts!</p>
              <p className="text-xs text-slate-500 mt-1">- Sarah Chen, 2 hours ago</p>
            </div>
            <div className="p-3 bg-slate-50 border-2 border-slate-200">
              <p className="text-sm text-slate-600">Could use more examples from manufacturing.</p>
              <p className="text-xs text-slate-500 mt-1">- Mike Rodriguez, 1 day ago</p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-slate-900">
            <span className="w-2 h-2 bg-slate-600"></span>
            Suggested Additions
          </h4>
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 border-2 border-slate-300">
              <p className="text-sm text-slate-800">Add section on implementation costs</p>
              <button className="text-xs text-blue-600 hover:text-blue-800 mt-1 font-bold">+1 Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}