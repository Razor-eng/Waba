import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Contact } from "@/types/contact";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (contactData: Partial<Contact>) => void;
  editingContact?: Contact | null;
}

export function ContactFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingContact,
}: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    isActive: false,
    email: "",
    notes: "",
    status: "new" as "new" | "in_progress" | "closed",
    lastContactedAt: "",
  });

  useEffect(() => {
    if (editingContact) {
      setFormData({
        fullName: editingContact.fullName || "",
        phone: editingContact.phone || "",
        isActive: editingContact.isActive || false,
        email: editingContact.email || "",
        notes: editingContact.notes || "",
        status: editingContact.status || "new",
        lastContactedAt: editingContact.lastContactedAt || "",
      });
    } else {
      setFormData({
        fullName: "",
        phone: "",
        isActive: false,
        email: "",
        notes: "",
        status: "new",
        lastContactedAt: "",
      });
    }
  }, [editingContact, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      fullName: formData.fullName,
      phone: formData.phone,
      isActive: formData.isActive,
      email: formData.email || undefined,
      notes: formData.notes || undefined,
      status: formData.status,
      lastContactedAt: formData.lastContactedAt || undefined,
    });
    onClose();
  };

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
          className="bg-card rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg"
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold">
              {editingContact ? "Edit Contact" : "Add New Contact"}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                }
                placeholder="Enter contact name"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="+1234567890"
                required
                disabled={!!editingContact}
                className={editingContact ? "bg-muted" : ""}
              />
              {editingContact && (
                <p className="text-xs text-muted-foreground">
                  Phone number cannot be changed for existing contacts
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter contact email"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as "new" | "in_progress" | "closed",
                  }))
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between">
              <Label htmlFor="isActive">Active Status</Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isActive: checked }))
                }
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Add notes about this contact"
                className="resize-none"
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {editingContact ? "Update Contact" : "Add Contact"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
