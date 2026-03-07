---
name: frontend-test
description: Production-ready comprehensive testing skill for enterprise React TypeScript applications
---

# Frontend Test Skill

This skill guides through writing and maintaining professional-grade tests for production frontend systems with comprehensive coverage, accessibility testing, performance validation, and quality assurance.

## When to Use
- Writing production-grade unit tests with >80% coverage
- Adding comprehensive tests for new components and features
- Implementing integration tests for component interactions
- Creating E2E tests for critical user journeys
- Setting up accessibility testing with WCAG compliance
- Implementing performance testing and visual regression testing
- Debugging complex test failures in production systems

## Production Test Framework Stack
- **Core Framework**: Jest with React Testing Library
- **User Interactions**: @testing-library/user-event
- **Hook Testing**: @testing-library/react-hooks
- **Mocking**: MSW (Mock Service Worker) for API mocking
- **Accessibility**: axe-core for automated accessibility testing
- **E2E Testing**: Playwright or Cypress
- **Visual Testing**: Chromatic or Percy for visual regression
- **Performance Testing**: Lighthouse CI for performance metrics

## Production Test Architecture

### Test Structure
```
src/
├── __tests__/              # Test files
│   ├── unit/               # Unit tests
│   │   ├── components/     # Component tests
│   │   ├── hooks/          # Hook tests
│   │   └── utils/          # Utility tests
│   ├── integration/        # Integration tests
│   │   ├── components/     # Component interactions
│   │   └── workflows/      # User workflows
│   ├── e2e/               # End-to-end tests
│   ├── accessibility/     # Accessibility tests
│   ├── performance/       # Performance tests
│   └── visual/           # Visual regression tests
├── mocks/                # Mock data and handlers
├── test-utils/            # Custom test utilities
└── fixtures/             # Test data fixtures
```

## Production Testing Patterns

### Comprehensive Unit Tests
```typescript
// src/__tests__/unit/components/Button/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from '../../../components/atoms/Button/Button';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Button Component', () => {
  const user = userEvent.setup();

  // Rendering tests
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Button>Click me</Button>);
      
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toBeEnabled();
    });

    it('applies variant classes correctly', () => {
      render(<Button variant="secondary">Secondary</Button>);
      
      const button = screen.getByRole('button', { name: /secondary/i });
      expect(button).toHaveClass('button-secondary');
    });

    it('applies size classes correctly', () => {
      render(<Button size="lg">Large</Button>);
      
      const button = screen.getByRole('button', { name: /large/i });
      expect(button).toHaveClass('button-lg');
    });
  });

  // State tests
  describe('States', () => {
    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toBeDisabled();
    });

    it('shows loading state when loading prop is true', () => {
      render(<Button loading>Loading</Button>);
      
      const button = screen.getByRole('button', { name: /loading/i });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button', { name: /click me/i });
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      const button = screen.getByRole('button', { name: /disabled/i });
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const handleClick = jest.fn();
      render(<Button loading onClick={handleClick}>Loading</Button>);
      
      const button = screen.getByRole('button', { name: /loading/i });
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Button>Accessible</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports aria-label', () => {
      render(<Button aria-label="Custom label">Button</Button>);
      
      const button = screen.getByRole('button', { name: /custom label/i });
      expect(button).toBeInTheDocument();
    });

    it('supports data-testid for testing', () => {
      render(<Button data-testid="test-button">Test</Button>);
      
      const button = screen.getByTestId('test-button');
      expect(button).toBeInTheDocument();
    });
  });

  // Type tests
  describe('TypeScript Integration', () => {
    it('accepts all valid props', () => {
      const props = {
        children: 'Test',
        variant: 'primary' as const,
        size: 'md' as const,
        disabled: false,
        loading: false,
        onClick: jest.fn(),
        className: 'custom-class',
        'aria-label': 'Test button',
        'data-testid': 'test-button',
      };

      expect(() => render(<Button {...props} />)).not.toThrow();
    });
  });
});
```

