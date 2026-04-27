export interface HeaderProps {
  userName: string;
  userAvatarUrl?: string;
}

export default function Header({ userName, userAvatarUrl }: HeaderProps) {
  return (
    <header className="bg-white border-b-4 border-charcoal shadow-hard sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sage-green flex items-center justify-center border-3 border-charcoal">
            <span className="text-white font-bold text-sm">✓</span>
          </div>
          <h1 className="text-2xl font-black text-sage-green" style={{
            textShadow: '2px 2px 0px #2C2C2C, 4px 4px 0px #B2C2A2, 6px 6px 0px #E2A4A4'
          }}>MakeYourChange</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-dark-grey">{userName}</span>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dusty-rose to-sage-green flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:opacity-80 transition-opacity" title={userName}>
            {userAvatarUrl ? <img src={userAvatarUrl} alt={userName} className="w-full h-full rounded-full object-cover" /> : userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
