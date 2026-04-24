import { useState } from 'react';
import { UserProfile, TopicCategory, AdvocacyPersona } from '@/types';
import { topicLabels, personaDescriptions } from '@/data/opportunities';

export interface QuizProps {
  onComplete: (profile: UserProfile) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTopics, setSelectedTopics] = useState<TopicCategory[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<AdvocacyPersona | null>(null);
  const [location, setLocation] = useState('');

  const topics: TopicCategory[] = ['EnvironmentalJustice', 'HumanRights', 'AnimalWelfare', 'PoliticalAdvocacy', 'EducationAccess', 'HealthEquity', 'EconomicJustice', 'SocialJustice'];
  const personas: AdvocacyPersona[] = ['organizer', 'educator', 'supporter'];

  const handleNext = () => {
    if (step === 1 && selectedTopics.length === 0) {
      alert('Select at least one topic');
      return;
    }
    if (step === 2 && !selectedPersona) {
      alert('Select your style');
      return;
    }
    if (step === 3 && !location.trim()) {
      alert('Enter location');
      return;
    }
    if (step < 3) {
      setStep((step + 1) as any);
    } else {
      onComplete({ selectedTopics, persona: selectedPersona!, location });
    }
  };

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex gap-1 mb-4">
            {[1,2,3].map(s => <div key={s} className={`flex-1 h-2 rounded ${s <= step ? 'bg-sage-green' : 'bg-gray-300'}`}></div>)}
          </div>
          <p className="text-sm text-center text-dark-grey">Step {step}/3</p>
        </div>
        <div className="card p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">What do you care about?</h2>
              <p className="text-dark-grey mb-6">Select areas that matter</p>
              <div className="grid grid-cols-2 gap-3">
                {topics.map(t => (
                  <button key={t} onClick={() => setSelectedTopics(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])} className={`p-4 border-2 rounded ${selectedTopics.includes(t) ? 'border-sage-green bg-sage-green-light' : 'border-gray-200'}`}>
                    {topicLabels[t]}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">How much energy?</h2>
              <p className="text-dark-grey mb-6">Pick your style</p>
              <div className="space-y-2">
                {personas.map(p => (
                  <label key={p} className="flex items-center p-3 border-2 rounded cursor-pointer" style={{borderColor: selectedPersona === p ? '#9CAF88' : '#e5e7eb'}}>
                    <input type="radio" checked={selectedPersona === p} onChange={() => setSelectedPersona(p)} className="w-4 h-4 mr-3" />
                    <div>
                      <p className="font-semibold">{p === 'organizer' ? 'Organizer' : p === 'educator' ? 'Educator' : 'Supporter'}</p>
                      <p className="text-xs text-gray-600">{personaDescriptions[p]}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Where are you?</h2>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="City or zip" className="w-full px-4 py-2 border-2 border-gray-300 rounded mb-4" />
            </div>
          )}
          <div className="mt-6 flex gap-2">
            {step > 1 && <button onClick={() => setStep((step - 1) as any)} className="btn-secondary flex-1">Back</button>}
            <button onClick={handleNext} className="btn-primary flex-1">{step === 3 ? 'Continue' : 'Next'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
