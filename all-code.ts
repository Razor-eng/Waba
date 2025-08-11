// ===== File: lib/api/authApi.ts =====
import api from "./config";
import { GetTokenRequest, GetTokenResponse, ErrorResponse } from "@/types";

export const getToken = async (
  data: GetTokenRequest
): Promise<GetTokenResponse | ErrorResponse> => {
  try {
    const response = await api.post<GetTokenResponse>("/auth/token", data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch token",
      error: error.message,
    };
  }
};


// ===== File: lib/api/config.ts =====
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include Bearer token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Adjust based on your auth storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


// ===== File: lib/api/index.ts =====
export * from "./whatsappApi";
export * from "./userApi";
export * from "./authApi";


// ===== File: lib/api/userApi.ts =====
import api from './config';
import {
  AuthLoginRequest,
  AuthLoginResponse,
  VerifyResponse,
  GetAssignUsersListResponse,
  AssignToUserRequest,
  AssignToUserResponse,
  GetAllLeadResponse,
  ErrorResponse,
} from '@/types';

export const authLogin = async (
  data: AuthLoginRequest
): Promise<AuthLoginResponse | ErrorResponse> => {
  try {
    const response = await api.post<AuthLoginResponse>('/user/auth/login', data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to login',
      error: error.message,
    };
  }
};

export const verify = async (): Promise<VerifyResponse | ErrorResponse> => {
  try {
    const response = await api.get<VerifyResponse>('/user/verify');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to verify user',
      error: error.message,
    };
  }
};

export const getAssignUsersList = async (): Promise<GetAssignUsersListResponse | ErrorResponse> => {
  try {
    const response = await api.get<GetAssignUsersListResponse>('/user/get-assign-users-list');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch assign users list',
      error: error.message,
    };
  }
};

export const assignToUser = async (
  data: AssignToUserRequest
): Promise<AssignToUserResponse | ErrorResponse> => {
  try {
    const response = await api.post<AssignToUserResponse>('/user/assign-to-user', data);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to assign to user',
      error: error.message,
    };
  }
};

export const getAllLead = async (): Promise<GetAllLeadResponse | ErrorResponse> => {
  try {
    const response = await api.get<GetAllLeadResponse>('/user/get-all-lead');
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch leads',
      error: error.message,
    };
  }
};

// ===== File: lib/api/whatsappApi.ts =====
import api from "./config";
import {
  SendMessageRequest,
  SendMessageResponse,
  GetMessageResponse,
  GetAllContactsResponse,
  GetContactDetailResponse,
  AddContactRequest,
  AddContactResponse,
  UpdateUserSeenStatusResponse,
  GetUserRoleResponse,
  AddNoteRequest,
  AddNoteResponse,
  ErrorResponse,
} from "@/types";

export const sendMessage = async (
  data: SendMessageRequest
): Promise<SendMessageResponse | ErrorResponse> => {
  try {
    const response = await api.post<SendMessageResponse>(
      "/whatsapp/send-message",
      data
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send message",
      error: error.message,
    };
  }
};

export const getMessage = async (
  id: string
): Promise<GetMessageResponse | ErrorResponse> => {
  try {
    const response = await api.get<GetMessageResponse>(
      `/whatsapp/get-message/${id}`
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch messages",
      error: error.message,
    };
  }
};

export const getAllContacts = async (
  search?: string
): Promise<GetAllContactsResponse | ErrorResponse> => {
  try {
    const response = await api.get<GetAllContactsResponse>(
      `/whatsapp/get-all-contacts/${search || ""}`
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch contacts",
      error: error.message,
    };
  }
};

export const getContactDetail = async (
  query: string
): Promise<GetContactDetailResponse | ErrorResponse> => {
  try {
    const response = await api.get<GetContactDetailResponse>(
      `/whatsapp/get-contact-detail/${query}`
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to fetch contact details",
      error: error.message,
    };
  }
};

export const addContact = async (
  data: AddContactRequest
): Promise<AddContactResponse | ErrorResponse> => {
  try {
    const response = await api.post<AddContactResponse>(
      "/whatsapp/add-contact",
      data
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to add contact",
      error: error.message,
    };
  }
};

export const updateUserSeenStatus = async (
  id: string
): Promise<UpdateUserSeenStatusResponse | ErrorResponse> => {
  try {
    const response = await api.get<UpdateUserSeenStatusResponse>(
      `/whatsapp/get-update-user-seen-status/${id}`
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Failed to update user seen status",
      error: error.message,
    };
  }
};

export const getUserRole = async (
  id: string
): Promise<GetUserRoleResponse | ErrorResponse> => {
  try {
    const response = await api.get<GetUserRoleResponse>(
      `/whatsapp/get-user-role/${id}`
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch user role",
      error: error.message,
    };
  }
};

export const addNote = async (
  data: AddNoteRequest
): Promise<AddNoteResponse | ErrorResponse> => {
  try {
    const response = await api.post<AddNoteResponse>(
      "/whatsapp/add-note",
      data
    );
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to add note",
      error: error.message,
    };
  }
};


// ===== File: lib/utils.ts =====
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// ===== File: types/auth.ts =====
export interface GetTokenRequest {
  client_id: string;
  client_secret: string;
}

export interface GetTokenResponse {
  success: boolean;
  token: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
}


// ===== File: types/index.ts =====
export * from "./whatsapp";
export * from "./user";
export * from "./auth";


// ===== File: types/user.ts =====
export interface AuthLoginRequest {
  jwt: string;
  expiresIn: string;
}

export interface AuthLoginResponse {
  success?: boolean;
  data: string; // JWT token
}

export interface VerifyResponse {
  success?: boolean;
  data: object; // Adjust based on actual response
}

export interface AssignUser {
  value: string;
  label: string;
  userRole?: {
    id: number;
    name: string;
  };
  userProfile?: {
    id: string;
    first_name: string;
  };
}

export interface GetAssignUsersListResponse {
  success?: boolean;
  data: AssignUser[];
}

export interface AssignToUserRequest {
  phone: string;
  // Add other fields as needed
}

export interface AssignToUserResponse {
  success?: boolean;
  data: object; // Adjust based on actual response
}

export interface Lead {
  id: string;
  phone: string;
  first_name: string;
  last_name: string;
  email: string;
  lead_status: string;
  source: string;
  // Add other fields as needed
}

export interface GetAllLeadResponse {
  success?: boolean;
  data: {
    data: Lead[];
  };
}


// ===== File: types/whatsapp.ts =====
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

export interface Contact {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  last_message?: {
    message: string;
    type: string;
    to: string;
    from: string;
    lastConversation: string;
    bound: string;
    contactId: string;
  };
  last_message_time?: string;
  seen_status?: boolean;
  unseen_count_message?: number;
  createdAt: string;
  updatedAt: string;
}

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


