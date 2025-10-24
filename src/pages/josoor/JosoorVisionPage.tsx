import React, { useEffect } from 'react';

const JosoorVisionPage: React.FC = () => {
  useEffect(() => {
    document.title = 'AI Twin Tech - Josoor Vision';
  }, []);


  return (
    <div className="josoor-vision-page">
        <div className="relative shadow-2xl min-h-[80vh] flex items-start justify-center">
            <div className="max-w-full mx-auto px-2 w-full" style={{ fontFamily: 'Tajawal, Calibri, Arial, sans-serif' }}>
              <div className="relative p-2 md:p-4 text-white mx-auto" style={{ zIndex: 20 }}>
                <div className="grid grid-cols-1 lg:grid-cols-[3.5fr_1fr] gap-0 items-start min-h-[80vh]">
                  {/* Left: single text column (both previous columns stacked) - spans 2/3 */}
                  <div>
                    <div className="w-full bg-black/70 p-3 md:p-4 pl-4 lg:pl-12" style={{ position: 'relative', zIndex: 30 }}>
                      <h1 className="standardized-title text-white mb-6 text-3xl md:text-4xl">Founder's Letter: Origins</h1>
                      <div className="prose prose-invert text-white text-lg" style={{ lineHeight: 1.9, maxWidth: 'none' }}>
                        <p>
                          Just over two years ago was my first introduction to GenAI. What started as a basic ask to ChatGPT to design a training program to teach me "AI", continued non-stop over the entire weekend to end with contemplating how unlocking the human potential is not in the pursuit of answers but rather the articulation of the right questions. And from that came the concept of the Living Transformation Network, a semi-sentient network of AIs carrying one mission to improve humanity and life by taking over the complexity of society and daring us to think.
                        </p>
                        <p>
                          <strong>"What do we do with all the spare time we will have?"</strong>
                        </p>
                        <p>
                          That experience changed me forever. I even published the wild interaction in a LinkedIn article, with the aim of helping other skeptics or on the fence seniors to make the jump and embrace AI.
                        </p>

                        <p>
                          Since then, I have been pursuing that specific concept. Which at its core is "how to make transformation management push back and control the complexity beast?" I continued to design the model itself. Yet after six months, even with a sound model that took all the complexity and jammed it into a relational database, <strong>the AI tech was still not there yet</strong>, and a solution then meant investing the old way (licenses, infra., coders etc.).
                        </p>

                        <p>
                          So I kept it on a slow burner, refining and tweaking based on real life client setups I encounter.
                        </p>
                        <p>
                          Until a few months back. GenAI started to make significant leaps in capabilities, and the AI development tools and communities advanced with more "no coding" solutions. Suddenly, the fire power needed to navigate the complex maze of relations was not only available, but remarkably affordable. Not only that, but cloud hosting had also a breakthrough with Azure certified by the government after years of a no-cloud hosting policy.
                        </p>

                        <p>
                          <strong>I had no choice, no excuse and no regrets in chasing this dream.</strong>
                        </p>
                        <p>
                          All my career I was a pioneer, but for others' benefit. This was my chance to flip the script and pioneer with no constraints. In fact, part of the fuel behind this was all the bottled up "red-tape" frustration. I am pursuing this all the way Inshallah.
                        </p>
                        <p>
                          I hope once the concept and its national benefis clicks, you will join me in this journey, whether as an Architect or a Builder, so we give it the best chance of success.
                        </p>
                        <p className="mt-6">
                          <strong>CEO/Founder - Mosab Sayyed</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: side image replacing the right column */}
                  <div className="hidden lg:block lg:col-span-1 self-start p-0 m-0 pr-4 lg:pr-12">
                    <img src="/images/think.png" alt="Thinking" className="h-auto object-top block" style={{ width: 'auto', maxWidth: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
};

export default JosoorVisionPage;
