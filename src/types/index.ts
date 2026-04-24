// Role types representing the three personas
export type AdvocacyPersona = 'organizer' | 'educator' | 'supporter';

// Topic categories
export type TopicCategory = 
  | 'EnvironmentalJustice'
  | 'HumanRights'
  | 'AnimalWelfare'
  | 'PoliticalAdvocacy'
  | 'EducationAccess'
  | 'HealthEquity'
  | 'EconomicJustice'
  | 'SocialJustice';

// User's quiz answers
export interface UserProfile {
  selectedTopics: TopicCategory[];
  persona: AdvocacyPersona | null;
  location: string;
}

// Opportunity object with all metadata
export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  date: string;
  imageSrc?: string;
  description: string;
  topics: TopicCategory[];
  role_tags: AdvocacyPersona[]; // Which personas this opportunity suits
  cta_link: string;
}

// Matching result for display
export interface MatchedOpportunity extends Opportunity {
  matchingRole: AdvocacyPersona; // Which role matched this opportunity
  matchScore: number; // 0-100 indicating quality of match
}

// Resource for the bridge feature
export interface Resource {
  title: string;
  description: string;
  type: string;
  link: string;
  category: 'campus' | 'community';
}
