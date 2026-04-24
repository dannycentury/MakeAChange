import { UserProfile, TopicCategory } from '@/types';
import Header from './Header';
import TopicFilterBar from './TopicFilterBar';
import OpportunityCard from './OpportunityCard';
import ValidationPulse from './ValidationPulse';
import BottomNav, { NavItem } from './BottomNav';
import FloatingActionButton from './FloatingActionButton';
import { opportunities, personaNames } from '@/data/opportunities';
import { filterOpportunitiesByProfile } from '@/lib/matching';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function OpportunitiesFeed({ userProfile, userName, onQuizRestart }: any) {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState<NavItem>('home');
  const [visibleTopics, setVisibleTopics] = useState<TopicCategory[]>(userProfile.selectedTopics);

  const handleNavChange = (item: NavItem) => {
    setActiveNav(item);
    if (item === 'resources') {
      router.push('/bridge');
    }
    // Add other navigation logic if needed
  };

  const allTopics: TopicCategory[] = Array.from(new Set(opportunities.flatMap((opp: any) => opp.topics))).sort();
  const matchedOpportunities = filterOpportunitiesByProfile(opportunities, userProfile);
  const filteredOpportunities = matchedOpportunities.filter((opp: any) => opp.topics.some((t: any) => visibleTopics.includes(t)));

  return (
    <div className="pb-20">
      <Header userName={userName} />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-charcoal mb-1">{userName}'s Path</h2>
        <p className="text-dark-grey">Tailored for {personaNames[userProfile.persona]}</p>
      </div>
      <TopicFilterBar topics={allTopics} activeTopics={visibleTopics} onFilterChange={(t: any) => setVisibleTopics(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])} />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <ValidationPulse />
        {filteredOpportunities.length > 0 ? (
          <div>
            <p className="text-sm text-gray-600 mb-4">Found {filteredOpportunities.length} opportunities</p>
            {filteredOpportunities.map((opp: any) => (
              <OpportunityCard key={opp.id} opportunity={opp} userPersona={userProfile.persona} />
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <p className="mb-4">No matches found</p>
            <button onClick={() => setVisibleTopics(userProfile.selectedTopics)} className="btn-primary">Show All</button>
          </div>
        )}
      </main>
      <BottomNav active={activeNav} onNavChange={handleNavChange} />
      <FloatingActionButton onClick={onQuizRestart} />
    </div>
  );
}