### Custom Hook Testing
```typescript
// src/__tests__/unit/hooks/useApiData.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import { useApiData } from '../../../hooks/useApiData';

// Mock server setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useApiData Hook', () => {
  const mockUrl = '/api/test';

  it('loads data successfully', async () => {
    const mockData = { id: 1, name: 'Test Data' };
    
    server.use(
      rest.get(mockUrl, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ success: true, data: mockData })
        );
      })
    );

    const { result } = renderHook(() => useApiData(mockUrl));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });
  });

  it('handles API errors', async () => {
    server.use(
      rest.get(mockUrl, (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ success: false, message: 'Server Error' })
        );
      })
    );

    const { result } = renderHook(() => useApiData(mockUrl));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toEqual({
        message: 'Server Error',
        status: 500,
      });
    });
  });

  it('supports retry logic', async () => {
    let attemptCount = 0;
    
    server.use(
      rest.get(mockUrl, (req, res, ctx) => {
        attemptCount++;
        if (attemptCount < 3) {
          return res(ctx.status(500));
        }
        return res(
          ctx.status(200),
          ctx.json({ success: true, data: { success: true } })
        );
      })
    );

    const { result } = renderHook(() => 
      useApiData(mockUrl, { retryCount: 3 })
    );

    await waitFor(() => {
      expect(result.current.data).toEqual({ success: true });
    }, { timeout: 5000 });

    expect(attemptCount).toBe(3);
  });

  it('can be disabled', () => {
    const { result } = renderHook(() => 
      useApiData(mockUrl, { enabled: false })
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });
});
```

### Integration Testing
```typescript
// src/__tests__/integration/components/ContactForm/ContactForm.integration.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import ContactForm from '../../../components/organisms/ContactForm/ContactForm';

describe('ContactForm Integration', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    server.use(
      rest.post('/api/contacts', (req, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.json({
            success: true,
            data: { id: 1, name: 'John Doe', email: 'john@example.com' }
          })
        );
      })
    );
  });

  it('submits form successfully and shows success message', async () => {
    render(<ContactForm />);

    // Fill form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    // Submit form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Verify success
    await waitFor(() => {
      expect(screen.getByText(/form submitted successfully/i)).toBeInTheDocument();
    });

    // Verify form is reset
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });

  it('shows validation errors for empty fields', async () => {
    render(<ContactForm />);

    // Submit empty form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Verify validation errors
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    server.use(
      rest.post('/api/contacts', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ success: false, message: 'Server Error' })
        );
      })
    );

    render(<ContactForm />);

    // Fill and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Verify error handling
    await waitFor(() => {
      expect(screen.getByText(/server error occurred/i)).toBeInTheDocument();
    });
  });
});
```

### E2E Testing
```typescript
// src/__tests__/e2e/contact-journey.e2e.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form Journey', () => {
  test('complete contact submission workflow', async ({ page }) => {
    await page.goto('/');

    // Navigate to contact form
    await page.click('text=Contact Us');
    await expect(page).toHaveURL('/contact');

    // Fill form
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.fill('[data-testid="message-input"]', 'Test message');

    // Submit form
    await page.click('[data-testid="submit-button"]');

    // Verify success
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('text=Form submitted successfully')).toBeVisible();

    // Verify form reset
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue('');
    await expect(page.locator('[data-testid="email-input"]')).toHaveValue('');
    await expect(page.locator('[data-testid="message-input"]')).toHaveValue('');
  });

  test('handles validation errors', async ({ page }) => {
    await page.goto('/contact');

    // Submit empty form
    await page.click('[data-testid="submit-button"]');

    // Verify validation errors
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Message is required')).toBeVisible();
  });

  test('is accessible', async ({ page }) => {
    await page.goto('/contact');

    // Check keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="name-input"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="email-input"]')).toBeFocused();

    // Check ARIA labels
    const nameInput = page.locator('[data-testid="name-input"]');
    await expect(nameInput).toHaveAttribute('aria-label', 'Name');
  });
});
```

### Performance Testing
```typescript
// src/__tests__/performance/DataTable.performance.test.tsx
import { measurePerformance } from 'react-performance-testing';
import DataTable from '../../../components/organisms/DataTable/DataTable';

describe('DataTable Performance', () => {
  const largeDataSet = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
    email: `item${i}@example.com`,
  }));

  it('renders large dataset efficiently', async () => {
    const { performance } = await measurePerformance(
      () => (
        <DataTable
          data={largeDataSet}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
          ]}
        />
      )
    );

    expect(performance.render.duration).toBeLessThan(100); // < 100ms
    expect(performance.mount.duration).toBeLessThan(200); // < 200ms
  });

  it('handles search efficiently', async () => {
    const { performance } = await measurePerformance(
      () => (
        <DataTable
          data={largeDataSet}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
          ]}
          searchable
        />
      ),
      {
        interactions: [
          { type: 'change', target: '[data-testid="search-input"]', value: 'Item 1' },
        ],
      }
    );

    expect(performance.interactions[0].duration).toBeLessThan(50); // < 50ms
  });
});
```

