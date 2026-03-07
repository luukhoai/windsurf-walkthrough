---
name: frontend-review
description: Production-ready comprehensive code review skill for enterprise React TypeScript frontend systems
---

# Frontend Review Skill

This skill guides through comprehensive code review for production frontend systems, ensuring enterprise-grade quality, accessibility, performance, and architectural compliance.

## When to Use
- Before merging pull requests to production branches
- When reviewing critical frontend implementations
- During architecture compliance audits
- For accessibility compliance assessments
- When evaluating performance and scalability implementations
- During production readiness reviews
- For security vulnerability assessments

## Production Review Framework

### Review Categories
1. **Business Logic & Requirements** - Feature correctness and user experience
2. **Architecture & Design** - Component architecture and React patterns
3. **Code Quality & TypeScript** - Code standards and type safety
4. **Accessibility Compliance** - WCAG 2.1 AA standards implementation
5. **Performance & Optimization** - Core Web Vitals and bundle optimization
6. **Security Implementation** - XSS prevention and data protection
7. **Testing Coverage** - Test quality and coverage requirements
8. **UI/UX Implementation** - User interface and experience quality
9. **Production Readiness** - Deployment and operational considerations

## Comprehensive Review Checklist

### 1. Business Logic & Requirements
- [ ] **Functional Requirements**: Does the code meet all specified business requirements?
- [ ] **User Experience**: Is the user flow intuitive and user-friendly?
- [ ] **Edge Cases**: Are all edge cases and boundary conditions handled?
- [ ] **Error Scenarios**: Are error paths properly implemented and user-friendly?
- [ ] **Loading States**: Are loading states properly implemented?
- [ ] **Success Feedback**: Is appropriate feedback provided to users?

### 2. Architecture & Design
- [ ] **Atomic Design**: Does component follow Atomic Design principles?
- [ ] **Component Composition**: Are components properly composed and reusable?
- [ ] **Single Responsibility**: Do components have single, clear responsibilities?
- [ ] **Props Interface**: Are props well-defined and properly typed?
- [ ] **State Management**: Is appropriate state management pattern used?
- [ ] **Custom Hooks**: Is reusable logic extracted into custom hooks?
- [ ] **Component Separation**: Are concerns properly separated (logic vs presentation)?

### 3. Code Quality & TypeScript
- [ ] **Type Safety**: Are proper TypeScript types used (no `any`)?
- [ ] **Interface Design**: Are interfaces well-designed and reusable?
- [ ] **Generic Types**: Are generics used appropriately for reusable components?
- [ ] **Code Organization**: Is code properly organized and structured?
- [ ] **Naming Conventions**: Are variables, functions, and components descriptively named?
- [ ] **Code Duplication**: Is code duplication minimized through proper abstraction?
- [ ] **Import/Export**: Are imports and exports properly organized?

### 4. Accessibility Compliance (WCAG 2.1 AA)
- [ ] **Semantic HTML**: Are semantic HTML elements used appropriately?
- [ ] **ARIA Implementation**: Are ARIA roles, states, and properties correctly used?
- [ ] **Keyboard Navigation**: Is full keyboard navigation supported?
- [ ] **Focus Management**: Is focus properly managed and trapped in modals?
- [ ] **Screen Reader Support**: Are screen readers properly supported?
- [ ] **Color Contrast**: Do color combinations meet WCAG contrast ratios?
- [ ] **Form Labels**: Are form inputs properly labeled and associated?
- [ ] **Alternative Text**: Are images and non-text content properly described?

### 5. Performance & Optimization
- [ ] **React.memo Usage**: Are components properly memoized to prevent unnecessary re-renders?
- [ ] **useMemo/useCallback**: Are expensive operations memoized appropriately?
- [ ] **Bundle Size**: Will the implementation impact bundle size significantly?
- [ ] **Code Splitting**: Is code splitting implemented for large components?
- [ ] **Image Optimization**: Are images optimized (WebP, lazy loading)?
- [ ] **Virtualization**: Is virtualization used for large lists?
- [ ] **Core Web Vitals**: Will implementation meet Core Web Vitals targets?
- [ ] **Memory Management**: Are potential memory leaks addressed?

### 6. Security Implementation
- [ ] **XSS Prevention**: Are outputs properly escaped and sanitized?
- [ ] **Input Validation**: Are all user inputs validated and sanitized?
- [ ] **CSRF Protection**: Are CSRF tokens implemented for forms?
- [ ] **Content Security Policy**: Is CSP compliance maintained?
- [ ] **Sensitive Data**: Is sensitive data properly handled and not exposed?
- [ ] **API Security**: Are API calls secured (authentication, authorization)?
- [ ] **Third-party Dependencies**: Are third-party libraries vetted for security?
- [ ] **Environment Variables**: Are sensitive values properly managed?

