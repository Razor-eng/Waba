"use client";

import { ChatWindow } from "@/components/chat/chat-window";
import { useChat } from "@/hooks/use-chat";

const Page = () => {
  const { selectedContact, messages, sendMessage } = useChat();

  return (
    <ChatWindow
      contact={selectedContact}
      messages={messages}
      onSendMessage={sendMessage}
      className="flex-1"
    />
  );
};

export default Page;
