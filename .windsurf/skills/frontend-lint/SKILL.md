---
name: Frontend Lint
description: Code linting and formatting skill for React TypeScript frontend
---

# Frontend Lint Skill

This skill guides through linting and formatting React TypeScript code to maintain code quality.

## When to Use
- Before committing code
- After implementing new features
- During code review
- As part of the development workflow

## Linting Tools

### ESLint (Primary)
- TypeScript analysis
- React best practices
- Code quality rules
- Import sorting

### Prettier (Optional)
- Code formatting
- Consistent style

## Commands

### Run ESLint
```bash
cd contact-form-app/frontend
npm run lint
```

### Run ESLint on specific file
```bash
npx eslint src/components/ContactForm.tsx
```

### Run with auto-fix
```bash
npx eslint src/ --fix
```

### Run Prettier
```bash
npx prettier --write src/
```

### Run both
```bash
npm run lint && npx prettier --check src/
```

## Common Issues and Fixes

### Missing TypeScript Types
```typescript
// Bad
const [value, setValue] = useState(null);

// Good
const [value, setValue] = useState<string | null>(null);
```

### Unused Variables
```typescript
// Bad
const calculate = (a: number, b: number) => {
  const result = a + b;
  return a;  // 'result' is unused
};

// Good
const calculate = (a: number, b: number) => {
  return a + b;
};
```

### Missing Dependencies in useEffect
```typescript
// Bad - missing dependency
useEffect(() => {
  fetchData();
}, []);

// Good
useEffect(() => {
  fetchData();
}, [dependency]);
```

### JSX Type Errors
```typescript
// Bad
<input type="text" onChange={handleChange} />;
// 'handleChange' has wrong type

// Good
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

### Improper Null Handling
```typescript
// Bad
const name = user.name;  // user might be null

// Good
const name = user?.name ?? 'Unknown';
```

### Missing Key in Map
```typescript
// Bad
{items.map(item => <div>{item.name}</div>)}

// Good
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

## ESLint Configuration

### Key Rules
```json
{
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-key": "error"
  }
}
```

## Checklist

- [ ] Run ESLint on modified files
- [ ] Fix all linting errors
- [ ] Fix all warnings (optional but recommended)
- [ ] Run Prettier formatter
- [ ] No `any` types used
- [ ] All components properly typed

## Related Rules

See `.windsurf/rules/code-style-guide.md` for code style guidelines:
- Use functional components (avoid class-based)
- Use 2 spaces for indentation

## How to Invoke

```
Lint the frontend code using the frontend-lint skill
Run ESLint on [file] using the frontend-lint skill
```
