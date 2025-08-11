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
