import { useState, useCallback } from "react";
import axios from "axios";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { toast } from "sonner";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { access_token } = response.data;
      setCookie(null, "auth_token", access_token, {
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      toast.success("Logged in successfully");
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    destroyCookie(null, "auth_token", { path: "/" });
    toast.success("Logged out successfully");
  }, []);

  const isAuthenticated = useCallback(() => {
    const cookies = parseCookies();
    return !!cookies.auth_token;
  }, []);

  return { login, logout, isAuthenticated, isLoading };
};
