"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  Home,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Ticket,
  Database,
  MessageSquare,
  UserCheck,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
}

const sidebarItems = [
  { icon: MessageCircle, label: "Chat", path: "/" },
  { icon: Home, label: "Home", path: "/home" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: Ticket, label: "Tickets", path: "/tickets" },
  { icon: Database, label: "Database", path: "/database" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: MessageSquare, label: "Broadcast", path: "/broadcast" },
  { icon: Users, label: "Teams", path: "/teams" },
  { icon: UserCheck, label: "Contacts", path: "/contacts" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "w-16 bg-sidebar border-r border-border flex flex-col items-center py-4 space-y-4",
        className
      )}
    >
      {/* Navigation Items */}
      <nav className="flex flex-col space-y-2 flex-1">
        {sidebarItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(item.path)}
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              "hover:bg-secondary",
              pathname === item.path
                ? "bg-primary hover:bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-primary/20"
            )}
          >
            <item.icon className="w-5 h-5" />
          </motion.button>
        ))}
      </nav>

      {/* Logout Button */}
      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
      >
        <LogOut className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}
