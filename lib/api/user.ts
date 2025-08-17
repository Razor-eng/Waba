import axios from "axios";
import { parseCookies } from "nookies";
import { toast } from "sonner";
import type { User } from "@/types/user";

export const userApi = {
  async getUsers(): Promise<Pick<User, "id" | "name">[]> {
    const cookies = parseCookies();
    const token = cookies.auth_token;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log(response.data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch users";
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(message);
      }
      throw err;
    }
  },
};
