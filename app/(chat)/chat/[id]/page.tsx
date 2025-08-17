"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, MoreVertical, UserPlus } from "lucide-react";
import { ContactList } from "@/components/chat/contact-list";
import { ChatWindow } from "@/components/chat/chat-window";
import { ContactDetails } from "@/components/chat/contact-details";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TagSelector } from "@/components/chat/tag-selector";
import { cn } from "@/lib/utils";
import type { Contact } from "@/types";

const ChatPage = () => {
  const params = useParams();
  const router = useRouter();
  const contactId = params.id as string;

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
  const [selectedTags, setSelectedTags] = useState<Contact[]>([]);

  useEffect(() => {
    if (contactId && contacts.length > 0) {
      const contact = contacts.find((c) => c.id === contactId);
      if (contact && (!selectedContact || selectedContact.id !== contact.id)) {
        selectContact(contact);
      } else if (!contact) {
        // Contact not found, redirect to home
        router.push("/");
      }
    }
  }, [contactId, contacts, selectedContact, selectContact, router]);

  return (
    <>
      {/* Chat Header */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            y: { duration: 0.3, ease: "easeOut" },
            opacity: { duration: 0.5, delay: 0.2, ease: "easeIn" },
          }}
          className={cn(
            "flex items-center justify-between",
            selectedContact && "p-2.5 md:px-4 border-b border-border bg-card",
            !selectedContact && "p-2.5 px-4 md:p-0 md:px-0"
          )}
        >
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <div className="md:hidden mr-2">
              <Sheet
                open={isMobileContactsOpen}
                onOpenChange={setIsMobileContactsOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0 bg-card">
                  <SheetHeader className="hidden">
                    <SheetTitle />
                    <SheetDescription />
                  </SheetHeader>
                  <div className="mt-10">
                    <ContactList
                      contacts={contacts}
                      searchQuery={searchQuery}
                      onSearchChange={updateSearchQuery}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {selectedContact && (
              <motion.h2
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-semibold"
              >
                {selectedContact.name}
              </motion.h2>
            )}
          </div>

          {/* Action Buttons */}
          {selectedContact && (
            <div className="flex items-center space-x-1 md:space-x-2">
              <TagSelector
                contacts={contacts}
                selectedTags={selectedTags}
                onChange={setSelectedTags}
              />
              <Button variant="ghost" size="icon">
                <UserPlus className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          )}
        </motion.div>

        <ChatWindow
          contact={selectedContact}
          messages={messages}
          onSendMessage={sendMessage}
          className="flex-1"
        />
      </div>

      <ContactDetails contact={selectedContact} className="hidden lg:flex" />
    </>
  );
};

export default ChatPage;
