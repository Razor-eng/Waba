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