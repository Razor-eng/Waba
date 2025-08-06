import { motion } from "framer-motion";
import { Edit3, UserPlus, Send, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Contact, Message } from "@/types";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  contact: Contact | null;
  messages: Message[];
  onSendMessage?: (content: string, contactId: string) => void;
  className?: string;
}

export function ChatWindow({
  contact,
  messages,
  onSendMessage,
  className,
}: ChatWindowProps) {
  if (!contact) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("relative flex items-center justify-center", className)}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 bg-fill bg-center"
          style={{ backgroundImage: 'url("/bg.jpeg")' }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <h3 className="text-lg font-medium text-muted-foreground">
            Select a contact to start chatting
          </h3>
        </motion.div>
      </motion.div>
    );
  }

  const contactMessages = messages.filter(
    (msg) => msg.contactId === contact.id
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("relative flex-1 flex flex-col", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 bg-fill bg-center"
        style={{ backgroundImage: 'url("/bg.jpeg")' }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Chat Header */}
        <div className="px-4 h-14 flex border-b border-border bg-card">
          <div className="w-full flex items-center justify-between">
            <div>
              <h2 className="font-semibold">{contact.name}</h2>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <UserPlus className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="relative flex-1 p-4 overflow-y-auto">
          {contactMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No messages yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contactMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className={cn(
                    "flex",
                    message.isFromContact ? "justify-start" : "justify-end"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-xs lg:max-w-md px-3 py-2 rounded-lg",
                      message.isFromContact
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={cn(
                        "text-xs mt-1",
                        message.isFromContact
                          ? "text-muted-foreground"
                          : "text-primary-foreground/70"
                      )}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-border bg-background">
          <div className="flex items-center space-x-2">
            <Textarea
              placeholder="Type a message..."
              className="flex-1 min-h-[40px] max-h-[120px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const target = e.target as HTMLTextAreaElement;
                  if (target.value.trim() && contact) {
                    onSendMessage?.(target.value.trim(), contact.id);
                    target.value = "";
                  }
                }
              }}
            />
            <Button
              size="icon"
              onClick={() => {
                const textarea = document.querySelector(
                  "textarea"
                ) as HTMLTextAreaElement;
                if (textarea?.value.trim() && contact) {
                  onSendMessage?.(textarea.value.trim(), contact.id);
                  textarea.value = "";
                }
              }}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