### 7. Testing Coverage
- [ ] **Unit Tests**: Are all components and hooks thoroughly tested (>80% coverage)?
- [ ] **Integration Tests**: Are component interactions properly tested?
- [ ] **Accessibility Tests**: Are accessibility features tested with axe-core?
- [ ] **User Interaction Tests**: Are user interactions properly tested?
- [ ] **Error Testing**: Are error scenarios and edge cases tested?
- [ ] **Performance Tests**: Are performance characteristics tested?
- [ ] **Visual Tests**: Are visual regression tests implemented?
- [ ] **Test Quality**: Are tests well-structured and maintainable?

### 8. UI/UX Implementation
- [ ] **Design System**: Does implementation follow design system guidelines?
- [ ] **Responsive Design**: Is responsive design properly implemented?
- [ ] **Loading States**: Are loading states visually clear and informative?
- [ ] **Error States**: Are error states user-friendly and actionable?
- [ ] **Micro-interactions**: Are appropriate micro-interactions implemented?
- [ ] **Visual Hierarchy**: Is visual hierarchy clear and intuitive?
- [ ] **Consistency**: Is implementation consistent with existing patterns?
- [ ] **Browser Compatibility**: Is cross-browser compatibility ensured?

### 9. Production Readiness
- [ ] **Environment Configuration**: Are environment variables properly managed?
- [ ] **Error Tracking**: Is error tracking and monitoring implemented?
- [ ] **Performance Monitoring**: Are performance metrics and monitoring configured?
- [ ] **Documentation**: Is component documentation complete (Storybook)?
- [ ] **Bundle Analysis**: Has bundle impact been analyzed and optimized?
- [ ] **Deployment Strategy**: Is deployment strategy properly planned?
- [ ] **Monitoring**: Are appropriate monitoring and alerting configured?
- [ ] **Fallbacks**: Are appropriate fallbacks implemented?

## Frontend-Specific Technical Review

### React Component Review
- [ ] **Functional Components**: Are functional components with hooks used exclusively?
- [ ] **Hook Rules**: Are React hooks rules properly followed?
- [ ] **Dependency Arrays**: Are useEffect dependency arrays correct?
- [ ] **State Updates**: Are state updates properly handled?
- [ ] **Prop Drilling**: Is excessive prop drilling avoided?
- [ ] **Component Lifecycle**: Is component lifecycle properly managed?

### TypeScript Review
- [ ] **Strict Mode**: Is TypeScript strict mode compliance maintained?
- [ ] **Type Definitions**: Are type definitions comprehensive and accurate?
- [ ] **Generic Components**: Are generic components properly typed?
- [ ] **Utility Types**: Are TypeScript utility types used effectively?
- [ ] **Type Inference**: Is type inference leveraged appropriately?
- [ ] **Interface vs Type**: Are interfaces used appropriately for object shapes?

### Styling Review
- [ ] **CSS Architecture**: Is CSS architecture consistent and maintainable?
- [ ] **CSS Modules**: Are CSS modules used for scoped styling?
- [ ] **Design Tokens**: Are design tokens used consistently?
- [ ] **Responsive Design**: Are media queries properly implemented?
- [ ] **CSS Performance**: Are CSS performance considerations addressed?
- [ ] **Theme System**: Is theme system properly implemented?

### State Management Review
- [ ] **Local State**: Is useState used appropriately for local state?
- [ ] **Global State**: Is Context API used appropriately for global state?
- [ ] **Server State**: Is React Query or similar used for server state?
- [ ] **Form State**: Is form state properly managed?
- [ ] **State Updates**: Are state updates immutable and predictable?
- [ ] **Performance**: Is state management optimized for performance?

## Accessibility Review Checklist

### Semantic HTML & ARIA
- [ ] **Landmarks**: Are proper HTML landmarks (header, nav, main, footer) used?
- [ ] **Headings**: Is heading structure logical (h1-h6 hierarchy)?
- [ ] **Lists**: Are lists properly structured and marked up?
- [ ] **Tables**: Are data tables properly marked up with headers?
- [ ] **Forms**: Are forms properly structured with labels and fieldsets?

### Keyboard Navigation
- [ ] **Tab Order**: Is tab navigation logical and complete?
- [ ] **Focus Indicators**: Are focus indicators visible and clear?
- [ ] **Skip Links**: Are skip links provided for main content?
- [ ] **Keyboard Traps**: Is focus properly trapped in modals?
- [ ] **Shortcuts**: Are keyboard shortcuts implemented where appropriate?

### Screen Reader Support
- [ ] **Alternative Text**: Are images and non-text content properly described?
- [ ] **ARIA Labels**: Are ARIA labels used appropriately for custom elements?
- [ ] **Live Regions**: Are ARIA live regions used for dynamic content?
- [ ] **Role Descriptions**: Are role descriptions provided for complex components?
- [ ] **State Announcements**: Are state changes properly announced?

