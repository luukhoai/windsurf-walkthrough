export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}
