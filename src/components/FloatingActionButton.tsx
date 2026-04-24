export interface FloatingActionButtonProps {
  onClick: () => void;
  label?: string;
}

export default function FloatingActionButton({ onClick, label = 'Add' }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-dusty-rose hover:bg-dusty-rose-dark text-white font-bold shadow-lg flex items-center justify-center z-30"
      title={label}
    >
      +
    </button>
  );
}
