---
name: Frontend Code
description: Professional frontend React TypeScript code implementation following best practices
---

# Frontend Code Skill

This skill guides through professional frontend development for the React TypeScript contact form app.

## When to Use
- Implementing new components
- Adding new features to existing components
- Modifying UI/UX
- Creating utility functions

## Project Structure
```
contact-form-app/frontend/
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   └── index.tsx        # Entry point
├── package.json
└── tsconfig.json
```

## Coding Conventions

### TypeScript
- Use interfaces over types for object shapes
- Use proper TypeScript types (no `any`)
- Enable strict mode in tsconfig

### React Patterns
- Use functional components with hooks
- Use `useState` for local state
- Use `useEffect` for side effects
- Extract custom hooks for reusable logic

### Styling
- Use CSS modules or styled-components
- Keep CSS separate from components
- Follow BEM naming for CSS classes

### Indentation
- Use 2 spaces for indentation

### File Naming
- Components: `PascalCase` (e.g., `ContactForm.tsx`)
- Utils: `camelCase` (e.g., `validation.ts`)
- CSS: Match component name (e.g., `ContactForm.css`)

## Component Patterns

### Functional Component with Types
```typescript
interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}

const MyComponent: React.FC<Props> = ({ title, onSubmit }) => {
  const [state, setState] = useState<string>('');

  const handleClick = () => {
    onSubmit({ value: state });
  };

  return (
    <div className="my-component">
      <h1>{title}</h1>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default MyComponent;
```

### Form Component
```typescript
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const [formData, setFormData] = useState<FormData>({
  name: '',
  email: '',
  message: '',
});

const [errors, setErrors] = useState<FormErrors>({});

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};
```

### API Call
```typescript
const submitForm = async (data: FormData) => {
  try {
    const response = await fetch('http://localhost:5000/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

## Implementation Checklist

- [ ] TypeScript interfaces/types defined
- [ ] Component properly typed
- [ ] State management implemented
- [ ] Event handlers typed
- [ ] Error handling in place
- [ ] Loading states handled
- [ ] Accessibility considered
- [ ] CSS properly structured

## Related Rules

See `.windsurf/rules/code-style-guide.md` for code style guidelines:
- Use functional components (avoid class-based)
- Use 2 spaces for indentation

## How to Invoke

```
Implement [feature] using the frontend-code skill
```

## File Locations

- Components: `contact-form-app/frontend/src/components/`
- Pages: `contact-form-app/frontend/src/pages/`
- Utils: `contact-form-app/frontend/src/utils/`
- Main App: `contact-form-app/frontend/src/App.tsx`
