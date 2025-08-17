export interface Contact {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  assignedId: string | null;
  createdById: string;
  status: "new" | "in_progress" | "closed";
  notes?: string;
  lastContactedAt: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;

  whatsapp?: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  timestamp?: string;
  isOnline?: boolean;
  unreadCount?: number;
  tags?: string[];
  optIn?: boolean;
  isAssigned?: boolean;
  iRateValue?: number;
  lastInteraction?: Date;
  additionalInfo?: string;
}

export interface Message {
  id: string;
  contactId: string;
  content: string;
  timestamp: string;
  isFromContact: boolean;
  status: "sent" | "delivered" | "read";
  createdAt?: string;
  template?: {
    id: string;
    name: string;
    components: TemplateComponent[];
  };
  isTemplate?: boolean;
  templateData?: MessageTemplate;
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

export type HeaderFormat =
  | "NONE"
  | "TEXT"
  | "IMAGE"
  | "VIDEO"
  | "AUDIO"
  | "DOCUMENT";
export type TemplateCategory =
  | "MARKETING"
  | "UTILITY"
  | "AUTHENTICATION"
  | "TRANSACTIONAL";
export type ButtonType = "QUICK_REPLY" | "PHONE_NUMBER" | "URL";
export type TemplateBuilderSection =
  | "details"
  | "header"
  | "body"
  | "footer"
  | "buttons";

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
    header_handle?: string[];
    body_text?: string[][];
  };
  buttons?: ButtonComponent[];
}

export interface MessageTemplate {
  id: string;
  name: string;
  language: string;
  category: TemplateCategory;
  createdAt: string;
  components: TemplateComponent[];
}
