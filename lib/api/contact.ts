import axios, { AxiosResponse } from "axios";
import { parseCookies } from "nookies";
import { toast } from "sonner";
import type { Contact } from "@/types";
import { User } from "@/types/user";

export const contactApi = {
  async createContact(contactData: Partial<Contact>): Promise<Contact> {
    const cookies = parseCookies();
    const token = cookies.auth_token;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts`,
        contactData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Contact created successfully");
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to create contact";
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else if (err.response?.status === 400) {
        toast.error(message);
      } else {
        toast.error(message);
      }
      throw err;
    }
  },

  async getContacts(
    page: number = 1,
    limit: number = 10,
    search: string = ""
  ): Promise<AxiosResponse> {
    const cookies = parseCookies();
    const token = cookies.auth_token;

    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/contacts?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch contacts";
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(message);
      }
      throw err;
    }
  },

  async getContactById(id: string): Promise<Contact> {
    const cookies = parseCookies();
    const token = cookies.auth_token;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch contact";
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(message);
      }
      throw err;
    }
  },

  async updateContact(
    id: string,
    contactData: Partial<Contact>
  ): Promise<Contact> {
    const cookies = parseCookies();
    const token = cookies.auth_token;

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}`,
        contactData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Contact updated successfully");
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to update contact";
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(message);
      }
      throw err;
    }
  },

  async deleteContact(id: string): Promise<void> {
    const cookies = parseCookies();
    const token = cookies.auth_token;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success("Contact deleted successfully");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to delete contact";
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(message);
      }
      throw err;
    }
  },

  async assignContact(id: string, userId: string): Promise<void> {
    const cookies = parseCookies();
    const token = cookies.auth_token;

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}/assign`,
        { assignedId: userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Contact assigned successfully");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to assign contact";
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(message);
      }
      throw err;
    }
  },

  async removeAssignedContact(id: string): Promise<void> {
    const cookies = parseCookies();
    const token = cookies.auth_token;

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}/remove-assigned`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success("Assigned user removed successfully");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to remove assigned user";
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(message);
      }
      throw err;
    }
  },

  async getAssignedContacts(): Promise<Contact[]> {
    const cookies = parseCookies();
    const token = cookies.auth_token;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/contacts/my-assigned`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to fetch assigned contacts";
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(message);
      }
      throw err;
    }
  },

  async getUsers(): Promise<User[]> {
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
