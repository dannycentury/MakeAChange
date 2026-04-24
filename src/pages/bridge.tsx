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
    <div className="min-h-screen bg-off-white font-sans pb-20">
      <Header userName="Danny" />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-charcoal mb-2">Bridging the Gap: Your Campus & New Orleans</h1>
        <div className="bg-dusty-rose p-4 rounded-lg mb-6">
          <p className="text-sm text-charcoal">
            <strong>Pro-Tip:</strong> Even if the University is neutral on this issue, you can use SGA funding or campus meeting rooms to organize your own event.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab('campus')}
            className={`flex-1 py-3 px-4 text-center font-medium rounded-l-lg ${
              activeTab === 'campus' ? 'bg-sage-green text-white' : 'bg-white text-charcoal border'
            }`}
          >
            On Campus
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex-1 py-3 px-4 text-center font-medium rounded-r-lg ${
              activeTab === 'community' ? 'bg-dusty-rose text-white' : 'bg-white text-charcoal border'
            }`}
          >
            In the City
          </button>
        </div>

        {/* Resources List */}
        <div className="grid gap-4 md:grid-cols-2">
          {currentResources.map((resource, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-charcoal mb-2">{resource.title}</h3>
              <p className="text-dark-grey mb-3">{resource.description}</p>
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded ${
                  resource.category === 'campus' ? 'bg-sage-green text-white' : 'bg-dusty-rose text-white'
                }`}>
                  {resource.type}
                </span>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-green hover:underline text-sm"
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