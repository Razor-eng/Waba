import { Contact } from "./template";

export interface ErrorResponse {
  success?: boolean;
  message: string;
  error?: string | object;
}

export interface SendMessageRequest {
  message: string;
  phone_no: string;
}

export interface SendMessageResponse {
  success?: boolean;
  message: string;
}

export interface GetMessageResponse {
  success?: boolean;
  message: {
    data: {
      _id: string;
      message: string;
      type: string;
      to: string;
      from: string;
      lastConversation: string;
      bound: string;
      contactId: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };
}

// export interface Contact {
//   _id: string;
//   name: string;
//   phone: string;
//   email?: string;
//   last_message?: {
//     message: string;
//     type: string;
//     to: string;
//     from: string;
//     lastConversation: string;
//     bound: string;
//     contactId: string;
//   };
//   last_message_time?: string;
//   seen_status?: boolean;
//   unseen_count_message?: number;
//   createdAt: string;
//   updatedAt: string;
// }

export interface GetAllContactsResponse {
  success?: boolean;
  contacts: Contact[];
}

export interface GetContactDetailResponse {
  success?: boolean;
  message: Contact;
}

export interface AddContactRequest {
  name: string;
  email: string;
  phone_no: string;
  uid?: string;
}

export interface AddContactResponse {
  success?: boolean;
  message: string;
  data?: Contact;
}

export interface UpdateUserSeenStatusResponse {
  success?: boolean;
  message: string;
}

export interface GetUserRoleResponse {
  success?: boolean;
  message: string;
  data?: string; // userRole.name
}

export interface AddNoteRequest {
  note: string;
  userId: string;
}

export interface AddNoteResponse {
  success?: boolean;
  message: string;
}
