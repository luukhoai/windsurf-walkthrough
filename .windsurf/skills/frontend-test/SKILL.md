---
name: frontend-test
description: Professional frontend testing skill for React TypeScript applications
---

# Frontend Test Skill

This skill guides through writing and maintaining professional tests for the React frontend.

## When to Use
- Writing new unit tests
- Adding tests for new components
- Debugging test failures
- Improving test coverage

## Test Framework
- **Framework**: Jest (via react-scripts)
- **Testing Library**: @testing-library/react
- **User Events**: @testing-library/user-event
- **Assertions**: Jest expect

## Test File Structure

File: `src/App.test.tsx` (or next to component)

```typescript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(<MyComponent onSubmit={handleSubmit} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(handleSubmit).toHaveBeenCalled();
  });
});
```

## Running Tests

### Run All Tests
```bash
cd contact-form-app/frontend
npm test
```

### Run Tests Once
```bash
npm test -- --watchAll=false
```

### Run Specific Test File
```bash
npm test -- ContactForm.test.tsx
```

### Run Tests with Coverage
```bash
npm test -- --coverage --watchAll=false
```

### Run in Watch Mode
```bash
npm test -- --watch
```

## Test Patterns

### Component Tests
```typescript
// Testing rendering
it('renders form fields', () => {
  render(<ContactForm />);

  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
});

// Testing validation
it('shows error for invalid email', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  await user.type(screen.getByLabelText(/email/i), 'invalid');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
});
```

### Form Testing
```typescript
it('submits form data', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<ContactForm onSubmit={handleSubmit} />);

  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.type(screen.getByLabelText(/message/i), 'Hello');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello',
  });
});
```

### API Mocking
```typescript
it('handles API error', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: false,
    status: 500,
  } as Response);

  render(<ContactForm />);

  // Fill and submit form...

  await waitFor(() => {
    expect(screen.getByText(/error occurred/i)).toBeInTheDocument();
  });
});
```

## Common Assertions

```typescript
// Element exists
expect(screen.getByText('Text')).toBeInTheDocument();
expect(screen.queryByText('Text')).toBeInTheDocument(); // nullable

// Element not exists
expect(screen.queryByText('Text')).not.toBeInTheDocument();

// Input value
expect(screen.getByLabelText(/name/i)).toHaveValue('John');

// Function called
expect(handleSubmit).toHaveBeenCalled();
expect(handleSubmit).toHaveBeenCalledWith(data);

// State
expect(screen.getByRole('button')).toBeDisabled();
expect(screen.getByRole('button')).toBeEnabled();
```

## Test Checklist

- [ ] Component renders without errors
- [ ] User interactions work correctly
- [ ] Form validation works
- [ ] Error states handled
- [ ] Loading states handled
- [ ] API calls mocked correctly
- [ ] Edge cases covered

## Best Practices

1. **Test behavior, not implementation** - Test what user sees
2. **Use semantic queries** - getByRole, getByLabelText over getByTestId
3. **One test per behavior** - Each test should verify one thing
4. **Descriptive names** - Test names should describe what they test
5. **Arrange-Act-Assert** - Structure tests clearly

## How to Invoke

```
Write tests for [component] using the frontend-test skill
Run tests using the frontend-test skill
```
