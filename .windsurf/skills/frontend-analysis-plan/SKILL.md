---
name: frontend-analysis-plan
description: Production-ready analysis and planning skill for comprehensive frontend architecture
---

# Frontend Analysis Plan Skill

This skill guides through comprehensive requirement analysis and architectural planning for production frontend systems.

## When to Use
- Before starting any new feature or component
- When requirements are unclear or complex
- Before major refactoring or architecture changes
- When designing scalable frontend systems
- For enterprise application planning
- When implementing design systems or component libraries

## Production Analysis Process

### Step 1: Understand Business Requirements
1. **User Stories & Acceptance Criteria**
   - Read and understand user stories and requirements
   - Identify the core user journey and expected outcomes
   - Define success criteria and measurable KPIs
   - Note any business constraints or SLAs

2. **User Experience Requirements**
   - Identify target user personas and use cases
   - Define accessibility requirements (WCAG compliance)
   - Consider internationalization and localization needs
   - Plan responsive design requirements

3. **Performance Requirements**
   - Define Core Web Vitals targets (LCP, FID, CLS)
   - Identify load time requirements
   - Consider bundle size constraints
   - Plan for mobile performance optimization

### Step 2: Analyze Technical Context
1. **Existing Architecture Review**
   - Find relevant files in `contact-form-app/frontend/src/`
   - Understand current component structure and patterns
   - Identify affected components and dependencies
   - Review state management implementation

2. **Design System Integration**
   - Review existing design tokens and theme system
   - Identify reusable components and patterns
   - Plan component composition strategies
   - Consider styling architecture (CSS Modules, CSS-in-JS)

3. **Integration Points**
   - Identify API integration requirements
   - Plan state management strategies
   - Consider external service dependencies
   - Review routing and navigation patterns

### Step 3: Design Production Solution
1. **Component Architecture**
   - Apply Atomic Design principles (Atoms, Molecules, Organisms)
   - Plan component composition and reusability
   - Design component interfaces and contracts
   - Consider component lifecycle and state management

2. **TypeScript Architecture**
   - Design comprehensive type interfaces
   - Plan generic components and utilities
   - Define type-safe API contracts
   - Consider type inheritance and composition

3. **State Management Design**
   - Choose appropriate state management patterns
   - Plan local vs global state distribution
   - Design data flow and prop drilling solutions
   - Consider server state management (React Query)

4. **Performance Architecture**
   - Plan code splitting strategies
   - Design lazy loading implementation
   - Consider bundle optimization techniques
   - Plan image and asset optimization

5. **Accessibility Architecture**
   - Design semantic HTML structure
   - Plan ARIA implementation strategy
   - Consider keyboard navigation flow
   - Design screen reader compatibility

### Step 4: Production Planning
1. **Testing Strategy**
   - Unit tests for components and hooks (>80% coverage)
   - Integration tests for component interactions
   - E2E tests for critical user journeys
   - Accessibility testing with axe-core
   - Visual regression testing strategy

2. **Development Workflow**
   - Plan component development approach
   - Design Storybook documentation strategy
   - Plan code review and quality gates
   - Consider CI/CD integration requirements

3. **Deployment Strategy**
   - Plan build optimization and bundling
   - Consider environment-specific configurations
   - Design performance monitoring strategy
   - Plan error tracking and analytics

## Production Questions to Answer

Before implementing, clarify:
- **User Impact**: What is the user value and experience improvement?
- **Accessibility**: What WCAG compliance level is required?
- **Performance**: What are the Core Web Vitals targets?
- **Browser Support**: Which browsers and versions need support?
- **Mobile Requirements**: What mobile experience is expected?
- **Internationalization**: Are multiple languages required?
- **Design System**: How does this integrate with existing design system?
- **Testing Strategy**: What testing approach ensures quality?

## Production Implementation Plan Template

```
## Implementation Plan for [Feature]

### Business Requirements
- User Stories: [user story descriptions]
- Success Criteria: [measurable outcomes]
- KPIs: [key performance indicators]
- Accessibility Requirements: [WCAG compliance level]

### Technical Architecture
- Component Design: [Atomic Design structure]
- TypeScript Interfaces: [type definitions]
- State Management: [local/global/server state strategy]
- API Integration: [data fetching and caching]

### Performance Strategy
- Bundle Optimization: [code splitting, lazy loading]
- Image Optimization: [formats, lazy loading]
- Core Web Vitals: [target metrics]
- Monitoring: [performance tracking]

### Accessibility Implementation
- Semantic HTML: [structure and landmarks]
- ARIA Implementation: [roles, states, labels]
- Keyboard Navigation: [flow and shortcuts]
- Testing Strategy: [automated and manual testing]

### Testing Strategy
- Unit Tests: [component and hook testing]
- Integration Tests: [component interactions]
- E2E Tests: [critical user journeys]
- Accessibility Tests: [axe-core integration]
- Visual Tests: [regression testing]

### Development Workflow
- Component Development: [development approach]
- Storybook Documentation: [documentation strategy]
- Code Review: [review checklist]
- Quality Gates: [automated checks]

### Deployment & Operations
- Build Configuration: [optimization settings]
- Environment Setup: [configuration management]
- Performance Monitoring: [metrics and alerts]
- Error Tracking: [logging and analytics]

### Risk Assessment
- Technical Risks: [complexity, dependencies]
- Performance Risks: [bundle size, load time]
- Accessibility Risks: [compliance gaps]
- Mitigation Strategies: [risk reduction plans]

### Resource Requirements
- Development Effort: [story points, timeline]
- Design Resources: [UI/UX requirements]
- Testing Resources: [QA requirements]
- Browser Testing: [compatibility testing]
```

## Production Checklist

### Requirements Analysis
- [ ] Business requirements clearly defined
- [ ] User stories and acceptance criteria documented
- [ ] Accessibility requirements identified
- [ ] Performance requirements specified
- [ ] Success criteria and KPIs established

### Technical Design
- [ ] Component architecture planned (Atomic Design)
- [ ] TypeScript interfaces designed
- [ ] State management strategy selected
- [ ] Performance optimization planned
- [ ] Accessibility architecture designed

### Production Readiness
- [ ] Testing strategy comprehensive
- [ ] Development workflow defined
- [ ] Quality gates established
- [ ] Documentation strategy planned
- [ ] Deployment strategy designed

### Quality Assurance
- [ ] Code quality standards defined
- [ ] Performance benchmarks established
- [ ] Accessibility compliance planned
- [ ] Security considerations addressed
- [ ] Browser compatibility verified

## How to Invoke

```
Analyze and plan [feature/fix description] for production deployment using the frontend-analysis-plan skill
```

## Related Skills

- **Implementation**: Use `frontend-code` skill for production-grade development
- **Testing**: Use `frontend-test` skill for comprehensive testing
- **Review**: Use `frontend-review` skill for production readiness review
