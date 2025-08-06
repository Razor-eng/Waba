import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Contact } from "@/types";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface ContactDetailsProps {
  contact: Contact | null;
  className?: string;
}

export function ContactDetails({ contact, className }: ContactDetailsProps) {
  const [optIn, setOptIn] = useState(contact?.optIn);
  const [activeTab, setActiveTab] = useState<"details" | "notes">("details");

  if (!contact) {
    return null;
  }

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "w-full max-w-xs md:w-80 bg-card border-l border-border flex flex-col",
        className
      )}
    >
      {/* Header Tabs */}
      <div className="h-14 flex items-center">
        <button
          className={`flex-1 h-full border-b-2 border-border hover:bg-primary/20 ${
            activeTab === "details"
              ? "border-primary hover:bg-primary/20"
              : "hover:bg-primary/10"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
        <button
          className={`flex-1 h-full border-b-2 border-border hover:bg-primary/20 ${
            activeTab === "notes"
              ? "border-primary hover:bg-primary/20"
              : "hover:bg-primary/10"
          }`}
          onClick={() => setActiveTab("notes")}
        >
          Notes
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 overflow-auto">
        {activeTab === "details" ? (
          <>
            <div>
              <h3 className="font-semibold text-lg">{contact.name}</h3>
            </div>

            {/* Phone Number */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Phone number</span>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{contact.phone}</p>
            </div>

            <Separator className="my-4" />

            {/* WhatsApp Number */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">WABA number</span>
                <Button variant="ghost" size="icon" className="text-primary">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {contact.whatsapp}
              </p>
            </div>

            <Separator className="my-4" />

            {/* Opt-in Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Opt-in</span>
                <div
                  className={cn(
                    "w-5 h-5 rounded flex items-center justify-center",
                    optIn
                      ? "bg-green-100 text-primary"
                      : "border border-primary bg-zinc-100"
                  )}
                >
                  <Checkbox
                    checked={optIn}
                    onCheckedChange={(checked) => setOptIn(checked as boolean)}
                    className={cn(
                      "w-4 h-4 rounded-sm border-none ring-0 shadow-none transition-all duration-200",
                      optIn
                        ? "bg-primary text-white data-[state=checked]:border-primary"
                        : ""
                    )}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <h4 className="font-semibold text-lg mb-2">Notes</h4>
            {contact.notes && contact.notes.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {contact.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No notes available.
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
