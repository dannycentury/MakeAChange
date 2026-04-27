import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import BottomNav, { NavItem } from '@/components/BottomNav';
import { resources } from '@/data/opportunities';

export default function Bridge() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'campus' | 'community'>('campus');

  const handleNavChange = (item: NavItem) => {
    if (item === 'home') {
      router.push('/');
    } else if (item === 'resources') {
      // stay
    } else {
      // for now, stay or handle others
    }
  };

  const campusResources = resources.filter(r => r.category === 'campus');
  const communityResources = resources.filter(r => r.category === 'community');

  const currentResources = activeTab === 'campus' ? campusResources : communityResources;

  return (
    <div className="min-h-screen bg-off-white font-sans pb-24">
      <Header userName="Danny" />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-black text-charcoal mb-2" style={{ textShadow: '2px 2px 0px #2C2C2C, 4px 4px 0px #B2C2A2' }}>
          Bridging the Gap: Your Campus & New Orleans
        </h1>
        <div className="bg-muted-yellow p-4 border-4 border-charcoal rounded-3xl mb-6">
          <p className="text-sm text-charcoal font-bold">
            <strong>Pro-Tip:</strong> Even if the University is neutral on this issue, you can use SGA funding or campus meeting rooms to organize your own event.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 gap-3">
          <button
            onClick={() => setActiveTab('campus')}
            className={`flex-1 py-3 px-4 text-center font-bold rounded-full border-4 border-charcoal ${
              activeTab === 'campus' ? 'bg-sage-green text-white' : 'bg-white text-charcoal'
            }`}
          >
            On Campus
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex-1 py-3 px-4 text-center font-bold rounded-full border-4 border-charcoal ${
              activeTab === 'community' ? 'bg-dusty-rose text-white' : 'bg-white text-charcoal'
            }`}
          >
            In the City
          </button>
        </div>

        {/* Resources List */}
        <div className="grid gap-4 md:grid-cols-2">
          {currentResources.map((resource, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl border-4 border-charcoal shadow-hard">
              <h3 className="text-lg font-black text-charcoal mb-2">{resource.title}</h3>
              <p className="text-dark-grey mb-3 font-medium">{resource.description}</p>
              <div className="flex justify-between items-center gap-4">
                <span className={`text-xs px-3 py-2 rounded-full font-bold border-4 border-charcoal ${
                  resource.category === 'campus' ? 'bg-sage-green text-white' : 'bg-dusty-rose text-white'
                }`}>
                  {resource.type}
                </span>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal font-bold text-sm border-b-4 border-charcoal pb-1"
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="resources" onNavChange={handleNavChange} />
    </div>
  );
}