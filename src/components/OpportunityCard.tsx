import { MatchedOpportunity, AdvocacyPersona } from '@/types';
import { getPersonaLabel, isPerfectMatch } from '@/lib/matching';
import { topicLabels } from '@/data/opportunities';

export interface OpportunityCardProps {
  opportunity: MatchedOpportunity;
  userPersona: AdvocacyPersona;
}

export default function OpportunityCard({ opportunity, userPersona }: OpportunityCardProps) {
  const perfect = isPerfectMatch(opportunity, userPersona);
  return (
    <div className="card p-0 overflow-hidden mb-4">
      <div className="bg-muted-yellow px-4 py-3 border-b-4 border-charcoal">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-sage-green border-4 border-charcoal"></div>
          <p className="text-sm text-charcoal font-semibold">Perfect for: <span className="text-dusty-rose font-bold">{getPersonaLabel(opportunity.matchingRole)}</span></p>
          {perfect && <span className="ml-auto text-xs bg-charcoal text-white px-3 py-1 rounded-full">Exact Match</span>}
        </div>
      </div>
      <div className="p-5">
        {opportunity.imageSrc && <div className="mb-4 -mx-5 -mt-5 h-48 bg-gray-200 overflow-hidden border-b-4 border-charcoal rounded-t-3xl"><img src={opportunity.imageSrc} alt={opportunity.title} className="w-full h-full object-cover" /></div>}
        <h3 className="text-xl font-bold text-charcoal mb-2">{opportunity.title}</h3>
        <p className="text-sm text-dark-grey mb-3 font-semibold">{opportunity.organization}</p>
        <div className="space-y-3 mb-4 text-sm">
          {opportunity.date && <div className="flex items-center gap-2 text-dark-grey"><span>📅</span><span>{opportunity.date}</span></div>}
          {opportunity.location && <div className="flex items-center gap-2 text-dark-grey"><span>📍</span><span>{opportunity.location}</span></div>}
          {opportunity.topics.length > 0 && <div className="flex items-start gap-2"><span>🏷️</span><div className="flex flex-wrap gap-2">{opportunity.topics.map((topic) => <span key={topic} className="text-xs bg-sage-green-light text-charcoal px-3 py-1 rounded-full border-2 border-charcoal">{topicLabels[topic]}</span>)}</div></div>}
        </div>
        <p className="text-sm text-dark-grey leading-relaxed mb-4 line-clamp-2">{opportunity.description}</p>
        <div className="mb-4 flex items-center gap-2">
          <div className="flex-1 h-2 bg-charcoal rounded-full overflow-hidden"><div className="h-full bg-sage-green rounded-full transition-all" style={{ width: `${opportunity.matchScore}%` }}></div></div>
          <span className="text-xs text-charcoal font-bold">{Math.round(opportunity.matchScore)}% match</span>
        </div>
        <button className="btn-primary w-full">View Full Opportunity Plan</button>
      </div>
    </div>
  );
}
