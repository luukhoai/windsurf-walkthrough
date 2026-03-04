---
name: Frontend Code
description: Frontend implementation: code + lint + security scan
---

# Frontend Code Skill

Implement frontend code with linting and security scanning.

## When to Use
- Implementing new components
- Adding new features
- Creating utility functions
- After analysis stage

## Concept

- **This skill**: Implementation + Lint + Security Scan
- **Review**: See `frontend-review` skill
- **Rules**: Standards (`.windsurf/rules/`)

## Implementation

See `.windsurf/rules/frontend-development.md` for project structure.

### Where to Add Code

| Type | Location |
|------|----------|
| New component | `src/components/MyComponent.tsx` |
| New page | `src/pages/MyPage.tsx` |
| New utility | `src/utils/myUtils.ts` |
| New CSS | Same folder as component |

### Component Pattern
```typescript
interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}

const MyComponent: React.FC<Props> = ({ title, onSubmit }) => {
  return (
    <div className="my-component">
      <h1>{title}</h1>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default MyComponent;
```

## Lint

### Run Lint
```bash
cd contact-form-app/frontend
npm run lint
```

### Common Fixes

| Issue | Fix |
|-------|-----|
| `any` type | Use proper type |
| Missing dependency | Add to useEffect deps |
| Missing key | Add unique key in map |

## Security Scan

### Run Security Scan
```bash
snyk code test --severity-threshold=medium
npm audit
```

### Security Checklist

- [ ] No XSS vulnerabilities
- [ ] No hardcoded secrets
- [ ] Input validation implemented

## Commands

### Run App
```bash
cd contact-form-app/frontend
npm start
```

### Run Tests
```bash
npm test -- --watchAll=false
```

### Run Lint
```bash
npm run lint
```

### Run Security Scan
```bash
snyk code test --severity-threshold=medium
npm audit
```

## Checklist

- [ ] Code follows React patterns
- [ ] TypeScript types proper
- [ ] State management appropriate
- [ ] Error handling in place
- [ ] Accessibility considered
- [ ] Tests written
- [ ] Lint passes
- [ ] Security scan passes

## Related Rules

See `.windsurf/rules/frontend-development.md`

## How to Invoke

```
Implement [feature] using the frontend-code skill
```

## Related Skills

- **Review**: Use `frontend-review` skill for code review
