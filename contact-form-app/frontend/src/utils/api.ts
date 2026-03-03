import { ContactFormData, ApiResponse } from "../types/form";

const API_BASE_URL = "http://127.0.0.1:5000";

/**
 * Submits contact form data to the backend API.
 */
export const submitContactForm = async (
  data: ContactFormData,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
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
