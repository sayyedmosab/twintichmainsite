import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';

const RubiksIframe = lazy(() => import('../components/RubiksIframe'));

const TwinStudioPage: React.FC = () => {
  useEffect(() => {
    document.title = 'TwinStudio - AI Twin Tech';
  }, []);

  const { i18n } = useTranslation();
  const rubiksIframeRef = useRef<HTMLIFrameElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Send language to iframe on change
  useEffect(() => {
    const iframe = rubiksIframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'LANG_CHANGE', lang: i18n.language }, '*');
    }
  }, [i18n.language]);

  return (
    <div className="bg-transparent" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="relative z-0">
        <Suspense fallback={<div style={{ height: 'calc(100vh - 5rem)', background: '#94e4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div>Loading 3D animation...</div></div>}>
          <RubiksIframe ref={rubiksIframeRef} progress={scrollProgress} height="calc(100vh - 5rem)" />
        </Suspense>
      </section>
    </div>
  );
};

export default TwinStudioPage;
