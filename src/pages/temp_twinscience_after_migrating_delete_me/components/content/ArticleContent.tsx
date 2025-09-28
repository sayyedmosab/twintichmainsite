import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ArticleContentProps {
  episode: {
    id: string;
    title: string;
    description: string;
  };
}

export function ArticleContent({ episode }: ArticleContentProps) {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 p-6">
      {/* Main Article Content */}
      <div className="flex-grow bg-white border border-gray-300 shadow-lg overflow-hidden">
        <article className="h-full flex flex-col">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1753692400335-88e37779b471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU4OTIwMzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Article banner"
            className="w-full h-64 object-cover"
          />
          <div className="p-8 flex-grow overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{episode.title}</h1>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <p className="text-lg text-gray-600 mb-6">{episode.description}</p>
              
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
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
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
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
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