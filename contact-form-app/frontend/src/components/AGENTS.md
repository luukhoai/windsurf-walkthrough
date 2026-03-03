# Component Development Guidelines

## Structure

- Each component should be in its own file
- Use TypeScript interfaces for props
- Export components as named exports

## Styling

- Use CSS modules or Tailwind CSS utility classes
- Avoid inline styles where possible
- Keep responsive design in mind (mobile-first approach)

## State Management

- Prefer useState for local component state
- Use useReducer for complex state logic
- Lift state up only when necessary for sibling communication

## Form Validation

- All form inputs must have client-side validation
- Display validation errors inline below the input field
- Use the existing validation utility functions in this codebase

## Accessibility

- Include proper ARIA labels on interactive elements
- Ensure keyboard navigation works correctly
- Maintain sufficient color contrast ratios
