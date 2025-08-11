// types/index.d.ts
export interface Contact {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatar: string;
  isOnline: boolean;
  unreadCount?: number;
  phone: string;
  whatsapp: string;
  optIn: boolean;
  additionalInfo?: string;
  iRateValue?: number;
  tags?: string[];
  notes?: string[];
}

export interface Message {
  id: string;
  contactId: string;
  content: string;
  timestamp: string;
  isFromContact: boolean;
  status: "sent" | "delivered" | "read";
}

export interface ChatState {
  selectedContact: Contact | null;
  messages: Message[];
  searchQuery: string;
  filterOptions: {
    assigned: boolean;
    unassigned: boolean;
    tags: string[];
  };
}

// New types for Message Template Builder
export type HeaderFormat = "NONE" | "TEXT" | "IMAGE" | "VIDEO" | "AUDIO";
export type ButtonType = "QUICK_REPLY" | "PHONE_NUMBER" | "URL";
export type TemplateCategory =
  | "MARKETING"
  | "UTILITY"
  | "AUTHENTICATION"
  | "TRANSACTIONAL";

export interface ButtonComponent {
  type: ButtonType;
  text: string;
  phone_number?: string;
  url?: string;
}

export interface TemplateComponent {
  type: "HEADER" | "BODY" | "FOOTER" | "BUTTONS";
  format?: HeaderFormat;
  text?: string;
  example?: {
    header_text?: string[];
    body_text?: string[][];
  };
  buttons?: ButtonComponent[];
}

export interface MessageTemplate {
  id: string; // Added for listing
  name: string;
  language: string;
  category: TemplateCategory;
  components: TemplateComponent[];
  createdAt: string; // Added for listing
}

export type TemplateBuilderSection =
  | "details"
  | "header"
  | "body"
  | "footer"
  | "buttons";
