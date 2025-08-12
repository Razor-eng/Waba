    export interface Contact {
      id: string;
      name: string;
      phone: string;
      email?: string;
      avatar?: string;
      lastMessage?: string;
      lastMessageTime?: string;
      unreadCount?: number;
      tags?: string[];
      isAssigned?: boolean;
      lastInteraction?: Date;
    }

    export interface Message {
      id: string;
      contactId: string;
      content: string;
      timestamp: string;
      isFromContact: boolean;
      status?: "sent" | "delivered" | "read";
      template?: MessageTemplate;
      isTemplate?: boolean;
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

    export type HeaderFormat = "NONE" | "TEXT" | "IMAGE" | "VIDEO" | "AUDIO";
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
