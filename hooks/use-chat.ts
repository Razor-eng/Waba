"use client";

import { useState } from "react";
import type { Contact, Message, ChatState } from "@/types";
import { mockContacts, mockMessages } from "@/data/mockData";

export function useChat() {
  const [chatState, setChatState] = useState<ChatState>({
    selectedContact: null,
    messages: mockMessages,
    searchQuery: "",
    filterOptions: {
      assigned: false,
      unassigned: false,
      tags: [],
    },
  });

  const selectContact = (contact: Contact) => {
    setChatState((prev) => ({
      ...prev,
      selectedContact: contact,
    }));
  };

  const updateSearchQuery = (query: string) => {
    setChatState((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  };

  const sendMessage = (content: string, contactId: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      contactId,
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isFromContact: false,
      status: "sent",
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  return {
    contacts: mockContacts,
    selectedContact: chatState.selectedContact,
    messages: chatState.messages,
    searchQuery: chatState.searchQuery,
    selectContact,
    updateSearchQuery,
    sendMessage,
  };
}
