import { cn } from "@/lib/utils";

interface AvatarInitialsProps {
  initials: string;
  isOnline?: boolean;
  className?: string;
}

export function AvatarInitials({ initials, isOnline, className }: AvatarInitialsProps) {
  const getInitialsColor = (initials: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-cyan-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    
    const charCode = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
    return colors[charCode % colors.length];
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "flex items-center justify-center rounded-full text-white font-medium text-sm",
        "w-10 h-10",
        getInitialsColor(initials)
      )}>
        {initials}
      </div>
      {isOnline && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      )}
    </div>
  );
}