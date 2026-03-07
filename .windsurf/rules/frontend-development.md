---
trigger: always_on
description: Production-ready enterprise standards for React TypeScript frontend development
globs: contact-form-app/frontend/*
---

# Frontend Development Standards

## React Development Standards
- Use functional components with hooks only (no class-based components)
- Use 2 spaces for indentation throughout codebase
- Use TypeScript with strict typing (no `any` types)
- Follow comprehensive React best practices for enterprise applications
- Implement proper error boundaries and error handling
- Use modern React patterns (Suspense, Concurrent Features)

## Project Structure
See `AGENTS.md` for full project structure and component organization.

## Production Architecture Standards

### Component Architecture
- **Atomic Design Pattern**: Atoms → Molecules → Organisms → Templates → Pages
- **Container/Presentation Pattern**: Separate logic from presentation
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Component Composition**: Favor composition over inheritance

### State Management
- **Local State**: useState for component-specific state
- **Global State**: Context API + useReducer for application state
- **Server State**: React Query/TanStack Query for API state
- **Form State**: Formik or React Hook Form for complex forms

### TypeScript Standards
- **Strict Mode**: Enable all strict TypeScript checks
- **Interfaces**: Use interfaces for object shapes and contracts
- **Types**: Use types for unions, intersections, primitives
- **Generics**: Use generics for reusable components
- **Utility Types**: Leverage built-in utility types (Partial, Pick, Omit)

## Coding Conventions

### React Patterns
```typescript
// Functional component with proper typing
interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
  className?: string;
  children?: React.ReactNode;
}

const MyComponent: React.FC<Props> = ({ 
  title, 
  onSubmit, 
  className = '', 
  children 
}) => {
  // Custom hook for logic
  const { data, loading, error } = useApiData();
  
  // Event handlers with proper typing
  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(data);
  }, [data, onSubmit]);
  
  // Error boundary integration
  if (error) {
    return <ErrorFallback error={error} />;
  }
  
  return (
    <div className={`my-component ${className}`}>
      <h1>{title}</h1>
      {children}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyComponent;
```

### Custom Hooks Pattern
```typescript
// Custom hook for reusable logic
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function useApiData<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [url]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, error, refetch: fetchData };
}
```

### Styling Architecture
- **CSS Modules**: Scoped CSS with module imports
- **CSS-in-JS**: Styled-components or Emotion for dynamic styles
- **Design Tokens**: Centralized design system tokens
- **Responsive Design**: Mobile-first approach with breakpoints
- **Theme System**: Consistent theming across application

### CSS Module Pattern
```css
/* MyComponent.module.css */
.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
}

.title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.button {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-md);
  background-color: var(--color-primary);
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover {
  background-color: var(--color-primary-dark);
}
```

## Performance Standards

### Code Splitting
- **Route-based**: Lazy loading for route components
- **Component-based**: React.lazy for heavy components
- **Bundle Analysis**: Regular bundle size monitoring

### Optimization Techniques
- **Memoization**: React.memo, useMemo, useCallback
- **Virtualization**: react-window for large lists
- **Image Optimization**: WebP format, lazy loading
- **Bundle Optimization**: Tree shaking, compression

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS monitoring
- **Bundle Size**: webpack-bundle-analyzer integration
- **Runtime Performance**: React DevTools Profiler

## Accessibility Standards (WCAG 2.1 AA)

### Semantic HTML
- **Proper Landmarks**: header, nav, main, footer, section
- **Heading Structure**: Logical h1-h6 hierarchy
- **Form Labels**: Proper label associations
- **Link Context**: Descriptive link text

### ARIA Implementation
- **Roles**: Proper ARIA roles for custom components
- **States**: aria-expanded, aria-disabled, aria-selected
- **Labels**: aria-label, aria-labelledby, aria-describedby
- **Live Regions**: aria-live for dynamic content

### Keyboard Navigation
- **Tab Order**: Logical tab navigation flow
- **Focus Management**: Focus trapping in modals
- **Shortcuts**: Keyboard shortcuts for common actions
- **Skip Links**: Skip to main content links

## Testing Standards

### Unit Testing (Jest + React Testing Library)
- **Component Testing**: Render, user interactions, state changes
- **Hook Testing**: @testing-library/react-hooks
- **Mock Strategy**: MSW for API mocking
- **Coverage**: >80% coverage requirement

### Integration Testing
- **User Workflows**: End-to-end user journeys
- **API Integration**: Real API integration tests
- **Component Integration**: Multi-component interactions
- **Accessibility Testing**: axe-core integration

### E2E Testing (Playwright/Cypress)
- **Critical Paths**: Key user workflows
- **Cross-browser**: Multiple browser testing
- **Mobile Testing**: Responsive design verification
- **Performance Testing**: Load time measurements

## Security Standards

### Input Validation
- **Client-side Validation**: Form validation before submission
- **XSS Prevention**: Proper output escaping
- **CSRF Protection**: CSRF tokens for forms
- **Content Security Policy**: CSP headers implementation

### Data Protection
- **Sensitive Data**: No sensitive data in localStorage
- **API Keys**: Environment variable management
- **Authentication**: JWT token handling
- **Authorization**: Role-based access control

### Security Headers
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing protection
- **Referrer-Policy**: Referrer information control
- **Permissions-Policy**: Feature policy control

## Build & Deployment Standards

### Build Configuration
- **Production Build**: Optimized, minified, compressed
- **Environment Variables**: Proper env var management
- **Asset Optimization**: Image optimization, compression
- **Bundle Analysis**: Regular bundle size monitoring

### CI/CD Integration
- **Automated Testing**: Pre-commit hooks, CI pipeline
- **Code Quality**: ESLint, Prettier, TypeScript checks
- **Security Scanning**: Dependency vulnerability scanning
- **Deployment**: Automated deployment with rollback

### Performance Budgets
- **Bundle Size**: Maximum bundle size limits
- **Asset Size**: Image and font size optimization
- **Load Time**: Performance budgets enforcement
- **Core Web Vitals**: Performance targets

## File Naming & Organization

### Component Structure
```
src/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── Input/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── pages/
├── hooks/
├── utils/
├── services/
├── types/
└── styles/
```

### Naming Conventions
- **Components**: PascalCase (e.g., `ContactForm.tsx`)
- **Files**: camelCase for utilities (e.g., `validation.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)
- **CSS Modules**: ComponentName.module.css

## Development Tools & Configuration

### ESLint Configuration
- **React Rules**: React-specific linting rules
- **TypeScript Rules**: Strict TypeScript checking
- **Accessibility Rules**: jsx-a11y plugin
- **Import Rules**: Proper import organization

### Prettier Configuration
- **Formatting**: Consistent code formatting
- **Integration**: ESLint + Prettier integration
- **Pre-commit**: Husky + lint-staged setup

### TypeScript Configuration
- **Strict Mode**: All strict checks enabled
- **Path Mapping**: Absolute import paths
- **Declaration Files**: Proper type declarations
- **Build Targets**: Modern browser targets

## Entry Points & Commands
- **Development**: `npm start` - Hot reload development server
- **Testing**: `npm test` - Unit and integration tests
- **E2E Testing**: `npm run test:e2e` - End-to-end tests
- **Linting**: `npm run lint` - Code quality checks
- **Type Checking**: `npm run type-check` - TypeScript validation
- **Build**: `npm run build` - Production build
- **Bundle Analysis**: `npm run analyze` - Bundle size analysis
- **Security Audit**: `npm audit` - Dependency security check
