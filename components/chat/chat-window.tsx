"use client";

import { motion } from "framer-motion";
import {
  Edit3,
  UserPlus,
  Send,
  MoreVertical,
  Info,
  Layout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Contact, Message } from "@/types";
import { cn } from "@/lib/utils";
import { EmojiPicker } from "./emoji-picker";
import { AttachmentMenu } from "./attach-menu";
import { TemplateSelectionModal } from "./template-selection-modal";
import { TemplateCreationModal } from "./template-creation-modal";
import { useRef, useState, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import { TagSelector } from "./tag-selector";

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
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showTemplateSelection, setShowTemplateSelection] = useState(false);
  const [showTemplateCreation, setShowTemplateCreation] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [selectedTags, setSelectedTags] = useState<Contact[]>([]);
  const { contacts } = useChat();

  const isInactive = contact
    ? new Date().getTime() - new Date(contact.lastInteraction).getTime() >
      24 * 60 * 60 * 1000
    : false;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    textareaRef.current?.focus();
  };

  const handleAttachmentSelect = (type: string) => {
    if (type === "template") {
      setShowTemplateSelection(true);
    } else {
      console.log("Selected attachment type:", type);
    }
  };

  const replaceTemplateVariables = (text: string): string => {
    const sampleValues = [
      "John",
      "Smith",
      "Premium",
      "December",
      "2024",
      "Support Team",
      "ABC Company",
    ];

    return text.replace(/\{\{(\d+)\}\}/g, (match, number) => {
      const index = Number.parseInt(number) - 1;
      const value = sampleValues[index] || `Value${number}`;
      return `**${value}**`;
    });
  };

  const renderMessageContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return (
          <strong key={index} className="font-semibold">
            {boldText}
          </strong>
        );
      }
      return part;
    });
  };

  const renderTemplateMessage = (template: any) => {
    return (
      <div className="space-y-3 min-w-[280px]">
        {template.components.map((component: any, index: number) => {
          if (component.type === "HEADER") {
            if (
              component.format === "IMAGE" &&
              component.example?.header_text?.[0]
            ) {
              return (
                <div key={index} className="rounded-LG overflow-hidden">
                  <img
                    src={component.example.header_text[0] || "/placeholder.svg"}
                    alt="Template header"
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.svg?height=128&width=280";
                    }}
                  />
                </div>
              );
            }
            if (
              component.format === "VIDEO" &&
              component.example?.header_text?.[0]
            ) {
              return (
                <div key={index} className="rounded-LG overflow-hidden">
                  <video
                    src={component.example.header_text[0]}
                    className="w-full h-32 object-cover"
                    controls
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholder = document.createElement("div");
                      placeholder.className =
                        "w-full h-32 bg-gray-100 flex items-center justify-center text-gray-500 text-sm";
                      placeholder.textContent = "Video preview";
                      e.currentTarget.parentNode?.appendChild(placeholder);
                    }}
                  />
                </div>
              );
            }
            if (
              component.format === "AUDIO" &&
              component.example?.header_text?.[0]
            ) {
              return (
                <div key={index} className="p-3 bg-gray-50 rounded-LG">
                  <audio
                    src={component.example.header_text[0]}
                    controls
                    className="w-full"
                  />
                </div>
              );
            }
            if (component.text) {
              return (
                <div key={index} className="font-semibold text-sm">
                  {renderMessageContent(
                    replaceTemplateVariables(component.text)
                  )}
                </div>
              );
            }
          }

          if (component.type === "BODY" && component.text) {
            return (
              <div key={index} className="text-sm leading-relaxed">
                {renderMessageContent(replaceTemplateVariables(component.text))}
              </div>
            );
          }

          if (component.type === "FOOTER" && component.text) {
            return (
              <div
                key={index}
                className="text-xs text-muted-foreground border-t pt-2"
              >
                {renderMessageContent(replaceTemplateVariables(component.text))}
              </div>
            );
          }

          if (component.type === "BUTTONS" && component.buttons) {
            return (
              <div key={index} className="space-y-2 pt-2">
                {component.buttons.map((button: any, buttonIndex: number) => (
                  <Button
                    key={buttonIndex}
                    variant="outline"
                    size="sm"
                    className="w-full justify-center text-xs h-8 bg-transparent"
                    onClick={() => {
                      if (button.type === "URL" && button.url) {
                        window.open(button.url, "_blank");
                      } else if (
                        button.type === "PHONE_NUMBER" &&
                        button.phone_number
                      ) {
                        window.open(`tel:${button.phone_number}`, "_self");
                      }
                    }}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            );
          }

          return null;
        })}
      </div>
    );
  };

  const handleTemplateSelect = (template: any) => {
    setEditingTemplate(template);
    setShowTemplateSelection(false);
    setShowTemplateCreation(true);
  };

  const handleCreateNewTemplate = () => {
    setEditingTemplate(null);
    setShowTemplateSelection(false);
    setShowTemplateCreation(true);
  };

  const handleSendTemplate = (template: any) => {
    if (contact && onSendMessage) {
      onSendMessage(`TEMPLATE:${JSON.stringify(template)}`, contact.id);
    }
    setShowTemplateCreation(false);
    setEditingTemplate(null);
  };

  const handleTemplateCreated = (template: any) => {
    console.log("Template created:", template);
    setShowTemplateCreation(false);
    setEditingTemplate(null);
  };

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
          <h3 className="text-LG font-medium text-muted-foreground">
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
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("relative flex-1 flex flex-col min-h-0", className)}
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
                        "max-w-xs LG:max-w-md px-3 py-2 rounded-LG",
                        message.isFromContact
                          ? "bg-muted text-foreground"
                          : "bg-primary/70 text-primary-foreground"
                      )}
                    >
                      {message.isTemplate && message.template ? (
                        renderTemplateMessage(message.template)
                      ) : message.content.startsWith("TEMPLATE:") ? (
                        (() => {
                          try {
                            const templateData = JSON.parse(
                              message.content.replace("TEMPLATE:", "")
                            );
                            return renderTemplateMessage(templateData);
                          } catch {
                            return (
                              <p className="text-sm whitespace-pre-wrap">
                                {renderMessageContent(message.content)}
                              </p>
                            );
                          }
                        })()
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">
                          {renderMessageContent(message.content)}
                        </p>
                      )}
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
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border bg-background shrink-0">
            {isInactive ? (
              <div className="flex items-center justify-between bg-amber-100 border border-amber-300 px-4 rounded-md">
                {/* Alert Box */}
                <div className="flex items-start gap-3 p-4">
                  <div className="flex-shrink-0">
                    <Info className="text-amber-700" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-amber-900">
                      The customer hasn’t spoken to you in the last 24 hours.
                    </p>
                    <p className="mt-1 text-amber-700 text-xs">
                      You can only send pre-approved templates.
                    </p>
                  </div>
                </div>
                <Button onClick={() => setShowTemplateSelection(true)}>
                  <Layout />
                  Template
                </Button>
              </div>
            ) : (
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (message.trim() && contact) {
                          onSendMessage?.(message.trim(), contact.id);
                          setMessage("");
                        }
                      }
                    }}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center gap-1">
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                    <AttachmentMenu
                      onAttachmentSelect={handleAttachmentSelect}
                    />
                  </div>
                </div>
                <Button
                  size="icon"
                  onClick={() => {
                    if (message.trim() && contact) {
                      onSendMessage?.(message.trim(), contact.id);
                      setMessage("");
                    }
                  }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <TemplateSelectionModal
        isOpen={showTemplateSelection}
        onClose={() => setShowTemplateSelection(false)}
        onSelectTemplate={handleTemplateSelect}
        onCreateNew={handleCreateNewTemplate}
      />

      <TemplateCreationModal
        isOpen={showTemplateCreation}
        onClose={() => {
          setShowTemplateCreation(false);
          setEditingTemplate(null);
        }}
        editingTemplate={editingTemplate}
        onSendTemplate={handleSendTemplate}
        onTemplateCreated={handleTemplateCreated}
      />
    </>
  );
}
