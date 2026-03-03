/**
 * Checks if the provided string is a valid e-mail address.
 *
 * Regular expression breakdown:
 *   ^[\w.-]+        → one or more word, dot, or dash characters at the very start (local part)
 *   @               → literal at-sign separating local and domain parts
 *   [\w.-]+         → domain name allowing sub-domains (letters, digits, underscore, dot, dash)
 *   \.[A-Za-z]{2,}$ → a dot followed by a top-level domain with at least two letters until the end of the string
 *
 * Matching example: "user@example.com"
 * Failing examples: "user@", "example.com", "@example.com"
 */
export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Sanitizes input string by removing extra whitespace and special characters.
 */
export const sanitizeInputString = (inputString: string): string => {
  // Remove extra whitespace
  const noExtraWhitespace = inputString.replace(/\s+/g, " ");
  // Trim
  const trimmed = noExtraWhitespace.trim();
  // Remove special characters (keep letters, numbers, spaces, and basic punctuation)
  const noSpecialCharacters = trimmed.replace(/[^\w\s.,!?'-]/gi, "");
  return noSpecialCharacters;
};

/**
 * Validates string length within min and max bounds.
 */
export const isStringLengthValid = (
  str: string,
  min: number,
  max: number,
): boolean => {
  const length = str.trim().length;
  return length >= min && length <= max;
};

/**
 * Validates name field (2-50 characters, letters, spaces, hyphens, apostrophes).
 */
export const validateName = (
  name: string,
): { isValid: boolean; error?: string } => {
  if (!name.trim()) {
    return { isValid: false, error: "Name is required" };
  }

  if (!isStringLengthValid(name, 2, 50)) {
    return {
      isValid: false,
      error: "Name must be between 2 and 50 characters",
    };
  }

  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return {
      isValid: false,
      error: "Name can only contain letters, spaces, hyphens, and apostrophes",
    };
  }

  return { isValid: true };
};

/**
 * Validates email field.
 */
export const validateEmail = (
  email: string,
): { isValid: boolean; error?: string } => {
  if (!email.trim()) {
    return { isValid: false, error: "Email is required" };
  }

  if (!isEmailValid(email.trim())) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true };
};

/**
 * Validates message field (10-500 characters).
 */
export const validateMessage = (
  message: string,
): { isValid: boolean; error?: string } => {
  if (!message.trim()) {
    return { isValid: false, error: "Message is required" };
  }

  if (!isStringLengthValid(message, 10, 500)) {
    return {
      isValid: false,
      error: "Message must be between 10 and 500 characters",
    };
  }

  return { isValid: true };
};

/**
 * Validates attachment file (optional field).
 */
export const validateAttachment = (
  file: File | null,
): { isValid: boolean; error?: string } => {
  if (!file) {
    return { isValid: true }; // Attachment is optional
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "File size too large. Maximum size is 5MB",
    };
  }

  // Check file extension
  const allowedExtensions = ["pdf", "doc", "docx", "txt", "jpg", "jpeg", "png"];
  const fileExtension = file.name.split(".").pop()?.toLowerCase();

  if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
    return {
      isValid: false,
      error:
        "File type not allowed. Allowed types: pdf, doc, docx, txt, jpg, jpeg, png",
    };
  }

  return { isValid: true };
};

/**
 * Formats file size for display.
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
