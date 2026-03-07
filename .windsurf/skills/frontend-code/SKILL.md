---
name: frontend-code
description: Production-ready frontend implementation skill with comprehensive architecture compliance
---

# Frontend Code Skill

Implement production-ready frontend code with comprehensive architecture compliance, performance optimization, accessibility, and quality assurance.

## When to Use
- Implementing new components for production systems
- Adding enterprise-grade features with scalability requirements
- Creating reusable component library elements
- After comprehensive analysis and planning stage
- When implementing design system components
- For performance-critical frontend implementations

## Production Concept

- **This skill**: Implementation + Lint + Security + Performance + Accessibility + Architecture Compliance
- **Quality Gates**: Code + Architecture + Performance + Accessibility + Security + Tests
- **Standards**: Comprehensive frontend architecture (`.windsurf/rules/frontend-development.md`)

## Production Implementation

See `.windsurf/rules/frontend-development.md` for comprehensive frontend architecture standards.

### Production Code Structure

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Pages | `src/pages/` | Route-level components and layouts |
| Organisms | `src/components/organisms/` | Complex UI components |
| Molecules | `src/components/molecules/` | Component compositions |
| Atoms | `src/components/atoms/` | Basic UI elements |
| Hooks | `src/hooks/` | Custom reusable logic |
| Utils | `src/utils/` | Pure utility functions |
| Services | `src/services/` | API and external service integration |
| Types | `src/types/` | TypeScript type definitions |

### Production Code Patterns

#### Atomic Design Component Pattern
```typescript
// src/components/atoms/Button/Button.tsx
import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className,
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => {
  const baseClasses = [
    styles.button,
    styles[variant],
    styles[size],
  ];

  const buttonClasses = cn(
    ...baseClasses,
    disabled && styles.disabled,
    loading && styles.loading,
    className
  );

  const handleClick = React.useCallback(() => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  }, [disabled, loading, onClick]);

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      data-testid={testId}
      aria-busy={loading}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
```

#### Custom Hook Pattern
```typescript
// src/hooks/useApiData.ts
import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, ApiError } from '../types/api';

interface UseApiDataOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  retryCount?: number;
  enabled?: boolean;
}

interface UseApiDataResult<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
  reset: () => void;
}

export function useApiData<T>(
  url: string,
  options: UseApiDataOptions<T> = {}
): UseApiDataResult<T> {
  const {
    initialData = null,
    onSuccess,
    onError,
    retryCount = 3,
    enabled = true,
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [retryAttempts, setRetryAttempts] = useState(0);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<T> = await response.json();
      
      if (result.success) {
        setData(result.data);
        onSuccess?.(result.data);
        setRetryAttempts(0);
      } else {
        throw new Error(result.message || 'API request failed');
      }
    } catch (err) {
      const apiError: ApiError = {
        message: err instanceof Error ? err.message : 'Unknown error',
        status: err instanceof Error ? 500 : 0,
      };
      
      setError(apiError);
      onError?.(apiError);
      
      // Retry logic
      if (retryAttempts < retryCount) {
        setRetryAttempts(prev => prev + 1);
        setTimeout(fetchData, 1000 * Math.pow(2, retryAttempts));
      }
    } finally {
      setLoading(false);
    }
  }, [url, enabled, onSuccess, onError, retryAttempts, retryCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(async () => {
    setRetryAttempts(0);
    await fetchData();
  }, [fetchData]);

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setLoading(false);
    setRetryAttempts(0);
  }, [initialData]);

  return { data, loading, error, refetch, reset };
}
```

#### Performance-Optimized Component Pattern
```typescript
// src/components/organisms/DataTable/DataTable.tsx
import React, { useMemo, useCallback, memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useVirtualizedData } from '../../../hooks/useVirtualizedData';
import { Button } from '../../atoms/Button';
import { SearchInput } from '../../molecules/SearchInput';
import styles from './DataTable.module.css';

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  pageSize?: number;
  className?: string;
}

const DataTable = memo(<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  searchable = true,
  sortable = true,
  pageSize = 50,
  className,
}: DataTableProps<T>) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Memoized filtered and sorted data
  const processedData = useMemo(() => {
    let filtered = data;

    // Filter data
    if (searchTerm) {
      filtered = data.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort data
    if (sortConfig) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig]);

  // Virtualization for large datasets
  const { virtualizedData, totalHeight } = useVirtualizedData(
    processedData,
    pageSize
  );

  // Event handlers
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleSort = useCallback((key: keyof T) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  }, []);

  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = virtualizedData[index];
    
    return (
      <div style={style} className={styles.row}>
        {columns.map(column => (
          <div key={String(column.key)} className={styles.cell}>
            {column.render 
              ? column.render(item[column.key], item)
              : String(item[column.key])
            }
          </div>
        ))}
      </div>
    );
  }, [virtualizedData, columns]);

  if (loading) {
    return <div className={styles.loading} aria-live="polite">Loading data...</div>;
  }

  return (
    <div className={cn(styles.dataTable, className)}>
      {searchable && (
        <div className={styles.header}>
          <SearchInput
            onSearch={handleSearch}
            placeholder="Search data..."
            aria-label="Search table data"
          />
        </div>
      )}
      
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          {columns.map(column => (
            <Button
              key={String(column.key)}
              variant="secondary"
              size="sm"
              onClick={() => sortable && handleSort(column.key)}
              disabled={!sortable}
              className={cn(
                styles.headerCell,
                sortConfig?.key === column.key && styles.sorted
              )}
              aria-label={`Sort by ${column.label}`}
            >
              {column.label}
              {sortConfig?.key === column.key && (
                <span className={styles.sortIndicator}>
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </Button>
          ))}
        </div>
        
        <List
          height={400}
          itemCount={virtualizedData.length}
          itemSize={50}
          itemData={virtualizedData}
          className={styles.virtualizedList}
        >
          {Row}
        </List>
      </div>
      
      <div className={styles.footer}>
        Showing {virtualizedData.length} of {data.length} items
      </div>
    </div>
  );
}) as <T extends Record<string, any>>(props: DataTableProps<T>) => JSX.Element;

DataTable.displayName = 'DataTable';

export default DataTable;
```

