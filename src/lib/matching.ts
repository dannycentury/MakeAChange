import { UserProfile, Opportunity, MatchedOpportunity, AdvocacyPersona, TopicCategory } from '@/types';

/**
 * Filters and scores opportunities based on user profile
 * Priority Logic:
 * 1. Exact role match gets highest priority
 * 2. Topic match is secondary
 * 3. If no direct role match, show "General Interest" results but mark clearly
 * 4. Returns sorted by match score (descending)
 */
export function filterOpportunitiesByProfile(
  opportunities: Opportunity[],
  userProfile: UserProfile
): MatchedOpportunity[] {
  if (!userProfile.persona || userProfile.selectedTopics.length === 0) {
    return [];
  }

  const matched: MatchedOpportunity[] = [];

  opportunities.forEach((opp) => {
    // Check if opportunity has matching role
    const roleMatch = userProfile.persona! in opp.role_tags
      ? userProfile.persona
      : null;

    // Check if opportunity has matching topics
    const topicMatches = opp.topics.filter((topic) =>
      userProfile.selectedTopics.includes(topic)
    ).length;

    // Calculate match score (0-100)
    let matchScore = 0;

    // Role match (60 points max) - highest priority
    if (roleMatch && opp.role_tags.includes(roleMatch)) {
      matchScore += 60;
    } else if (opp.role_tags.length > 0) {
      // Partial role match if any matching role exists
      matchScore += 20;
    }

    // Topic match (40 points max)
    if (topicMatches > 0) {
      const topicScore = (topicMatches / opp.topics.length) * 40;
      matchScore += topicScore;
    }

    // Only include if there's some match
    if (matchScore > 0) {
      matched.push({
        ...opp,
        matchingRole: roleMatch || (opp.role_tags[0] as AdvocacyPersona),
        matchScore,
      });
    }
  });

  // Sort by match score descending, then by topic matches descending
  return matched.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    // Tie-breaker: more topic matches
    const aTopicMatches = a.topics.filter((t) =>
      userProfile.selectedTopics.includes(t)
    ).length;
    const bTopicMatches = b.topics.filter((t) =>
      userProfile.selectedTopics.includes(t)
    ).length;
    return bTopicMatches - aTopicMatches;
  });
}

/**
 * Gets label for a persona role
 */
export function getPersonaLabel(persona: AdvocacyPersona): string {
  const labels: Record<AdvocacyPersona, string> = {
    organizer: 'The Organizer',
    educator: 'The Educator',
    supporter: 'The Quiet Supporter',
  };
  return labels[persona];
}

/**
 * Gets emoji/icon representation for persona
 */
export function getPersonaIcon(persona: AdvocacyPersona): string {
  const icons: Record<AdvocacyPersona, string> = {
    organizer: '🎯',
    educator: '📚',
    supporter: '🤝',
  };
  return icons[persona];
}

/**
 * Determines if a match is "perfect" (role-specific)
 */
export function isPerfectMatch(
  opportunity: MatchedOpportunity,
  userPersona: AdvocacyPersona
): boolean {
  return opportunity.role_tags.includes(userPersona);
}
import { Opportunity, AdvocacyPersona, Topic } from '../types';

export function matchOpportunities(
  selectedTopics: Topic[],
  persona: AdvocacyPersona,
  opportunities: Opportunity[]
): Opportunity[] {
  // Filter opportunities that match topics AND prioritize role match
  const matched = opportunities.filter((opp) => {
    const hasMatchingTopic = selectedTopics.some((topic) =>
      opp.topics.includes(topic)
    );
    return hasMatchingTopic;
  });

  // Sort by role match priority
  const sorted = matched.sort((a, b) => {
    const aHasDirectRoleMatch = a.roleTags.includes(persona);
    const bHasDirectRoleMatch = b.roleTags.includes(persona);

    // Direct role matches come first
    if (aHasDirectRoleMatch && !bHasDirectRoleMatch) return -1;
    if (!aHasDirectRoleMatch && bHasDirectRoleMatch) return 1;

    // If both have or don't have direct match, prioritize by how many role tags match
    const aRoleMatches = a.roleTags.filter(
      (tag) => tag === persona
    ).length;
    const bRoleMatches = b.roleTags.filter(
      (tag) => tag === persona
    ).length;

    return bRoleMatches - aRoleMatches;
  });

  return sorted;
}

export function getPersonaName(persona: AdvocacyPersona): string {
  const names: Record<AdvocacyPersona, string> = {
    organizer: 'The Organizer',
    educator: 'The Educator',
    supporting: 'The Quiet Supporter',
  };
  return names[persona];
}

export function getRoleMatchLabel(opportunityRoleTags: AdvocacyPersona[], userPersona: AdvocacyPersona): string {
  if (opportunityRoleTags.includes(userPersona)) {
    return `Perfect for: ${getPersonaName(userPersona)}`;
  }
  return 'General Interest';
}
