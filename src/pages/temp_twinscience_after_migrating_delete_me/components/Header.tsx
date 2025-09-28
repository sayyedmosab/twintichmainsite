export function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg border-b-4 border-blue-600">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white flex items-center justify-center">
            <span className="text-slate-900 font-bold text-xl">TT</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">TwinScience Learning Hub</h1>
            <p className="text-gray-300 mt-2 text-lg">
              Explore the future of digital twin technology through our curated learning paths.
            </p>
          </div>
        </div>
        <div className="flex gap-2 text-sm text-gray-300">
          <span className="bg-slate-800 px-3 py-1 border border-gray-600">Interactive Learning</span>
          <span className="bg-slate-800 px-3 py-1 border border-gray-600">Multi-Format Content</span>
          <span className="bg-slate-800 px-3 py-1 border border-gray-600">Progress Tracking</span>
        </div>
      </div>
    </header>
  );
}