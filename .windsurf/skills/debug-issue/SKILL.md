---
name: Debug Issue
description: Systematic approach to debugging issues in the contact form app
---

# Debug Issue Skill

This skill provides a structured approach to identifying and resolving bugs in the application.

## Debugging Framework

### Phase 1: Reproduce
1. Understand the expected behavior
2. Identify the actual behavior
3. Find reliable reproduction steps
4. Note any error messages or logs

### Phase 2: Isolate
1. Determine if the issue is frontend or backend
2. Check browser console for errors
3. Check server logs for errors
4. Identify the specific component/function involved

### Phase 3: Diagnose
1. Add targeted logging statements
2. Use debugger breakpoints if needed
3. Trace the data flow
4. Identify the root cause (not just symptoms)

### Phase 4: Fix
1. Implement the minimal fix
2. Avoid introducing new issues
3. Consider edge cases
4. Update tests to prevent regression

### Phase 5: Verify
1. Confirm the fix resolves the issue
2. Run existing tests
3. Test related functionality
4. Remove debug logging

## Common Issues in Contact Form App

### Form Not Submitting
Check:
- Network tab for API errors
- CORS configuration
- Backend server running
- API endpoint URL correct

### Validation Not Working
Check:
- Validation function being called
- Error state being set correctly
- Error messages displaying in UI

### Data Not Persisting
Check:
- Backend receiving data correctly
- Database/storage operations
- Response handling in frontend

## Logging Patterns

### Frontend (React)
```typescript
console.log('[ContactForm] Form data:', formData);
console.log('[ContactForm] Validation errors:', errors);
console.log('[ContactForm] API response:', response);
```

### Backend (Python)
```python
print(f"[API] Received data: {request.json}")
print(f"[API] Validation result: {is_valid}")
print(f"[API] Response: {response_data}")
```

## How to Invoke
```
Debug the [issue description] using the debug-issue skill
```

## Checklist
- [ ] Issue reproduced consistently
- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Fix verified
- [ ] Tests added/updated
- [ ] Debug logging removed
