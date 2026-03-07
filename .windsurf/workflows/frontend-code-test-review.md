---
name: frontend-code-test-review
description: Production-ready CI-style pipeline for frontend analyze → implement → test → review with comprehensive architecture compliance
---

# Frontend Code-Test-Review Pipeline

## Concept

- **Rules** → Enhanced Standards (`.windsurf/rules/frontend-development.md`)
- **Skills** → Implementation + Lint + Security Scan + Full Architecture Review
- **Quality Gates** → Code + Architecture + Performance + Accessibility + Security + Tests

## Pipeline

```
┌──────────┐  ┌───────────┐  ┌─────────┐  ┌──────────┐
│ ANALYZE │─▶│ IMPLEMENT │─▶│  TEST   │─▶│  REVIEW  │
│  Plan   │  │Code+Lint│ │ Verify │  │Quality+  │
│Full Arch│  │+Security│ │+Full Arch│ │Comprehensive│
└──────────┘  └───────────┘  └─────────┘  └──────────┘
```

## Prerequisites

See `.windsurf/rules/frontend-development.md` for comprehensive frontend architecture standards including React patterns, TypeScript, accessibility, performance, and security guidelines.

---

## Stage 1: Analyze & Plan

**Skill:** `frontend-analysis-plan`

### Analysis Checklist
- [ ] Requirements clearly defined with user stories
- [ ] Component architecture planned (Atomic Design)
- [ ] TypeScript interfaces and types designed
- [ ] State management strategy selected
- [ ] Accessibility requirements identified
- [ ] Performance considerations analyzed
- [ ] Security requirements assessed
- [ ] Responsive design requirements specified
- [ ] Internationalization needs evaluated
- [ ] Browser compatibility requirements defined

### Gate: Plan written with comprehensive frontend architecture considerations

---

## Stage 2: Implement

**Skill:** `frontend-code`

Includes: Code + Lint + Security Scan + Full Architecture Compliance

### Commands
```bash
cd contact-form-app/frontend

# Run app
npm start

# Run lint
npm run lint

# Run type checking
npm run type-check

# Run security scan
snyk code test --severity-threshold=medium
npm audit

# Run accessibility audit
npm run test:a11y

# Run performance analysis
npm run analyze
```

### Implementation Checks
- [ ] Component follows Atomic Design principles
- [ ] TypeScript strict typing implemented
- [ ] React best practices followed
- [ ] Accessibility features implemented
- [ ] Performance optimizations applied
- [ ] Security measures implemented
- [ ] Error boundaries and error handling
- [ ] Responsive design implemented
- [ ] Internationalization support if needed
- [ ] Browser compatibility ensured

### Gate: Code + Lint + Security + Full Architecture pass

---

## Stage 3: Test

**Skill:** `frontend-test`

### Commands
```bash
# Unit and integration tests
npm test -- --watchAll=false --coverage

# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:a11y

# Performance tests
npm run test:performance

# Visual regression tests
npm run test:visual
```

### Testing Requirements
- [ ] Unit tests for all components (>80% coverage)
- [ ] Integration tests for component interactions
- [ ] E2E tests for critical user journeys
- [ ] Accessibility tests (axe-core integration)
- [ ] Performance tests (Core Web Vitals)
- [ ] Visual regression tests
- [ ] Cross-browser compatibility tests
- [ ] Mobile responsiveness tests
- [ ] Error boundary testing
- [ ] Loading state testing

### Gate: All tests pass + Coverage + Performance + Accessibility

---

## Stage 4: Review

**Skill:** `frontend-review`

### Review Checklist
- [ ] Component architecture compliance
- [ ] TypeScript quality and typing
- [ ] React patterns and best practices
- [ ] Accessibility (WCAG 2.1 AA compliance)
- [ ] Performance optimization
- [ ] Security implementation
- [ ] Code quality and maintainability
- [ ] Testing coverage and quality
- [ ] Documentation completeness
- [ ] Production readiness

### Gate: Code and architecture reviewed and approved

---

## Usage & Reference

### Invoke Pipeline
```bash
# Full pipeline
Use the frontend-code-test-review pipeline to implement [feature] with comprehensive architecture compliance

# By stage
Analyze using frontend-analysis-plan skill (include full frontend architecture design)
Implement using frontend-code skill (follow comprehensive standards)
Test using frontend-test skill (verify complete architecture)
Review using frontend-review skill (check full compliance)
```

### Stage Reference

| Stage | Skill | Gate | Focus |
|-------|-------|------|-------|
| 1. Analyze | frontend-analysis-plan | Plan written | Requirements + Full Architecture Design |
| 2. Implement | frontend-code | Code+Lint+Security pass | Implementation + Complete Compliance |
| 3. Test | frontend-test | Tests pass + Coverage | Verification + Comprehensive Testing |
| 4. Review | frontend-review | Approved | Code Quality + Full Architecture Review |

---

## Enhanced Features

### Quality Gates
- **Code Quality**: ESLint, Prettier, TypeScript strict mode
- **Architecture Quality**: Atomic Design, React patterns, TypeScript
- **Accessibility**: WCAG 2.1 AA compliance, axe-core testing
- **Performance**: Core Web Vitals, bundle analysis, optimization
- **Security**: XSS prevention, CSP headers, dependency scanning
- **Testing**: Unit, integration, E2E, visual regression

### Production Readiness
- **Bundle Optimization**: Code splitting, tree shaking, compression
- **Performance Monitoring**: Core Web Vitals tracking
- **Accessibility Testing**: Automated and manual testing
- **Security Scanning**: Dependency vulnerability scanning
- **Cross-browser Testing**: Multiple browser compatibility
- **Mobile Testing**: Responsive design verification

### Development Experience
- **Hot Reload**: Development server with hot module replacement
- **Type Safety**: Strict TypeScript with comprehensive typing
- **Code Quality**: Automated linting and formatting
- **Testing**: Comprehensive test suite with coverage
- **Documentation**: Component documentation and Storybook

---

## Verification

- [ ] Plan documented with comprehensive frontend architecture design
- [ ] Implementation complete with full compliance
- [ ] Tests pass with coverage and comprehensive testing
- [ ] Code and architecture fully reviewed
- [ ] Performance benchmarks met
- [ ] Accessibility compliance verified
- [ ] Security measures implemented
- [ ] Production deployment ready
- [ ] Documentation complete
- [ ] All quality gates passed
- [ ] ✅ Ready for production

---

## Related Skills

- **Analysis**: Use `frontend-analysis-plan` skill for comprehensive planning
- **Implementation**: Use `frontend-code` skill for production-grade development
- **Testing**: Use `frontend-test` skill for comprehensive testing
- **Review**: Use `frontend-review` skill for production readiness review
