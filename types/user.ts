export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  lastLogin?: Date | null;
}