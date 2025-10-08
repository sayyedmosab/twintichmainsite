import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';
import CommentsSystem from '../../../CommentsSystem';

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
  // Get current language from i18n using useTranslation hook
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const loadArticleContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const lessonId = episode.id.replace('-', '.');
        
        // Load HTML directly - all episodes have HTML files
  const htmlPath = `/article-assets/${lang}/article/${lessonId}.html`;
        const response = await fetch(htmlPath);
        
        if (!response.ok) {
          throw new Error(`Article not found: ${htmlPath}`);
        }
        
        let fileContent = await response.text();
        
        // Remove global h1-h6 style rules and font-family declarations that override global styles
        fileContent = fileContent.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, content) => {
          // Remove bare h1-h6 selectors and font-family properties that conflict with global styles
          let cleaned = content.replace(/\bh[1-6]\s*\{[^}]*\}/gi, '');
          cleaned = cleaned.replace(/font-family\s*:\s*[^;]+;?/gi, '');
          // Remove any border-radius properties to follow user requirement for no rounded elements
          cleaned = cleaned.replace(/border-radius\s*:\s*[^;]+;?/gi, '');
          return `<style>${cleaned}</style>`;
        });

        // Remove a single <br> or <br/> at the very top of the article (after <body> or at start)
        fileContent = fileContent.replace(/(<body[^>]*>\s*)?<br\s*\/?>(\s*)/i, (match, bodyTag, trailingSpace) => {
          return bodyTag ? bodyTag + (trailingSpace || '') : '';
        });
        
  // (Removed) No longer stripping chapter/episode headings for any language
        
        // Ensure proper RTL direction for Arabic content
        if (lang === 'ar') {
          fileContent = fileContent.replace(/<body([^>]*)>/i, '<body$1 dir="rtl" style="direction: rtl; text-align: right;">');
          fileContent = fileContent.replace(/<html([^>]*)>/i, '<html$1 dir="rtl">');
        }
        
        setArticleContent(fileContent);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load article content';
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    loadArticleContent();
  }, [episode.id, lang]);

  return (
    <div className={`w-full h-full flex flex-col lg:flex-row gap-6 p-6 overflow-auto ${isRTL ? 'rtl' : 'ltr'}`} style={{ maxHeight: '90vh' }} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Main Article Content */}
      <div className="flex-grow">
        <div className="w-full bg-white border border-gray-300 shadow-lg px-8 pb-8" style={{ borderRadius: '0' }}>
          <div className={`article-html-content ${isRTL ? 'rtl-content' : 'ltr-content'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            {loading ? (
              <div className="text-gray-500">{t('common.loading')}</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : articleContent ? (
              <div dangerouslySetInnerHTML={{ __html: articleContent }} />
            ) : null}
          </div>
        </div>
      </div>
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 bg-white border border-gray-300 shadow-lg p-6 space-y-6" style={{ borderRadius: '0' }}>
            <div className="text-center p-4 bg-yellow-100 border-2 border-yellow-400" style={{ borderRadius: '0' }}>
              <h4 className="font-bold text-orange-800">{t('contentViewer.wantToContribute')}</h4>
              <p className="text-sm text-orange-700 mt-2">
                {t('contentViewer.wantToContributeDesc')}
              </p>
              <button className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 transition-colors duration-200 border-2 border-yellow-600" style={{ borderRadius: '0' }}>
                {t('contentViewer.joinCommunity')}
              </button>
            </div>
            {/* Real Commenting System */}
            <CommentsSystem contentType="article" episodeId={episode.id} />
          </div>
        </div>
  );
}
    