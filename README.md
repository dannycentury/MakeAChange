# MakeYourChange

A web-based activism matching tool designed specifically for university students to find activism and advocacy opportunities tailored to their interests and engagement style.

## Project Overview

**MakeYourChange** helps students discover social impact opportunities based on their "Advocacy Persona" (The Organizer, The Educator, or The Quiet Supporter) and areas of concern (e.g., Human Rights, Animal Welfare).

### Key Features

- **3-Step Interactive Quiz**: Guides users through selecting topics, advocacy style, and location
- **Role-Based Matching Algorithm**: Intelligently filters opportunities based on user profile
- **Beautiful, Calm UI**: Clean, professional design with Sage Green and Dusty Rose accents
- **Responsive Feed Design**: Card-based layout inspired by modern social platforms
- **Topic Filtering**: Horizontal scrollable filter bar to refine opportunities by topic
- **Bottom Navigation**: Easy navigation between Home, My Path, Connect, and Resources
- **Floating Action Button**: Quick access to restart the quiz

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.tsx              # Top navigation with logo and user avatar
│   ├── Quiz.tsx                # 3-step onboarding quiz
│   ├── OpportunityCard.tsx     # Individual opportunity card
│   ├── OpportunitiesFeed.tsx   # Main feed/results page
│   ├── TopicFilterBar.tsx      # Horizontal topic filter
│   ├── BottomNav.tsx           # Bottom navigation bar
│   └── FloatingActionButton.tsx # FAB for quiz restart
├── data/
│   └── opportunities.ts  # Mock opportunities database
├── lib/
│   └── matching.ts       # Core matching algorithm logic
├── pages/
│   ├── _app.tsx         # Next.js app wrapper
│   ├── _document.tsx    # Next.js document structure
│   └── index.tsx        # Main entry point
├── styles/
│   └── globals.css      # Global Tailwind styles
└── types/
    └── index.ts         # TypeScript type definitions
```

## Data Schema

### Opportunity Object

```typescript
interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  date: string;
  imageSrc?: string;
  description: string;
  topics: TopicCategory[];
  role_tags: AdvocacyPersona[];  // 'organizer' | 'educator' | 'supporter'
  cta_link: string;
}
```

### User Profile

```typescript
interface UserProfile {
  selectedTopics: TopicCategory[];
  persona: AdvocacyPersona;
  location: string;
}
```

## Matching Logic

The matching algorithm operates with the following priority:

1. **Role Match (60 points)**: Direct match with persona
2. **Topic Match (40 points)**: Opportunities aligned with selected topics
3. **Minimum Score**: Opportunities must have at least some match to appear

Results are sorted by match score (highest first) with tie-breaking by topic overlap count.

### Fallback Logic

If a user selects "I want to help quietly" (supporter) and no exact supporter-tagged opportunities are found, the algorithm shows "General Interest" results while clearly labeling them.

## Design System

### Color Palette

- **Main Accent**: Sage Green (`#9CAF88`) - calm, professional
- **Secondary Accent**: Dusty Rose Pink (`#D4A5A5`) - gentle CTAs
- **Background**: Off-white (`#F9F9F7`) - clean, unobtrusive
- **Text**: Dark Grey/Charcoal (`#2C2C2C`, `#4A4A4A`) - readable, calm

### Typography

- **Font Family**: Poppins, Inter (fallback: system-ui)
- **Headings**: Bold, Charcoal
- **Body Text**: Dark Grey with strong hierarchy

### Component Styling

- **Cards**: White background, soft shadows, 12px border radius
- **Buttons**: Full-width on mobile, Dusty Rose primary, Sage Green secondary
- **Interactions**: Smooth transitions, hover states on all interactive elements

## User Flow

1. **Entry**: User lands on welcome screen
2. **Quiz - Step 1**: Select topics of interest (multi-select)
3. **Quiz - Step 2**: Choose advocacy persona (radio selection)
4. **Quiz - Step 3**: Enter location (text input)
5. **Results**: Personalized feed with matched opportunities
6. **Filtering**: Use topic filter bar to refine results
7. **Navigation**: Switch between sections via bottom nav
8. **Restart**: Use FAB to take quiz again

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Components Guide

### Header
- Displays logo and user avatar
- Sticky positioning for persistent visibility
- Responsive design

### Quiz
- 3-step interactive form with progress indicator
- Input validation at each step
- Visual feedback for selections
- Summary review before submission

### OpportunityCard
- Role match highlighting at top
- Optional banner image
- Metadata (date, location, topics)
- Match score visualization
- Call-to-action button

### OpportunitiesFeed
- Displays personalized opportunity feed
- Header with persona info
- Topic filtering capability
- Empty state handling
- Navigation integration

### TopicFilterBar
- Horizontal scrollable topic buttons
- Active state highlighting in Sage Green
- Click to toggle topic visibility

### BottomNav
- Fixed bottom navigation with 4 tabs
- Active tab highlighting
- Icon + label design
- Mobile-optimized layout

### FloatingActionButton
- Fixed button for quiz restart
- Positioned above bottom nav
- Hover scale animation
- Gentle Dusty Rose color

## Matching Algorithm Details

### Score Calculation

```typescript
const roleMatch = persona in opportunity.role_tags ? 60 : 20
const topicScore = (matchingTopics / totalTopics) * 40
const totalScore = roleMatch + topicScore
```

### Filtering

Opportunities are included only if `totalScore > 0`. Multi-topic matches are weighted by overlap percentage.

### Sorting

Primary: Match score (descending)
Secondary: Topic overlap count (descending)

## State Management

The app uses React `useState` for state management:

- **Home Page**: Toggles between Quiz and Feed based on userProfile state
- **Quiz**: Manages step progression and form inputs
- **Feed**: Manages active navigation and visible topic filters

## API Integration Points

Currently using mock data. Future integration points:

- `GET /api/opportunities` - Fetch opportunities from backend
- `POST /api/user-profile` - Save user profile
- `GET /api/recommendations` - Get personalized recommendations
- `POST /api/track-engagement` - Track user interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Lazy loading for opportunity images
- Smooth scrolling on filter bar
- Optimized re-renders via React best practices
- Tailwind CSS for minimal CSS output
- Next.js automatic code splitting

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Form labels and ARIA attributes
- Keyboard navigation support
- Color contrast meets WCAG AA standards

## Future Enhancements

- [ ] Save opportunities to "My Path"
- [ ] Share opportunities with friends
- [ ] Event registration integration
- [ ] User testimonials/reviews
- [ ] Admin dashboard for opportunity management
- [ ] Analytics tracking
- [ ] Mobile app version
- [ ] Notification system
- [ ] Opportunity calendar view
- [ ] Organization profiles

## Development Notes

### Adding New Topics

Edit `src/data/opportunities.ts` and add to `topicLabels`:

```typescript
export const topicLabels: Record<string, string> = {
  'NewTopic': 'New Topic Label',
  // ...
};
```

### Modifying Colors

Edit `tailwind.config.js` in the `theme.extend.colors` section:

```javascript
colors: {
  'sage-green': '#9CAF88',
  // customize as needed
}
```

### Adding New Opportunities

Add objects to the `opportunities` array in `src/data/opportunities.ts`:

```typescript
{
  id: 'unique-id',
  title: 'Opportunity Title',
  // ... other fields
}
```

## License

MIT

## Questions?

For questions or issues, please refer to the main project documentation or contact the development team.