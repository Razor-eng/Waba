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
