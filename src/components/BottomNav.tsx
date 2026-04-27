export type NavItem = 'home' | 'path' | 'connect' | 'resources';

export interface BottomNavProps {
  active: NavItem;
  onNavChange: (item: NavItem) => void;
}

export default function BottomNav({ active, onNavChange }: BottomNavProps) {
  const navItems: Array<{ id: NavItem; label: string; icon: string }> = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'path', label: 'Path', icon: '🛤️' },
    { id: 'connect', label: 'Connect', icon: '🤝' },
    { id: 'resources', label: 'Resources', icon: '📚' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-charcoal shadow-hard">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-around h-[72px]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-full border-4 border-charcoal ${
              active === item.id ? 'bg-muted-yellow text-charcoal' : 'bg-white text-dark-grey'
            } font-bold text-xs`}>

            <span className="text-2xl">{item.icon}</span>
            <span className="text-[0.72rem] font-bold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
