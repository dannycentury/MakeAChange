import { useState } from 'react';
import Quiz from '@/components/Quiz';
import OpportunitiesFeed from '@/components/OpportunitiesFeed';
import { UserProfile } from '@/types';

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userName] = useState('Danny');

  return (
    <div className="min-h-screen bg-off-white font-sans">
      {!userProfile ? (
        <Quiz onComplete={setUserProfile} />
      ) : (
        <OpportunitiesFeed
          userProfile={userProfile}
          userName={userName}
          onQuizRestart={() => setUserProfile(null)}
        />
      )}
    </div>
  );
}
