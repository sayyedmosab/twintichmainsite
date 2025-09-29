import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
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
  const lessonId = episode.id.replace('-', '.');
  const studyPath = `/article-assets/${lessonId}/${lessonId}.study.md`;
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(studyPath)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(text => {
        setMarkdown(text);
        setError(false);
      })
      .catch(() => {
        setMarkdown(null);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [studyPath]);
  // (removed orphaned array/object)


  if (loading) {
    return <div className="w-full max-w-4xl mx-auto my-8 p-6 text-center text-gray-500">Loading study guide...</div>;
  }
  if (!error && markdown) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 p-6 bg-white border-2 border-gray-300 shadow-xl overflow-auto" style={{ maxHeight: '90vh' }}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    );
  }
  // fallback: show interactive guide if no .study.md file
  // Minimal fallback UI:
  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 text-center text-gray-500">
      No study guide found for this episode.
    </div>
  );
}