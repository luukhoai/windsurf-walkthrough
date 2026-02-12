---
name: Add Form Field
description: Step-by-step guide for adding new fields to the contact form
---

# Add Form Field Skill

This skill guides Cascade through the complete process of adding a new field to the contact form, ensuring all layers are updated consistently.

## Overview
Adding a form field requires changes across multiple files:
1. Frontend TypeScript interfaces
2. React component (UI and state)
3. Validation logic
4. Backend API endpoint
5. Tests

## Step-by-Step Process

### Step 1: Update TypeScript Interfaces
File: `contact-form-app/frontend/src/components/ContactForm.tsx`

Add the new field to:
- `ContactFormData` interface
- `FormErrors` interface (if validation needed)

### Step 2: Update Initial State
In the same file, add the field to:
- `formData` initial state with default value
- `errors` initial state (empty string)

### Step 3: Add UI Element
Add the input field in the JSX:
- Label with proper `htmlFor` attribute
- Input with `name`, `value`, and `onChange` handler
- Error display element

### Step 4: Update Validation
In `validateForm` function:
- Add validation rules for the new field
- Set appropriate error messages

### Step 5: Update Backend
File: `contact-form-app/backend/app.py`

- Update the API endpoint to accept the new field
- Add server-side validation
- Update any data storage logic

### Step 6: Add Tests
- Add unit tests for the new validation
- Add integration tests for form submission
- Test error states

## Example: Adding a Phone Field

```typescript
// Interface update
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone: string;  // New field
}

// Initial state
const [formData, setFormData] = useState<ContactFormData>({
  name: '',
  email: '',
  message: '',
  phone: '',  // New field
});

// Validation
if (formData.phone && !isValidPhoneNumber(formData.phone)) {
  newErrors.phone = 'Please enter a valid phone number';
}
```

## How to Invoke
```
Add a [field name] field to the contact form using the add-form-field skill
```

## Checklist
- [ ] TypeScript interfaces updated
- [ ] Initial state includes new field
- [ ] UI element added with proper accessibility
- [ ] Client-side validation implemented
- [ ] Backend updated to handle new field
- [ ] Tests added/updated
- [ ] Form still submits correctly
