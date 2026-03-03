export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  attachment?: File;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  attachment?: string;
}

export interface AttachmentInfo {
  original_filename: string;
  stored_filename: string;
  size: number;
  type: string;
}

export interface ContactData {
  id: string;
  name: string;
  email: string;
  message: string;
  attachment: AttachmentInfo | null;
  created_at: string;
}

export interface ApiResponse {
  success: boolean;
  data?: ContactData;
  error?: string;
}
