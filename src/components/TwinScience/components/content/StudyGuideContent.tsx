import { useState } from 'react';
import { CheckCircle, Circle, BookOpen, Target, Lightbulb } from 'lucide-react';

interface StudyGuideContentProps {
  episode: {
    id: string;
    title: string;
    description: string;
  };
}

interface StudyItem {
  id: string;
  type: 'question' | 'concept' | 'practice';
  title: string;
  content: string;
  completed: boolean;
}

export function StudyGuideContent({ episode }: StudyGuideContentProps) {
  const [studyItems, setStudyItems] = useState<StudyItem[]>([
    {
      id: '1',
      type: 'question',
      title: 'Understanding Core Concepts',
      content: 'What is the primary purpose of a digital twin, and how does it differ from a standard 3D model or simulation?',
      completed: false
    },
    {
      id: '2',
      type: 'concept',
      title: 'Real-time Data Synchronization',
      content: 'Explain the role of real-time data synchronization in the functionality of a digital twin. Why is this bidirectional connection crucial?',
      completed: false
    },
    {
      id: '3',
      type: 'practice',
      title: 'Industry Applications',
      content: 'Identify three different industries where digital twins are currently being used and describe the specific benefits in each case.',
      completed: false
    },
    {
      id: '4',
      type: 'question',
      title: 'Implementation Challenges',
      content: 'What are the main technical and organizational challenges companies face when implementing digital twin technology?',
      completed: false
    },
    {
      id: '5',
      type: 'concept',
      title: 'Data Architecture',
      content: 'Describe the key components of a digital twin data architecture and how they work together to provide real-time insights.',
      completed: false
    }
  ]);

  const toggleCompletion = (id: string) => {
    setStudyItems(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = studyItems.filter(item => item.completed).length;
  const progressPercent = (completedCount / studyItems.length) * 100;

  const getIconForType = (type: string) => {
    switch (type) {
      case 'question': return <Target className="w-5 h-5 text-blue-500" />;
      case 'concept': return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'practice': return <BookOpen className="w-5 h-5 text-green-500" />;
      default: return <Circle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'question': return 'border-blue-200 bg-blue-50';
      case 'concept': return 'border-yellow-200 bg-yellow-50';
      case 'practice': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6">
      <div className="bg-white border-2 border-gray-300 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-8">
          <h2 className="text-3xl font-bold mb-2">Study Guide</h2>
          <h3 className="text-xl mb-4">{episode.title}</h3>
          <p className="text-gray-300 mb-6">{episode.description}</p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{completedCount} of {studyItems.length} completed</span>
            </div>
            <div className="w-full bg-gray-700 h-3">
              <div 
                className="bg-blue-500 h-3 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Study Items */}
        <div className="p-8">
          <div className="space-y-6">
            {studyItems.map((item, index) => (
              <div 
                key={item.id}
                className={`p-6 border-2 transition-all duration-300 ${
                  item.completed 
                    ? 'border-green-300 bg-green-50' 
                    : getColorForType(item.type)
                } ${item.completed ? 'opacity-75' : 'hover:shadow-md'}`}
              >
                <div className="flex items-start gap-4">
                  {/* Completion Toggle */}
                  <button
                    onClick={() => toggleCompletion(item.id)}
                    className="mt-1 flex-shrink-0 transition-all duration-200 hover:scale-110"
                  >
                    {item.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      {getIconForType(item.type)}
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-400">#{index + 1}</span>
                    </div>
                    
                    <h4 className={`font-bold mb-2 transition-all duration-200 ${
                      item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h4>
                    
                    <p className={`text-gray-700 leading-relaxed transition-all duration-200 ${
                      item.completed ? 'line-through text-gray-500' : ''
                    }`}>
                      {item.content}
                    </p>

                    {/* Study Tips */}
                    {!item.completed && (
                      <div className="mt-4 p-3 bg-white/50 border border-gray-200">
                        <p className="text-sm text-gray-600">
                          💡 <strong>Study Tip:</strong> {
                            item.type === 'question' ? 'Write your answer in your own words before checking references.' :
                            item.type === 'concept' ? 'Try to explain this concept to someone else or draw a diagram.' :
                            'Research real examples and create your own case study.'
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Completion Message */}
          {completedCount === studyItems.length && (
            <div className="mt-8 p-6 bg-green-600 text-white border-2 border-green-700 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="font-bold text-xl mb-2">Congratulations!</h3>
              <p>You've completed all study items for this episode. Ready for the next challenge?</p>
              <button className="mt-4 bg-white text-green-600 font-semibold px-6 py-2 border border-gray-300 hover:bg-gray-100 transition-colors duration-200">
                Continue Learning
              </button>
            </div>
          )}

          {/* Additional Resources */}
          <div className="mt-8 p-6 bg-gray-50 border border-gray-200">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Additional Resources
            </h4>
            <div className="space-y-2">
              <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                📖 Digital Twin Technology: A Comprehensive Guide
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                🎥 Case Study: Digital Twins in Manufacturing
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                📄 Research Paper: IoT Integration with Digital Twins
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}