import { TopicCategory } from '@/types';
import { topicLabels } from '@/data/opportunities';

export interface TopicFilterBarProps {
  topics: TopicCategory[];
  activeTopics: TopicCategory[];
  onFilterChange: (topic: TopicCategory) => void;
}

export default function TopicFilterBar({ topics, activeTopics, onFilterChange }: TopicFilterBarProps) {
  return (
    <div className="border-b border-gray-100 bg-white sticky top-16 z-40">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {topics.map((topic) => {
            const isActive = activeTopics.includes(topic);
            return (
              <button
                key={topic}
                onClick={() => onFilterChange(topic)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'bg-sage-green text-white' : 'bg-gray-100 text-charcoal'
                }`}
              >
                {topicLabels[topic]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
