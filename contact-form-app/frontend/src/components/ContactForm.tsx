import React, { useState } from "react";
import { ContactFormData, FormErrors } from "../types/form";
import {
  validateName,
  validateEmail,
  validateMessage,
  validateAttachment,
  sanitizeInputString,
  formatFileSize,
} from "../utils/validation";
import { submitContactForm } from "../utils/api";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    attachment: undefined,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    // Validate message
    const messageValidation = validateMessage(formData.message);
    if (!messageValidation.isValid) {
      newErrors.message = messageValidation.error;
    }

    // Validate attachment
    const attachmentValidation = validateAttachment(
      formData.attachment || null,
    );
    if (!attachmentValidation.isValid) {
      newErrors.attachment = attachmentValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    const sanitizedData = {
      name: sanitizeInputString(formData.name),
      email: formData.email.trim(),
      message: formData.message.trim(),
      attachment: formData.attachment,
    };

    try {
      const result = await submitContactForm(sanitizedData);

      if (result.success) {
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setSubmitStatus("success");
        setSubmitMessage("Form submitted successfully!");
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          result.error || "Failed to submit form. Please try again.",
        );
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      attachment: file || undefined,
    }));

    // Clear attachment error when file is selected
    if (file && errors.attachment) {
      setErrors((prev) => ({
        ...prev,
        attachment: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name{" "}
          <span className="required" aria-label="required">
            *
          </span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${errors.name ? "error" : ""}`}
          aria-required="true"
          aria-describedby={errors.name ? "name-error" : undefined}
          disabled={isSubmitting}
          placeholder="Enter your name"
        />
        {errors.name && (
          <div id="name-error" className="error-message" role="alert">
            {errors.name}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email{" "}
          <span className="required" aria-label="required">
            *
          </span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? "error" : ""}`}
          aria-required="true"
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={isSubmitting}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <div id="email-error" className="error-message" role="alert">
            {errors.email}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message{" "}
          <span className="required" aria-label="required">
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`form-textarea ${errors.message ? "error" : ""}`}
          aria-required="true"
          aria-describedby={errors.message ? "message-error" : undefined}
          disabled={isSubmitting}
          placeholder="Enter your message (10-500 characters)"
          rows={5}
        />
        {errors.message && (
          <div id="message-error" className="error-message" role="alert">
            {errors.message}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="attachment" className="form-label">
          Attachment (Optional)
        </label>
        <input
          type="file"
          id="attachment"
          name="attachment"
          onChange={handleFileChange}
          className={`form-input ${errors.attachment ? "error" : ""}`}
          aria-describedby={errors.attachment ? "attachment-error" : undefined}
          disabled={isSubmitting}
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
        />
        {formData.attachment && (
          <div className="file-info">
            Selected: {formData.attachment.name} (
            {formatFileSize(formData.attachment.size)})
          </div>
        )}
        {errors.attachment && (
          <div id="attachment-error" className="error-message" role="alert">
            {errors.attachment}
          </div>
        )}
        <div className="file-help">
          Allowed types: PDF, DOC, DOCX, TXT, JPG, JPEG, PNG (Max: 5MB)
        </div>
      </div>

      {submitStatus === "success" && (
        <div className="success-message" role="status">
          {submitMessage}
        </div>
      )}

      {submitStatus === "error" && (
        <div className="error-message" role="alert">
          {submitMessage}
        </div>
      )}

      <button
        type="submit"
        className="submit-button"
        disabled={
          isSubmitting ||
          Object.keys(errors).length > 0 ||
          !formData.name ||
          !formData.email ||
          !formData.message
        }
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ContactForm;
