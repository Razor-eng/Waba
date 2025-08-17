"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Upload,
  Plus,
  MessageCircle,
  MoreVertical,
  Users,
  Phone,
  Pencil,
  UserPlus,
  UserMinus,
  Undo2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { ContactFormModal } from "@/components/contacts/contact-form-modal";
import { AssignContactModal } from "@/components/contacts/assign-contact-modal";
import { ViewContactModal } from "@/components/contacts/view-contact-modal";
import { BulkImportModal } from "@/components/contacts/bulk-import-modal";
import { useRouter } from "next/navigation";
import { contactApi } from "@/lib/api/contact";
import type { Contact } from "@/types/contact";
import { toast } from "sonner";
import { AvatarInitials } from "@/components/shared/avatar-initials";

export default function ContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isViewContactModalOpen, setIsViewContactModalOpen] = useState(false);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [assigningContactId, setAssigningContactId] = useState("");
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fromVNH, setFromVNH] = useState(false);
  const [totalContacts, setTotalContacts] = useState(0);
  const [page, setPage] = useState(1);
  const [assignedContacts, setAssignedContacts] = useState<{
    [key: string]: Contact | null;
  }>({});
  const limit = 10;

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        const response = await contactApi.getContacts(page, limit, searchQuery);
        setContacts(response.data);
        setTotalContacts(response.data.length ?? 0);

        // Fetch assigned contact details
        const newAssignedContacts: { [key: string]: Contact | null } = {};
        for (const contact of response.data) {
          if (contact.assignedId) {
            try {
              const assignedContact = await contactApi.getContactById(
                contact.assignedId
              );
              newAssignedContacts[contact.id] = assignedContact;
            } catch (err) {
              newAssignedContacts[contact.id] = null;
            }
          } else {
            newAssignedContacts[contact.id] = null;
          }
        }
        setAssignedContacts(newAssignedContacts);
      } catch (err) {
        // Error handled in contactApi
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, [searchQuery, page]);

  const handleAddContact = async (contactData: Partial<Contact>) => {
    setIsLoading(true);
    try {
      const newContact = await contactApi.createContact(contactData);
      setContacts((prev) => [newContact, ...prev]);
      setTotalContacts((prev) => prev + 1);
      setIsContactFormOpen(false);
      setEditingContact(null);

      if (fromVNH) {
        router.push(`/chat/${newContact.id}`);
      }
    } catch (err) {
      // Error handled in contactApi
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditContact = async (contactData: Partial<Contact>) => {
    if (!editingContact) return;

    setIsLoading(true);
    try {
      const updatedContact = await contactApi.updateContact(
        editingContact.id,
        contactData
      );
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === editingContact.id ? updatedContact : contact
        )
      );
      setIsContactFormOpen(false);
      setEditingContact(null);
    } catch (err) {
      // Error handled in contactApi
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    setIsLoading(true);
    try {
      await contactApi.deleteContact(contactId);
      const response = await contactApi.getContacts(page, limit, searchQuery);
      setContacts(response.data);
      setSelectedContacts((prev) => prev.filter((id) => id !== contactId));
      setTotalContacts(response.data.length ?? 0);
    } catch (err) {
      // Error handled in contactApi
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivateContact = async (contactId: string) => {
    setIsLoading(true);
    try {
      await contactApi.updateContact(contactId, { isDeleted: false });
      const response = await contactApi.getContacts(page, limit, searchQuery);
      setContacts(response.data);
      setSelectedContacts((prev) => prev.filter((id) => id !== contactId));
      setTotalContacts(response.data.length ?? 0);
      toast.success("Contact activated successfully");
    } catch (err) {
      // Error handled in contactApi
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignContact = async (
    currentContactId: string,
    assignedUserId: string
  ) => {
    setIsLoading(true);

    try {
      await contactApi.assignContact(currentContactId, assignedUserId);
      const updatedContact = await contactApi.getContactById(currentContactId);
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === currentContactId ? updatedContact : contact
        )
      );

      setIsAssignModalOpen(false);
      setAssigningContactId("");
    } catch (err) {
      // Error handled in contactApi
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAssigned = async (contactId: string) => {
    setIsLoading(true);
    try {
      await contactApi.removeAssignedContact(contactId);
      const updatedContact = await contactApi.getContactById(contactId);
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? updatedContact : contact
        )
      );
      setAssignedContacts((prev) => ({
        ...prev,
        [contactId]: null,
      }));
    } catch (err) {
      // Error handled in contactApi
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkImport = async (importedContacts: Contact[]) => {
    setIsLoading(true);
    try {
      const promises = importedContacts.map((contact) =>
        contactApi.createContact(contact)
      );
      const newContacts = await Promise.all(promises);
      setContacts((prev) => [...newContacts, ...prev]);
      setTotalContacts((prev) => prev + newContacts.length);
      setIsBulkImportOpen(false);
      toast.success(`Imported ${newContacts.length} contacts successfully`);
    } catch (err) {
      // Errors handled in contactApi
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatClick = (contact: Contact) => {
    router.push(`/chat/${contact.id}`);
  };

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const selectAllContacts = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map((contact) => contact.id));
    }
  };

  const handleViewContact = (contact: Contact | null) => {
    setViewingContact(contact);
    setIsViewContactModalOpen(true);
  };

  return (
    <div className="h-full">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card border-b border-border"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex flex-col space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-card-foreground">
                  Contact Management
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg">
                  Organize and manage your business contacts efficiently
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                {/* <Button
                  variant="outline"
                  onClick={() => setIsBulkImportOpen(true)}
                  className="gap-2 h-11 px-4 sm:px-6"
                  disabled={isLoading}
                >
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Import Contacts</span>
                  <span className="sm:hidden">Import</span>
                </Button> */}
                <Button
                  onClick={() => {
                    setEditingContact(null);
                    setFromVNH(false);
                    setIsContactFormOpen(true);
                  }}
                  className="gap-2 h-11 px-4 sm:px-6"
                  disabled={isLoading}
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Contact</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </div>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search contacts by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 sm:h-11 text-sm sm:text-base"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 min-h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-primary/40">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-border">
                      <TableHead className="w-12 pl-4 sm:pl-6">
                        <input
                          type="checkbox"
                          checked={
                            selectedContacts.length === contacts.length &&
                            contacts.length > 0
                          }
                          onChange={selectAllContacts}
                          className="h-4 w-4 rounded border-2 border-border bg-background text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                          disabled={isLoading}
                        />
                      </TableHead>
                      <TableHead className="font-semibold min-w-[200px]">
                        Contact
                      </TableHead>
                      <TableHead className="font-semibold min-w-[120px] hidden sm:table-cell">
                        Phone
                      </TableHead>
                      <TableHead className="font-semibold min-w-[120px] hidden md:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="font-semibold min-w-[120px] hidden lg:table-cell">
                        Assigned To
                      </TableHead>
                      <TableHead className="font-semibold min-w-[100px] hidden xl:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="font-semibold min-w-[100px] hidden xl:table-cell">
                        Created
                      </TableHead>
                      <TableHead className="text-right font-semibold pr-4 sm:pr-6 min-w-[100px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.length > 0 ? (
                      contacts.map((contact, index) => (
                        <motion.tr
                          key={contact.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * index }}
                          className="group transition-colors hover:bg-muted/30"
                        >
                          <TableCell className="pl-4 sm:pl-6">
                            <input
                              type="checkbox"
                              checked={selectedContacts.includes(contact.id)}
                              onChange={() =>
                                toggleContactSelection(contact.id)
                              }
                              className="h-4 w-4 rounded border-2 border-border bg-background text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                              disabled={isLoading}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <AvatarInitials
                                name={contact.fullName}
                                isOnline={!contact.isDeleted}
                              />
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="min-w-0 flex-1">
                                  <div className="font-semibold text-card-foreground truncate text-sm sm:text-base">
                                    {contact.fullName}
                                  </div>
                                  <div className="text-xs text-muted-foreground font-mono sm:hidden mt-1">
                                    {contact.phone}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span className="font-mono text-sm truncate">
                                {contact.phone}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="text-sm truncate">
                              {contact.email}
                            </span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <span
                              className={`text-sm truncate ${
                                assignedContacts[contact.id]
                                  ? "cursor-pointer text-primary hover:underline"
                                  : "text-red-400"
                              }`}
                              onClick={() =>
                                assignedContacts[contact.id] &&
                                handleViewContact(assignedContacts[contact.id])
                              }
                            >
                              {assignedContacts[contact.id]?.fullName ||
                                "Unassigned"}
                            </span>
                          </TableCell>
                          <TableCell className="hidden xl:table-cell">
                            <Badge
                              variant={
                                contact.status === "new"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {contact.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground hidden xl:table-cell">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right pr-4 sm:pr-6">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleChatClick(contact)}
                                className="gap-2 hidden sm:flex"
                                disabled={isLoading}
                              >
                                <MessageCircle className="w-4 h-4" />
                                <span className="hidden lg:inline">Chat</span>
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={isLoading}
                                    className="p-1 hover:bg-muted"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                  align="end"
                                  className="w-52"
                                >
                                  {/* Edit */}
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setEditingContact(contact);
                                      setFromVNH(false);
                                      setIsContactFormOpen(true);
                                    }}
                                    disabled={isLoading}
                                    className="gap-2"
                                  >
                                    <Pencil className="w-4 h-4" />
                                    Edit Contact
                                  </DropdownMenuItem>

                                  {/* Assign / Remove Assigned */}
                                  {!contact.assignedId ? (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setAssigningContactId(contact.id);
                                        setIsAssignModalOpen(true);
                                      }}
                                      disabled={isLoading}
                                      className="gap-2"
                                    >
                                      <UserPlus className="w-4 h-4" />
                                      Assign Contact
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleRemoveAssigned(contact.id)
                                      }
                                      disabled={isLoading}
                                      className="gap-2"
                                    >
                                      <UserMinus className="w-4 h-4" />
                                      Remove Assigned
                                    </DropdownMenuItem>
                                  )}

                                  <DropdownMenuSeparator />

                                  {/* Activate / Delete */}
                                  {contact.isDeleted ? (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleActivateContact(contact.id)
                                      }
                                      className="text-primary focus:text-primary gap-2"
                                    >
                                      <Undo2 className="w-4 h-4" />
                                      Activate Contact
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleDeleteContact(contact.id)
                                      }
                                      className="text-destructive hover:text-white gap-2"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      Delete Contact
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center py-12 text-muted-foreground"
                        >
                          No contacts found
                        </td>
                      </tr>
                    )}
                  </TableBody>
                </Table>

                {contacts.length === 0 && (
                  <div className="text-center py-12 sm:py-16 px-4">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {searchQuery ? "No contacts found" : "No contacts yet"}
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      {searchQuery
                        ? "Try adjusting your search terms or filters."
                        : "Get started by adding your first contact or importing from a file."}
                    </p>
                    {!searchQuery && (
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button
                          onClick={() => {
                            setEditingContact(null);
                            setFromVNH(false);
                            setIsContactFormOpen(true);
                          }}
                          className="gap-2 w-full sm:w-auto"
                          disabled={isLoading}
                        >
                          <Plus className="w-4 h-4" />
                          Add Contact
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsBulkImportOpen(true)}
                          className="gap-2 w-full sm:w-auto"
                          disabled={isLoading}
                        >
                          <Upload className="w-4 h-4" />
                          Import Contacts
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {totalContacts > limit && (
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1 || isLoading}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {Math.ceil(totalContacts / limit)}
            </span>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page * limit >= totalContacts || isLoading}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => {
          setIsContactFormOpen(false);
          setEditingContact(null);
        }}
        onSubmit={editingContact ? handleEditContact : handleAddContact}
        editingContact={editingContact}
      />

      <AssignContactModal
        isOpen={isAssignModalOpen}
        onClose={() => {
          setIsAssignModalOpen(false);
          setAssigningContactId("");
        }}
        onAssign={(contactId) =>
          handleAssignContact(assigningContactId, contactId)
        }
        currentContactId={assigningContactId}
      />

      <ViewContactModal
        isOpen={isViewContactModalOpen}
        onClose={() => {
          setIsViewContactModalOpen(false);
          setViewingContact(null);
        }}
        contact={viewingContact}
      />

      {/* <BulkImportModal
        isOpen={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        onImport={handleBulkImport}
      /> */}
    </div>
  );
}
