interface StarterMenuItemProps {
  sprite: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export default function StarterMenuItem({
  sprite,
  name,
  isSelected,
  onClick,
  index,
}: StarterMenuItemProps) {
  return (
    <button
      className={`w-16 py-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
        isSelected ? "bg-gray-600" : "hover:bg-gray-700/80 bg-gray-800/90"
      } hover:scale-110 active:scale-95`}
      onClick={onClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <img 
        src={sprite} 
        alt={name} 
        className="w-12 h-12 object-contain drop-shadow-lg" 
      />
      
      <style jsx>{`
        button {
          animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
          transform: translateX(20px);
        }
        
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </button>
  );
}
