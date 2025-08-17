"use client";

import type React from "react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  Download,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { Contact } from "@/types";

interface ParsedContact extends Omit<Contact, "id"> {
  id: string;
  isValid: boolean;
  validationErrors: string[];
  rowIndex: number;
}

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (contacts: Contact[]) => void;
}

export function BulkImportModal({
  isOpen,
  onClose,
  onImport,
}: BulkImportModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [parsedContacts, setParsedContacts] = useState<ParsedContact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      setError("Please select a CSV or Excel file (.csv, .xls, .xlsx)");
      return;
    }

    setFile(selectedFile);
    setError(null);
    setShowPreview(false);
    setParsedContacts([]);
    setSelectedContacts([]);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const validateContact = (
    contact: Partial<Contact>,
    rowIndex: number
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!contact.name || contact.name.trim() === "") {
      errors.push("Name is required");
    }

    if (!contact.phone || contact.phone.trim() === "") {
      errors.push("Phone number is required");
    } else {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(contact.phone.trim())) {
        errors.push("Invalid phone number format");
      }
    }

    if (contact.whatsapp && contact.whatsapp.trim() !== "") {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(contact.whatsapp.trim())) {
        errors.push("Invalid WhatsApp number format");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const parseCSV = (text: string): ParsedContact[] => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    if (lines.length < 2) {
      throw new Error(
        "File must contain at least a header row and one data row"
      );
    }

    const headers = lines[0]
      .split(",")
      .map((h) => h.trim().toLowerCase().replace(/"/g, ""));

    const requiredHeaders = ["name", "phone"];
    const missingHeaders = requiredHeaders.filter(
      (header) => !headers.includes(header)
    );
    if (missingHeaders.length > 0) {
      throw new Error(
        `Missing required columns: ${missingHeaders.join(
          ", "
        )}. Please ensure your CSV has 'name' and 'phone' columns.`
      );
    }

    const contacts: ParsedContact[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""));
      if (values.length < 2) continue;

      const contactData = {
        name: values[headers.indexOf("name")] || "",
        phone: values[headers.indexOf("phone")] || "",
        whatsapp:
          values[headers.indexOf("whatsapp")] ||
          values[headers.indexOf("phone")] ||
          "",
        tags: values[headers.indexOf("tags")]?.split(";").filter(Boolean) || [],
        optIn:
          values[headers.indexOf("optin")]?.toLowerCase() === "true" || false,
        notes:
          values[headers.indexOf("notes")]?.split(";").filter(Boolean) || [],
      };

      const validation = validateContact(contactData, i);

      const contact: ParsedContact = {
        id: `temp-${Date.now()}-${i}`,
        name: contactData.name,
        phone: contactData.phone,
        whatsapp: contactData.whatsapp,
        avatar: (contactData.name || "?").charAt(0).toUpperCase(),
        lastMessage: "No messages yet",
        timestamp: "Now",
        isOnline: false,
        unreadCount: 0,
        tags: contactData.tags,
        optIn: contactData.optIn,
        notes: contactData.notes,
        createdAt: new Date().toISOString(),
        isValid: validation.isValid,
        validationErrors: validation.errors,
        rowIndex: i,
      };

      contacts.push(contact);
    }

    return contacts;
  };

  const handlePreview = async () => {
    if (!file) return;

    setError(null);
    try {
      const text = await file.text();
      const contacts = parseCSV(text);
      setParsedContacts(contacts);

      const validContactIds = contacts
        .filter((c) => c.isValid)
        .map((c) => c.id);
      setSelectedContacts(validContactIds);

      setShowPreview(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse file");
    }
  };

  const handleImport = async () => {
    const contactsToImport = parsedContacts.filter(
      (contact) => selectedContacts.includes(contact.id) && contact.isValid
    );

    if (contactsToImport.length === 0) {
      setError("No valid contacts selected for import");
      return;
    }

    setImporting(true);
    setProgress(0);
    setError(null);

    try {
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const finalContacts: Contact[] = contactsToImport.map((contact) => ({
        ...contact,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      }));

      onImport(finalContacts);
      onClose();
      resetModal();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to import contacts"
      );
    } finally {
      setImporting(false);
      setProgress(0);
    }
  };

  const resetModal = () => {
    setFile(null);
    setParsedContacts([]);
    setSelectedContacts([]);
    setShowPreview(false);
    setError(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  const toggleSelectAll = () => {
    const validContacts = parsedContacts.filter((c) => c.isValid);
    if (selectedContacts.length === validContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(validContacts.map((c) => c.id));
    }
  };

  const downloadTemplate = () => {
    const csvContent =
      "name,phone,whatsapp,tags,optin,notes\nJohn Doe,+1234567890,+1234567890,customer,true,Important client\nJane Smith,+0987654321,+0987654321,prospect,false,Follow up needed";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const validContactsCount = parsedContacts.filter((c) => c.isValid).length;
  const invalidContactsCount = parsedContacts.length - validContactsCount;
  const selectedValidCount = selectedContacts.filter(
    (id) => parsedContacts.find((c) => c.id === id)?.isValid
  ).length;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-card rounded-lg w-full shadow-lg ${
            showPreview ? "max-w-6xl max-h-[90vh]" : "max-w-lg"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-2">
              {showPreview && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPreview(false)}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <h2 className="text-lg font-semibold">
                {showPreview
                  ? "Preview & Select Contacts"
                  : "Bulk Import Contacts"}
              </h2>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {!showPreview ? (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">Need a template?</span>
                </div>
                <Button variant="outline" size="sm" onClick={downloadTemplate}>
                  <Download className="w-4 h-4 mr-1" />
                  Download CSV Template
                </Button>
              </div>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  {file ? file.name : "Drop your file here"}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse for CSV or Excel files
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xls,.xlsx"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {file && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handlePreview} disabled={!file}>
                  Preview Contacts
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full max-h-[calc(90vh-80px)]">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {validContactsCount} Valid
                    </Badge>
                    {invalidContactsCount > 0 && (
                      <Badge variant="destructive" className="gap-1">
                        <XCircle className="w-3 h-3" />
                        {invalidContactsCount} Invalid
                      </Badge>
                    )}
                    <Badge variant="secondary">
                      {selectedValidCount} Selected
                    </Badge>
                  </div>
                </div>

                {invalidContactsCount > 0 && (
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {invalidContactsCount} contacts have validation errors and
                      cannot be imported. Only valid contacts can be selected
                      for import.
                    </AlertDescription>
                  </Alert>
                )}

                {importing && (
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Importing {selectedValidCount} contacts...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                )}

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex-1 overflow-auto p-6">
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={
                              selectedContacts.length === validContactsCount &&
                              validContactsCount > 0
                            }
                            onCheckedChange={toggleSelectAll}
                            disabled={validContactsCount === 0}
                          />
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Row</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>WhatsApp</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Opt-in</TableHead>
                        <TableHead>Validation Errors</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parsedContacts.map((contact) => (
                        <TableRow
                          key={contact.id}
                          className={!contact.isValid ? "bg-destructive/5" : ""}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedContacts.includes(contact.id)}
                              onCheckedChange={() =>
                                toggleContactSelection(contact.id)
                              }
                              disabled={!contact.isValid}
                            />
                          </TableCell>
                          <TableCell>
                            {contact.isValid ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {contact.rowIndex}
                          </TableCell>
                          <TableCell className="font-medium">
                            {contact.name || (
                              <span className="text-muted-foreground italic">
                                Empty
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {contact.phone || (
                              <span className="text-muted-foreground italic">
                                Empty
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {contact.whatsapp}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {contact.tags?.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {contact.tags && contact.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{contact.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={contact.optIn ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {contact.optIn ? "Yes" : "No"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {contact.validationErrors.length > 0 && (
                              <div className="space-y-1">
                                {contact.validationErrors.map(
                                  (error, index) => (
                                    <Badge
                                      key={index}
                                      variant="destructive"
                                      className="text-xs block w-fit"
                                    >
                                      {error}
                                    </Badge>
                                  )
                                )}
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-between items-center p-6 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  {selectedValidCount} of {validContactsCount} valid contacts
                  selected for import
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(false)}
                    disabled={importing}
                  >
                    Back to Upload
                  </Button>
                  <Button
                    onClick={handleImport}
                    disabled={selectedValidCount === 0 || importing}
                  >
                    {importing
                      ? "Importing..."
                      : `Import ${selectedValidCount} Contacts`}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
