import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { userApi } from "@/lib/api/user";
import type { User } from "@/types/user";
import { AvatarInitials } from "@/components/shared/avatar-initials";

interface AssignContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (contactId: string) => void;
  currentContactId: string;
}

export function AssignContactModal({
  isOpen,
  onClose,
  onAssign,
  currentContactId,
}: AssignContactModalProps) {
  const [users, setUsers] = useState<Pick<User, "id" | "name">[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchUsers = async () => {
        setIsLoading(true);
        try {
          const response = await userApi.getUsers();
          setUsers(response.filter((user) => user.id !== currentContactId));
        } catch (err) {
          toast.error("Failed to fetch users");
        } finally {
          setIsLoading(false);
        }
      };
      fetchUsers();
    }
  }, [isOpen, currentContactId]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId) {
      onAssign(selectedUserId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card rounded-lg w-full max-w-md max-h-[85vh] overflow-hidden shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold">Assign Contact</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 text-sm"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* User list */}
          <div className="overflow-y-auto max-h-[45vh] p-2 space-y-1">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors ${
                  selectedUserId === user.id
                    ? "bg-primary/10 border border-primary"
                    : "hover:bg-muted/40"
                }`}
              >
                <AvatarInitials name={user.name} />
                <span className="font-medium text-sm truncate">
                  {user.name}
                </span>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No users found
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 p-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!selectedUserId || isLoading}
            >
              Assign
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
