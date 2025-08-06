export interface Contact {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatar: string;
  isOnline: boolean;
  unreadCount?: number;
  tags?: string[];
  phone?: string;
  whatsapp?: string;
  optIn?: boolean;
  additionalInfo?: string;
  iRateValue?: number;
  notes?: string[];
}

export interface Message {
  id: string;
  contactId: string;
  content: string;
  timestamp: string;
  isFromContact: boolean;
  status?: "sent" | "delivered" | "read";
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
