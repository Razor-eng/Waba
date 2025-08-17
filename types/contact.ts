export interface Contact {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  assignedId: string | null;
  createdById: string;
  status?: "new" | "in_progress" | "closed";
  notes?: string;
  lastContactedAt?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}