## Production Test Execution

### Comprehensive Test Suite
```bash
cd contact-form-app/frontend

# Run all tests with coverage
npm test -- --watchAll=false --coverage

# Run specific test categories
npm test -- --testPathPattern=unit
npm test -- --testPathPattern=integration
npm test -- --testPathPattern=e2e

# Run with specific patterns
npm test -- --testNamePattern="Accessibility"
npm test -- --testNamePattern="Performance"
```

### Quality Gates
```bash
# Coverage requirements
npm test -- --coverage --watchAll=false --coverageThreshold='{"global":{"branches":80,"functions":80,"lines":80,"statements":80}}'

# Accessibility testing
npm run test:a11y

# Performance testing
npm run test:performance

# Visual regression testing
npm run test:visual

# E2E testing
npm run test:e2e
```

### CI/CD Integration
```bash
# Parallel test execution
npm test -- --maxWorkers=4 --watchAll=false

# JUnit XML for CI systems
npm test -- --watchAll=false --ci --reporters=default --reporters=jest-junit

# Test reports
npm test -- --watchAll=false --coverage --coverageReporters=text --coverageReporters=html
```

## Production Test Data Management

### Factory Pattern for Test Data
```typescript
// src/test-utils/factories/ContactFactory.ts
import { faker } from '@faker-js/faker';

export interface ContactData {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export class ContactFactory {
  static create(overrides: Partial<ContactData> = {}): ContactData {
    return {
      id: faker.datatype.number(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      message: faker.lorem.paragraph(),
      createdAt: faker.date.recent(),
      ...overrides,
    };
  }

  static createBatch(count: number): ContactData[] {
    return Array.from({ length: count }, () => this.create());
  }

  static createWithInvalidEmail(): ContactData {
    return this.create({ email: 'invalid-email' });
  }
}
```

### Mock Service Worker Setup
```typescript
// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { ContactFactory } from '../test-utils/factories/ContactFactory';

export const handlers = [
  // API handlers
  rest.get('/api/contacts', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: ContactFactory.createBatch(10),
      })
    );
  }),

  rest.post('/api/contacts', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: ContactFactory.create(),
      })
    );
  }),
];

export const server = setupServer(...handlers);
```

## Production Test Checklist

### Test Coverage Requirements
- [ ] Unit test coverage >80% for all components
- [ ] Integration test coverage >70% for component interactions
- [ ] All critical user paths tested with E2E tests
- [ ] Accessibility tests for all interactive components
- [ ] Performance tests for critical components
- [ ] Visual regression tests for UI components

### Test Quality Standards
- [ ] Tests follow AAA pattern (Arrange-Act-Assert)
- [ ] Test names are descriptive and clear
- [ ] Tests are independent and isolated
- [ ] Proper mocking of external dependencies
- [ ] Semantic queries used over test IDs
- [ ] User interactions tested with userEvent

### Accessibility Testing
- [ ] axe-core integration for automated testing
- [ ] Keyboard navigation testing
- [ ] Screen reader compatibility testing
- [ ] Color contrast verification
- [ ] ARIA attribute testing
- [ ] Focus management testing

### Performance Testing
- [ ] Component render performance measured
- [ ] Large dataset handling tested
- [ ] Memory leak prevention verified
- [ ] Bundle size impact measured
- [ ] Core Web Vitals testing
- [ ] Interaction performance testing

### E2E Testing
- [ ] Critical user journeys covered
- [ ] Cross-browser compatibility tested
- [ ] Mobile responsiveness verified
- [ ] Error handling scenarios tested
- [ ] Loading states tested
- [ ] Network conditions tested

## How to Invoke

```
Write comprehensive tests for [component] using the frontend-test skill
Run production test suite using the frontend-test skill
Create accessibility tests for [feature] using the frontend-test skill
Implement E2E tests for [user journey] using the frontend-test skill
```

## Related Skills

- **Analysis**: Use `frontend-analysis-plan` skill for test planning
- **Implementation**: Use `frontend-code` skill for production code
- **Review**: Use `frontend-review` skill for test quality review
