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
