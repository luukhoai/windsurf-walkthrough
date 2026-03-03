---
name: Backend Security Scan
description: Security scanning and vulnerability detection for Python backend
---

# Backend Security Scan Skill

This skill guides through security scanning and vulnerability detection for the Flask backend.

## When to Use
- Before merging code
- After implementing new features
- As part of the development workflow
- When fixing security issues

## Security Tools

### Snyk (Primary)
- Dependency vulnerability scanning
- Code security analysis
- Integrated with CI/CD

### Manual Security Checks
- Input validation review
- Authentication/authorization checks
- Data handling review

## Commands

### Install Snyk (if needed)
```bash
npm install -g snyk
```

### Run Snyk Code Scan
```bash
cd contact-form-app/backend
snyk code test --severity-threshold=medium
```

### Run Snyk Dependency Scan
```bash
snyk test --severity-threshold=medium
```

### Run Snyk for Python
```bash
snyk code test --language=python --severity-threshold=medium
```

## Common Security Issues

### 1. SQL Injection
```python
# Bad - SQL injection vulnerable
query = f"SELECT * FROM users WHERE name = '{user_input}'"

# Good - Parameterized query
query = "SELECT * FROM users WHERE name = %s"
cursor.execute(query, (user_input,))
```

### 2. Input Validation
```python
# Bad - No validation
email = request.json['email']

# Good - Validate input
def validate_email(email):
    import re
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

if not validate_email(email):
    return jsonify({'error': 'Invalid email'}), 400
```

### 3. Error Handling
```python
# Bad - Expose internal errors
return jsonify({'error': str(e)}), 500

# Good - Generic error message
return jsonify({'error': 'Internal server error'}), 500
```

### 4. Hardcoded Secrets
```python
# Bad
API_KEY = "sk-1234567890"

# Good - Use environment variables
import os
API_KEY = os.environ.get('API_KEY')
```

## Security Checklist

### Input Validation
- [ ] All user inputs validated
- [ ] Email format checked
- [ ] String length limits enforced
- [ ] Special characters sanitized

### Data Handling
- [ ] No sensitive data in logs
- [ ] Passwords hashed if stored
- [ ] Environment variables for secrets

### Error Handling
- [ ] No stack traces exposed
- [ ] Generic error messages
- [ ] Proper HTTP status codes

### Dependencies
- [ ] No known vulnerabilities in dependencies
- [ ] Dependencies up to date

## Related Rules

See `.windsurf/rules/secure-development.md` for detailed security guidelines.

## How to Invoke

```
Scan backend code for security issues using the backend-security-scan skill
Run security scan using the backend-security-scan skill
```
