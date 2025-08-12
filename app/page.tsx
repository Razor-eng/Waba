"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { ContactList } from "@/components/chat/contact-list";
import { ChatWindow } from "@/components/chat/chat-window";
import { ContactDetails } from "@/components/chat/contact-details";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const [isMobileContactsOpen, setIsMobileContactsOpen] = useState(false);
  const {
    contacts,
    selectedContact,
    messages,
    searchQuery,
    selectContact,
    updateSearchQuery,
    sendMessage,
  } = useChat();

  const handleMobileContactSelect = (contact: any) => {
    selectContact(contact);
    setIsMobileContactsOpen(false);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Desktop Contact List */}
      <ContactList
        contacts={contacts}
        selectedContact={selectedContact}
        onSelectContact={selectContact}
        searchQuery={searchQuery}
        onSearchChange={updateSearchQuery}
        className="hidden md:flex"
      />

      {/* Chat Window with Mobile Header */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-border bg-card flex items-center justify-between">
          <Sheet
            open={isMobileContactsOpen}
            onOpenChange={setIsMobileContactsOpen}
          >
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <ContactList
                contacts={contacts}
                selectedContact={selectedContact}
                onSelectContact={handleMobileContactSelect}
                searchQuery={searchQuery}
                onSearchChange={updateSearchQuery}
              />
            </SheetContent>
          </Sheet>

          {selectedContact && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 text-center"
            >
              <h2 className="font-semibold">{selectedContact.name}</h2>
            </motion.div>
          )}
        </div>

        <ChatWindow
          contact={selectedContact}
          messages={messages}
          onSendMessage={sendMessage}
          className="flex-1"
        />
      </div>

      <ContactDetails contact={selectedContact} className="hidden lg:flex" />
    </div>
  );
};

export default Index;
