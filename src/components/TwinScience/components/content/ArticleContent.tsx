
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

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
        // Try to load Markdown from article-assets first
        const mdPath = `/article-assets/${lessonId}/${lessonId}.md`;
        let response = await fetch(mdPath);
        let isMarkdown = false;
        let fileContent = '';
        if (response.ok) {
          isMarkdown = true;
          fileContent = await response.text();
        } else {
          // fallback to legacy HTML if .md not found
          const htmlPath = `/lessons/${lessonId}/${lessonId}.htm`;
          response = await fetch(htmlPath);
          if (!response.ok) {
            throw new Error(`Failed to load article: ${response.status}`);
          }
          fileContent = await response.text();
        }
        if (isMarkdown) {
          const { marked } = await import('marked');
          const htmlContent = marked.parse(fileContent);
          setArticleContent(htmlContent);
        } else {
          setArticleContent(fileContent);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load article content';
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    loadArticleContent();
  }, [episode.id]);

  return (
  <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-6">
          {/* Main Article Content */}
          <div className="flex-grow bg-white border border-gray-300 shadow-lg overflow-hidden">
            <article className="h-full flex flex-col">
              <div className="p-8 flex-grow overflow-y-auto">
                <ImageWithFallback 
                  src="/images/article-banner.jpg"
                  alt="Article banner"
                  className="w-full h-64 object-cover mb-6"
                />
                <h1 className="text-3xl font-bold mb-4 text-gray-900">{episode.title}</h1>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p className="text-lg text-gray-600 mb-6">{episode.description}</p>
                  {loading ? (
                    <div className="text-gray-500">Loading article...</div>
                  ) : error ? (
                    <div className="text-red-600">{error}</div>
                  ) : articleContent ? (
                    <div dangerouslySetInnerHTML={{ __html: articleContent }} />
                  ) : (
                    // fallback mock content
                    <>
                      <h2 className="text-2xl font-semibold mt-8 mb-4">Understanding Digital Twins</h2>
                      <p>
                        Digital twins represent one of the most transformative technologies in modern engineering and manufacturing. 
                        At its core, a digital twin is a real-time virtual representation of a physical object, process, or system that 
                        spans its lifecycle and uses real-time data to enable understanding, learning, and reasoning.
                      </p>
                      <h3 className="text-xl font-semibold mt-6 mb-3">Key Components</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Physical Asset: The real-world object or system being modeled</li>
                        <li>Digital Model: The virtual representation with high fidelity</li>
                        <li>Data Connection: Real-time bidirectional data flow</li>
                        <li>Analytics Layer: AI and machine learning capabilities</li>
                      </ul>
                      <h3 className="text-xl font-semibold mt-6 mb-3">Real-World Applications</h3>
                      <p>
                        Digital twins are revolutionizing industries from aerospace to healthcare. NASA uses digital twins to 
                        monitor spacecraft systems in real-time, while automotive manufacturers leverage them for predictive 
                        maintenance and performance optimization.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                        <p className="text-blue-800">
                          <strong>Pro Tip:</strong> The most successful digital twin implementations focus on solving specific 
                          business problems rather than trying to digitize everything at once.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </article>
          </div>
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 bg-white border border-gray-300 shadow-lg p-6 space-y-6">
            <div className="text-center p-4 bg-yellow-100 border-2 border-yellow-400">
              <h4 className="font-bold text-orange-800">Want to contribute?</h4>
              <p className="text-sm text-orange-700 mt-2">
                Help improve this article by adding comments or suggestions.
              </p>
              <button className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 transition-colors duration-200 border-2 border-yellow-600">
                Join Community
              </button>
            </div>
            <div>
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500"></span>
                Recent Comments
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 border border-gray-200">
                  <p className="text-sm text-gray-600">Great explanation of the core concepts!</p>
                  <p className="text-xs text-gray-500 mt-1">- Sarah Chen, 2 hours ago</p>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200">
                  <p className="text-sm text-gray-600">Could use more examples from manufacturing.</p>
                  <p className="text-xs text-gray-500 mt-1">- Mike Rodriguez, 1 day ago</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500"></span>
                Suggested Additions
              </h4>
              <div className="space-y-2">
                <div className="p-3 bg-green-50 border-2 border-green-300">
                  <p className="text-sm text-green-800">Add section on implementation costs</p>
                  <button className="text-xs text-green-600 hover:text-green-800 mt-1">+1 Support</button>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
    