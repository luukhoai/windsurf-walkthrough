import { ContactFormData, ApiResponse } from "../types/form";

const API_BASE_URL = "http://127.0.0.1:5000";

/**
 * Submits contact form data to the backend API.
 * Supports both JSON (without attachment) and FormData (with attachment).
 */
export const submitContactForm = async (
  data: ContactFormData,
): Promise<ApiResponse> => {
  try {
    let response: Response;

    if (data.attachment) {
      // Use FormData for file upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);
      formData.append("attachment", data.attachment);

      response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: "POST",
        body: formData, // Don't set Content-Type header for FormData
      });
    } else {
      // Use JSON for submissions without attachment
      response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`,
      );
    }

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again.",
    };
  }
};

/**
 * Fetches all contacts from the backend API.
 */
export const fetchContacts = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contacts`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contacts = await response.json();
    return { success: true, data: contacts };
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch contacts",
    };
  }
};

/**
 * Searches contacts using the backend search API.
 */
export const searchContacts = async (
  query: string,
  field: string = 'all',
  sortField: string = 'created_at',
  sortOrder: string = 'desc'
): Promise<ApiResponse> => {
  try {
    if (!query.trim()) {
      // If empty query, fetch all contacts
      return fetchContacts();
    }

    const params = new URLSearchParams({
      q: query,
      field: field,
      sort: sortField,
      order: sortOrder
    });

    const response = await fetch(`${API_BASE_URL}/api/contacts/search?${params}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return { success: true, data: result.data };
  } catch (error) {
    console.error("Error searching contacts:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to search contacts",
    };
  }
};
