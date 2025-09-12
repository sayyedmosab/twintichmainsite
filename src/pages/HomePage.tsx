import React, { useEffect } from 'react';
import RubiksIframe from '../components/RubiksIframe';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'AI Twin Tech';
  }, []);

  return (
    <div className="bg-transparent">
      <section className="relative z-0">
        <RubiksIframe height="100vh" />
      </section>
    </div>
  );
};

export default HomePage;