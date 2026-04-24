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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 ${
              active === item.id ? 'text-sage-green' : 'text-dark-grey'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
