import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Contact } from "@/types/contact";
import { AvatarInitials } from "@/components/shared/avatar-initials";

interface ViewContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

export function ViewContactModal({
  isOpen,
  onClose,
  contact,
}: ViewContactModalProps) {
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
          className="bg-card rounded-xl w-full max-w-md shadow-xl border border-border overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/50">
            <h2 className="text-lg font-semibold">Contact Details</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {contact ? (
              <Card className="border-none shadow-none">
                <CardContent className="p-0 space-y-6">
                  {/* Avatar & Name */}
                  <div className="flex flex-col items-center text-center gap-3">
                    <AvatarInitials
                      name={contact.fullName}
                      isOnline={!contact.isDeleted}
                      className="w-20 h-20 text-xl"
                    />
                    <div>
                      <p className="text-xl font-semibold text-card-foreground">
                        {contact.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize bg-zinc-100 rounded-md py-1">
                        {contact.status}
                      </p>
                    </div>
                  </div>

                  {/* Info List */}
                  <div className="space-y-4 divide-y divide-border">
                    <div className="flex items-center gap-3 pt-2">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </p>
                        <p className="text-base">{contact.fullName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Email
                        </p>
                        <p className="text-base">{contact.email || "-"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Phone
                        </p>
                        <p className="text-base">{contact.phone}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No contact assigned</p>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-end pt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
