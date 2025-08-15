export interface User {
  id: string;
  email: string;
  name: string;
  joinDate: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  uploadDate: string;
  uploadedBy: string;
  fileUrl?: string;
  coverUrl?: string;
  fileSize?: string;
  pages?: number;
}