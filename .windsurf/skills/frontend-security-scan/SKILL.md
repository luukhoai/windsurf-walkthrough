---
name: Frontend Security Scan
description: Security scanning and vulnerability detection for React TypeScript frontend
---

# Frontend Security Scan Skill

This skill guides through security scanning and vulnerability detection for the React frontend.

## When to Use
- Before merging code
- After implementing new features
- As part of the development workflow
- When fixing security issues

## Security Tools

### Snyk (Primary)
- Dependency vulnerability scanning
- Code security analysis (SAST)
- Integrated with CI/CD

### npm Audit
- Check for vulnerable dependencies
- Built into npm

## Commands

### Install Snyk (if needed)
```bash
npm install -g snyk
```

### Run Snyk Code Scan
```bash
cd contact-form-app/frontend
snyk code test --severity-threshold=medium
```

### Run npm Audit
```bash
cd contact-form-app/frontend
npm audit
```

### Run npm Audit with Fix
```bash
npm audit fix
```

## Common Security Issues

### 1. XSS (Cross-Site Scripting)
```typescript
// Bad - using dangerouslySetInnerHTML
const Component = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);

// Good - render as text
const Component = ({ content }) => (
  <div>{content}</div>
);
```

### 2. Sensitive Data in Code
```typescript
// Bad - hardcoded API keys
const API_KEY = 'sk-1234567890';

// Good - use environment variables
const API_KEY = process.env.REACT_APP_API_KEY;
```

### 3. Missing Input Validation
```typescript
// Bad - no validation
const handleSubmit = (data) => {
  api.post(data);
};

// Good - validate before sending
const handleSubmit = (data) => {
  if (!validateForm(data)) return;
  api.post(data);
};
```

### 4. Missing CSRF Protection
```typescript
// Bad - no CSRF consideration
fetch('/api/data', {
  method: 'POST',
  body: JSON.stringify(data),
});

// Good - include CSRF token
fetch('/api/data', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': getCsrfToken(),
  },
  body: JSON.stringify(data),
});
```

### 5. Logging Sensitive Data
```typescript
// Bad - log sensitive info
console.log('User login:', user.password);

// Good - never log sensitive data
console.log('User login:', user.email);
```

### 6. Insecure URL Construction
```typescript
// Bad - URL injection
const url = `${baseUrl}/${userInput}`;

// Good - validate and encode
const url = `${baseUrl}/${encodeURIComponent(userInput)}`;
```

## React Security Best Practices

### Use TypeScript for Type Safety
```typescript
// Good - proper types prevent many issues
interface UserInput {
  name: string;
  email: string;
}

const processInput = (input: UserInput) => {
  // TypeScript ensures input has required fields
};
```

### Sanitize User Input
```typescript
import DOMPurify from 'dompurify';

// Good - sanitize before rendering
const SafeComponent = ({ content }) => (
  <div dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(content)
  }} />
);
```

### Use Environment Variables
```typescript
// .env file
REACT_APP_API_URL=http://localhost:5000
REACT_APP_DEBUG=false

// Usage
const apiUrl = process.env.REACT_APP_API_URL;
```

## Security Checklist

### Input Handling
- [ ] All user inputs validated
- [ ] No use of dangerouslySetInnerHTML (or sanitized)
- [ ] URLs properly encoded

### Data Handling
- [ ] No sensitive data in code
- [ ] API keys in environment variables
- [ ] No sensitive data in logs

### Dependencies
- [ ] No known vulnerabilities in dependencies
- [ ] Dependencies up to date

### Authentication
- [ ] Token stored securely (httpOnly cookie preferred)
- [ ] Session timeout implemented

## How to Invoke

```
Scan frontend code for security issues using the frontend-security-scan skill
Run security scan using the frontend-security-scan skill
Check dependencies using npm audit
```
