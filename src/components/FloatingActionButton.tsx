export interface FloatingActionButtonProps {
  onClick: () => void;
  label?: string;
}

export default function FloatingActionButton({ onClick, label = 'Add' }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-16 h-16 rounded-full bg-muted-yellow text-charcoal font-black border-4 border-charcoal shadow-hard flex items-center justify-center z-30 hover:translate-x-[-2px] hover:-translate-y-2 transition-transform"
      title={label}
    >
      +
    </button>
  );
}