## Production Quality Checks

### Code Quality & Type Safety
```bash
cd contact-form-app/frontend

# Strict TypeScript checking
npm run type-check

# Lint with comprehensive rules
npm run lint

# Code formatting
npm run format

# Import organization
npm run check-imports
```

### Performance Analysis
```bash
# Bundle analysis
npm run analyze

# Performance budgets
npm run test:performance

# Core Web Vitals measurement
npm run test:lighthouse

# Bundle size monitoring
npm run build:analyze
```

### Accessibility Testing
```bash
# Automated accessibility testing
npm run test:a11y

# Manual accessibility checklist
npm run test:a11y:manual

# Color contrast verification
npm run test:contrast

# Keyboard navigation testing
npm run test:keyboard
```

### Security Validation
```bash
# Dependency vulnerability scanning
npm audit

# Code security analysis
snyk code test --severity-threshold=medium

# Content Security Policy testing
npm run test:csp

# XSS prevention testing
npm run test:xss
```

## Production Commands

### Development Environment
```bash
cd contact-form-app/frontend

# Development with hot reload
npm start

# Development with Storybook
npm run storybook

# Type checking in watch mode
npm run type-check:watch
```

### Production Build
```bash
# Optimized production build
npm run build

# Build with bundle analysis
npm run build:analyze

# Build with performance budgets
npm run build:performance

# Build for different environments
npm run build:production
npm run build:staging
```

### Testing Commands
```bash
# Unit and integration tests
npm test -- --watchAll=false --coverage

# E2E tests
npm run test:e2e

# Visual regression tests
npm run test:visual

# Accessibility tests
npm run test:a11y

# Performance tests
npm run test:performance
```

## Production Checklist

### Code Quality & Architecture
- [ ] Component follows Atomic Design principles
- [ ] TypeScript strict typing implemented throughout
- [ ] React best practices and patterns followed
- [ ] Custom hooks properly extracted and reusable
- [ ] Code organization follows established patterns
- [ ] Import/export structure consistent
- [ ] Error boundaries implemented appropriately

### Performance Optimization
- [ ] Components properly memoized (React.memo, useMemo, useCallback)
- [ ] Code splitting implemented for large components
- [ ] Images optimized with appropriate formats
- [ ] Bundle size within performance budgets
- [ ] Virtualization for large lists implemented
- [ ] Lazy loading for heavy components
- [ ] Core Web Vitals targets met

### Accessibility Compliance (WCAG 2.1 AA)
- [ ] Semantic HTML structure implemented
- [ ] ARIA roles and properties correctly used
- [ ] Keyboard navigation fully functional
- [ ] Screen reader compatibility verified
- [ ] Color contrast ratios meet standards
- [ ] Focus management implemented
- [ ] Skip links and landmarks provided

### Security Implementation
- [ ] XSS prevention measures in place
- [ ] Content Security Policy headers configured
- [ ] Input validation and sanitization implemented
- [ ] Sensitive data not exposed in client-side code
- [ ] Third-party dependencies vetted and secure
- [ ] Authentication tokens properly handled
- [ ] CSRF protection implemented

### Testing Coverage
- [ ] Unit tests for all components (>80% coverage)
- [ ] Integration tests for component interactions
- [ ] E2E tests for critical user journeys
- [ ] Accessibility tests with axe-core
- [ ] Performance tests and benchmarks
- [ ] Visual regression tests implemented
- [ ] Error boundary testing completed

### Production Readiness
- [ ] Environment configuration management
- [ ] Error tracking and monitoring configured
- [ ] Performance monitoring implemented
- [ ] Documentation complete and up-to-date
- [ ] Storybook documentation comprehensive
- [ ] Build optimization completed
- [ ] Deployment pipeline tested

## Related Standards

See `.windsurf/rules/frontend-development.md` for:
- Comprehensive React and TypeScript standards
- Atomic Design and component architecture
- Performance optimization techniques
- Accessibility implementation guidelines
- Security best practices
- Testing strategies and requirements

## How to Invoke

```
Implement [feature] for production deployment using the frontend-code skill
```

## Related Skills

- **Analysis**: Use `frontend-analysis-plan` skill for comprehensive planning
- **Testing**: Use `frontend-test` skill for production-grade testing
- **Review**: Use `frontend-review` skill for production readiness review
