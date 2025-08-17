import { cn } from "@/lib/utils";

interface AvatarInitialsProps {
  name?: string; // full name instead of initials
  isOnline?: boolean;
  className?: string;
}

export function AvatarInitials({
  name,
  isOnline,
  className,
}: AvatarInitialsProps) {
  const getInitialsFromName = (name?: string) => {
    if (!name) return "";

    const parts = name.trim().split(/\s+/); // split by spaces
    if (parts.length === 1) {
      return parts[0][0]?.toUpperCase() ?? "";
    }

    const first = parts[0][0]?.toUpperCase() ?? "";
    let second = "";

    if (parts.length > 2) {
      // if last name exists
      second = parts[parts.length - 1][0]?.toUpperCase() ?? "";
    } else {
      // fallback to middle name if no last name
      second = parts[1][0]?.toUpperCase() ?? "";
    }

    return first + second;
  };

  const getInitialsColor = (name?: string) => {
    const colors = [
      "bg-red-500",
      "bg-red-600",
      "bg-orange-500",
      "bg-orange-600",
      "bg-amber-500",
      "bg-amber-600",
      "bg-yellow-500",
      "bg-yellow-600",
      "bg-lime-500",
      "bg-lime-600",
      "bg-green-500",
      "bg-green-600",
      "bg-emerald-500",
      "bg-emerald-600",
      "bg-teal-500",
      "bg-teal-600",
      "bg-cyan-500",
      "bg-cyan-600",
      "bg-sky-500",
      "bg-sky-600",
      "bg-blue-500",
      "bg-blue-600",
      "bg-indigo-500",
      "bg-indigo-600",
      "bg-violet-500",
      "bg-violet-600",
      "bg-purple-500",
      "bg-purple-600",
      "bg-fuchsia-500",
      "bg-fuchsia-600",
      "bg-pink-500",
      "bg-pink-600",
      "bg-rose-500",
      "bg-rose-600",
    ];

    if (!name) return colors[0];

    // Simple hash function based on the full name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
      hash |= 0; // Convert to 32bit integer
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitialsFromName(name);
  const bgColor = getInitialsColor(name);

  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center justify-center rounded-full text-white font-medium text-sm",
          "w-10 h-10",
          bgColor,
          className
        )}
      >
        {initials}
      </div>
      {isOnline && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      )}
    </div>
  );
}
