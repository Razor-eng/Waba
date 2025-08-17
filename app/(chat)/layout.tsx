"use client";

import { ContactList } from "@/components/chat/contact-list";
import { useChat } from "@/hooks/use-chat";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { contacts, searchQuery, updateSearchQuery } = useChat();

  return (
    <div className="flex h-full overflow-hidden">
      {/* Desktop Contact List */}
      <ContactList
        contacts={contacts}
        searchQuery={searchQuery}
        onSearchChange={updateSearchQuery}
        className="hidden md:flex"
      />
      {children}
    </div>
  );
}
