---
name: Frontend Review
description: Code review skill specialized for React TypeScript frontend
---

# Frontend Review Skill

This skill guides through code review for React TypeScript frontend code.

## When to Use
- Before merging pull requests
- When reviewing frontend implementations
- During code quality audits

## Review Checklist

### 1. Functionality
- [ ] Does the code accomplish its intended purpose?
- [ ] Are edge cases handled appropriately?
- [ ] Does it integrate correctly with backend API?

### 2. Code Quality
- [ ] Is the code readable and well-organized?
- [ ] Are variable and function names descriptive?
- [ ] Is there unnecessary code duplication?
- [ ] Does it follow project's coding conventions?

### 3. TypeScript
- [ ] Are proper types used (no `any`)?
- [ ] Are interfaces/types properly defined?
- [ ] Are props and state properly typed?

### 4. React Patterns
- [ ] Using functional components with hooks?
- [ ] Are hooks rules followed (dependencies in useEffect)?
- [ ] Is state management appropriate?
- [ ] Are custom hooks extracted when needed?

### 5. Accessibility
- [ ] Are proper ARIA labels used?
- [ ] Is keyboard navigation supported?
- [ ] Are form inputs properly labeled?

### 6. Security
- [ ] Are user inputs validated?
- [ ] Is sensitive data handled properly?
- [ ] Are API calls secure?

### 7. Testing
- [ ] Are there adequate unit tests?
- [ ] Do tests cover edge cases?
- [ ] Are components properly tested?

### 8. UI/UX
- [ ] Is loading state handled?
- [ ] Is error state handled?
- [ ] Is user feedback provided?

## Frontend-Specific Checks

### Component Structure
- [ ] Components are properly separated
- [ ] Props are well-defined
- [ ] Component is focused (single responsibility)

### State Management
- [ ] State is properly initialized
- [ ] State updates are correct
- [ ] No unnecessary re-renders

### Event Handling
- [ ] Event handlers properly typed
- [ ] Forms properly validated
- [ ] User interactions handled

### CSS/Styling
- [ ] Styles are properly organized
- [ ] Responsive design considered
- [ ] No inline styles (unless necessary)

## Related Rules

See `.windsurf/rules/code-style-guide.md` for code style guidelines:
- Use functional components (avoid class-based)
- Use 2 spaces for indentation

## How to Invoke

```
Review the frontend code using the frontend-review skill
```

## Output Format

Provide feedback organized by category with specific line references and actionable suggestions.
