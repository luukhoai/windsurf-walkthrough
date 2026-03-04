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
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  FormText,
  Button,
  Alert,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";

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
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup className="mb-3">
        <FormLabel htmlFor="name">
          Name{" "}
          <span className="text-danger" aria-label="required">
            *
          </span>
        </FormLabel>
        <FormControl
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
          aria-required="true"
          aria-describedby={errors.name ? "name-error" : undefined}
          disabled={isSubmitting}
          placeholder="Enter your name"
        />
        {errors.name && (
          <div className="invalid-feedback d-block" id="name-error">
            {errors.name}
          </div>
        )}
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="email">
          Email{" "}
          <span className="text-danger" aria-label="required">
            *
          </span>
        </FormLabel>
        <FormControl
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          aria-required="true"
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={isSubmitting}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <div className="invalid-feedback d-block" id="email-error">
            {errors.email}
          </div>
        )}
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="message">
          Message{" "}
          <span className="text-danger" aria-label="required">
            *
          </span>
        </FormLabel>
        <FormControl
          as="textarea"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          isInvalid={!!errors.message}
          aria-required="true"
          aria-describedby={errors.message ? "message-error" : undefined}
          disabled={isSubmitting}
          placeholder="Enter your message (10-500 characters)"
          rows={5}
          style={{ minHeight: "120px", resize: "vertical" }}
        />
        {errors.message && (
          <div className="invalid-feedback d-block" id="message-error">
            {errors.message}
          </div>
        )}
      </FormGroup>

      <FormGroup className="mb-4">
        <FormLabel htmlFor="attachment">Attachment (Optional)</FormLabel>
        <FormControl
          type="file"
          id="attachment"
          name="attachment"
          onChange={handleFileChange}
          isInvalid={!!errors.attachment}
          aria-describedby={errors.attachment ? "attachment-error" : undefined}
          disabled={isSubmitting}
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
        />
        {formData.attachment && (
          <FormText className="text-success mt-2">
            Selected: {formData.attachment.name} ({formatFileSize(formData.attachment.size)})
          </FormText>
        )}
        {errors.attachment && (
          <div className="invalid-feedback d-block" id="attachment-error">
            {errors.attachment}
          </div>
        )}
        <FormText className="text-muted">
          Allowed types: PDF, DOC, DOCX, TXT, JPG, JPEG, PNG (Max: 5MB)
        </FormText>
      </FormGroup>

      {submitStatus === "success" && (
        <Alert variant="success" role="status" className="mb-3">
          {submitMessage}
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert variant="danger" role="alert" className="mb-3">
          {submitMessage}
        </Alert>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-100"
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
      </Button>
    </Form>
  );
};

export default ContactForm;
