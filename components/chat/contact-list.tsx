"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, Check, X } from "lucide-react";
import { AvatarInitials } from "@/components/shared/avatar-initials";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Contact } from "@/types";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

interface ContactListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

export function ContactList({
  contacts,
  selectedContact,
  onSelectContact,
  searchQuery,
  onSearchChange,
  className,
}: ContactListProps) {
  const [search, setSearch] = useState(false);

  // Filter contacts based on searchQuery
  const filteredContacts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.lastMessage?.toLowerCase().includes(query) ||
        contact.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [contacts, searchQuery]);

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className={cn(
        "w-80 h-full bg-card border-r border-border flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="px-4 h-14 border-b border-border flex">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-lg font-semibold">All chats - All</h2>
          <div className="flex space-x-2 text-primary">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearch(true)}
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="icon">
              <Check className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search Input */}
        <AnimatePresence>
          {search && (
            <motion.div
              key="searchOverlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 sm:p-8"
              onClick={() => setSearch(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card rounded-md w-full max-w-xl max-h-[80vh] p-4 shadow-lg flex flex-col"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    autoFocus
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearch(false)}
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Filtered Contacts List */}
                <div className="overflow-y-auto flex-1">
                  {filteredContacts.length === 0 ? (
                    <p className="text-muted-foreground text-center mt-6">
                      No contacts found.
                    </p>
                  ) : (
                    filteredContacts.map((contact, index) => (
                      <motion.div
                        key={contact.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.05 * index }}
                        whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                        onClick={() => {
                          onSelectContact(contact);
                          setSearch(false);
                        }}
                        className={cn(
                          "p-3 border-b border-border cursor-pointer transition-colors rounded-md",
                          selectedContact?.id === contact.id && "bg-muted"
                        )}
                      >
                        <div className="flex items-start space-x-3">
                          <AvatarInitials
                            initials={contact.avatar}
                            isOnline={contact.isOnline}
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-sm truncate">
                                {contact.name}
                              </h3>
                              <span className="text-xs text-muted-foreground">
                                {contact.timestamp}
                              </span>
                            </div>

                            <p className="text-sm text-muted-foreground truncate mt-1">
                              {contact.lastMessage}
                            </p>

                            {/* Tags */}
                            {contact.tags && contact.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {contact.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant={
                                      tag === "Platinum Customer"
                                        ? "default"
                                        : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Unread Count */}
                          {contact.unreadCount && contact.unreadCount > 0 && (
                            <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                              {contact.unreadCount}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ backgroundColor: "hsl(var(--muted))" }}
            onClick={() => onSelectContact(contact)}
            className={cn(
              "p-3 border-b border-border cursor-pointer transition-colors",
              selectedContact?.id === contact.id
                ? "bg-primary/20 hover:bg-primary/20"
                : " hover:bg-primary/10"
            )}
          >
            <div className="flex items-start space-x-3">
              <AvatarInitials
                initials={contact.avatar}
                isOnline={contact.isOnline}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm truncate">
                    {contact.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {contact.timestamp}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground truncate mt-1">
                  {contact.lastMessage}
                </p>
              </div>

              {/* Unread Count */}
              {contact.unreadCount && contact.unreadCount > 0 ? (
                <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                  {contact.unreadCount}
                </div>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
