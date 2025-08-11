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
