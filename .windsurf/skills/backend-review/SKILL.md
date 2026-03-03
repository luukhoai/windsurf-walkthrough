---
name: Backend Review
description: Code review skill specialized for Python Flask backend
---

# Backend Review Skill

This skill guides through code review for Python Flask backend code.

## When to Use
- Before merging pull requests
- When reviewing backend implementations
- During code quality audits

## Review Checklist

### 1. Functionality
- [ ] Does the code accomplish its intended purpose?
- [ ] Are edge cases handled appropriately?
- [ ] Does the API follow RESTful conventions?

### 2. Code Quality
- [ ] Is the code readable and well-organized?
- [ ] Are variable and function names descriptive?
- [ ] Is there unnecessary code duplication?
- [ ] Does it follow PEP 8?

### 3. API Design
- [ ] Are HTTP methods used correctly (GET, POST, etc.)?
- [ ] Are proper status codes returned?
- [ ] Is error handling consistent?

### 4. Security
- [ ] Are user inputs validated and sanitized?
- [ ] Are there any potential SQL injection vulnerabilities?
- [ ] Is sensitive data handled appropriately?
- [ ] Are error messages not exposing internals?

### 5. Testing
- [ ] Are there adequate unit tests?
- [ ] Do tests cover edge cases and error conditions?
- [ ] Are tests readable and maintainable?

### 6. Performance
- [ ] Are there obvious performance bottlenecks?
- [ ] Is resource usage reasonable?
- [ ] Are expensive operations optimized?

### 7. Logging
- [ ] Is logging appropriate (not too much, not too little)?
- [ ] Are sensitive data not logged?

## Backend-Specific Checks

### Flask Patterns
- [ ] Routes properly decorated
- [ ] Request parsing handled correctly
- [ ] JSON responses properly formatted

### Error Handling
- [ ] Custom error handlers defined
- [ ] Exceptions caught and handled
- [ ] 404/500 errors handled properly

### Database (if applicable)
- [ ] Queries use parameterized statements
- [ ] Connections properly managed
- [ ] Transactions used when needed

## Related Rules

See `.windsurf/rules/secure-development.md` for security guidelines:
- Use parameterized queries (prevent SQL injection)
- Validate and sanitize all user inputs

## How to Invoke

```
Review the backend code using the backend-review skill
```

## Output Format

Provide feedback organized by category with specific line references and actionable suggestions.
