---
trigger: always_on
description: when working on frontend React TypeScript code
globs: ["**/*.tsx", "**/*.ts", "**/*.css"]
---

## React Development Standards
- Use functional components with hooks (avoid class-based components)
- Use 2 spaces for indentation
- Use TypeScript with proper typing (no `any`)
- Follow React best practices for state management

## Project Structure
See `AGENTS.md` for full project structure.

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


## Entry Points
- **Run app**: `npm start`
- **Run tests**: `npm test`
- **Run lint**: `npm run lint`
- **Build**: `npm run build`