## Performance Review Checklist

### Rendering Performance
- [ ] **Unnecessary Re-renders**: Are unnecessary re-renders prevented?
- [ ] **Component Memoization**: Are expensive components memoized?
- [ ] **List Virtualization**: Is virtualization used for large lists?
- [ ] **Image Optimization**: Are images optimized and lazy-loaded?
- [ ] **Bundle Splitting**: Is code splitting implemented effectively?

### Core Web Vitals
- [ ] **Largest Contentful Paint (LCP)**: Is LCP under 2.5 seconds?
- [ ] **First Input Delay (FID)**: Is FID under 100 milliseconds?
- [ ] **Cumulative Layout Shift (CLS)**: Is CLS under 0.1?
- [ ] **Time to Interactive (TTI)**: Is TTI reasonable for the complexity?
- [ ] **First Contentful Paint (FCP)**: Is FCP under 1.8 seconds?

### Bundle Optimization
- [ ] **Tree Shaking**: Is unused code properly eliminated?
- [ ] **Minification**: Are assets properly minified?
- [ ] **Compression**: Is gzip/brotli compression enabled?
- [ ] **Asset Optimization**: Are assets (images, fonts) optimized?
- [ ] **Dependency Analysis**: Are large dependencies identified and optimized?

## Security Review Checklist

### Input Validation & XSS Prevention
- [ ] **Input Sanitization**: Are all user inputs properly sanitized?
- [ ] **Output Escaping**: Are outputs properly escaped?
- [ ] **Content Security Policy**: Is CSP properly configured?
- [ ] **Safe HTML Rendering**: Is safe HTML rendering implemented?
- [ ] **URL Validation**: Are URLs properly validated and sanitized?

### Data Protection
- [ ] **Sensitive Data**: Is sensitive data not exposed in client-side code?
- [ ] **Local Storage**: Is sensitive data not stored in localStorage?
- [ ] **API Keys**: Are API keys properly secured?
- [ ] **Authentication Tokens**: Are tokens properly handled and secured?
- [ ] **Data Transmission**: Is data transmission secure (HTTPS)?

## Production Review Process

### Review Preparation
1. **Code Analysis**: Run automated analysis tools (ESLint, TypeScript compiler)
2. **Test Results**: Review test coverage and results
3. **Bundle Analysis**: Review bundle size and composition
4. **Performance Metrics**: Review Core Web Vitals and performance benchmarks
5. **Accessibility Audit**: Review automated accessibility test results

### Review Execution
1. **Code Walkthrough**: Systematic code review with focus on production concerns
2. **Architecture Review**: Validate component architecture and React patterns
3. **Accessibility Review**: Comprehensive accessibility compliance assessment
4. **Performance Review**: Performance optimization and Core Web Vitals assessment
5. **Security Review**: Security vulnerability and data protection assessment

### Review Output
1. **Findings Report**: Detailed findings with severity levels and specific line references
2. **Action Items**: Specific actionable recommendations with priority
3. **Approval Decision**: Go/No-Go decision with comprehensive rationale
4. **Follow-up Plan**: Plan for addressing identified issues

## Review Severity Levels

### Critical (Blocker)
- Accessibility violations that prevent users with disabilities from using the feature
- Security vulnerabilities that could be exploited
- Performance issues that significantly impact user experience
- Non-compliance with legal requirements (GDPR, accessibility laws)

### High (Must Fix)
- Architecture violations that impact maintainability
- Significant performance degradation
- Accessibility compliance gaps (WCAG violations)
- Security best practice violations
- Insufficient test coverage

### Medium (Should Fix)
- Code quality issues that impact readability
- Minor performance optimizations
- Documentation gaps
- Style guide violations

### Low (Nice to Fix)
- Minor code improvements
- Enhanced error messages
- Additional logging
- Code optimization opportunities

## Related Standards

See `.windsurf/rules/frontend-development.md` for comprehensive frontend architecture standards including:
- React and TypeScript best practices
- Atomic Design and component architecture
- Accessibility implementation guidelines
- Performance optimization techniques
- Security best practices
- Testing strategies and requirements

## How to Invoke

```
Review the frontend code for production readiness using the frontend-review skill
Conduct comprehensive architecture review using the frontend-review skill
Perform accessibility assessment of [feature] using the frontend-review skill
Evaluate performance and scalability of [implementation] using the frontend-review skill
```

## Related Skills

- **Analysis**: Use `frontend-analysis-plan` skill for pre-implementation review
- **Implementation**: Use `frontend-code` skill for production-grade development
- **Testing**: Use `frontend-test` skill for comprehensive testing review
