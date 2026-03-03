---
name: Frontend Code-Review-Test Pipeline
description: Professional CI-style pipeline for frontend: analyze → code → lint → scan → review → test
---

# Frontend Code-Review-Test Pipeline

A professional workflow combining analysis, code implementation, linting, security scan, review, and testing for frontend development.

## Pipeline Overview

```
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ ANALYZE │─▶│  CODE   │─▶│  LINT   │─▶│  SCAN   │─▶│ REVIEW  │─▶│  TEST   │
│  Plan   │  │Implement│  │  Style  │  │Security │  │Quality │  │  Verify │
└─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘
                 ▲              ▲              ▲              ▲              ▲
                 │              │              │              │              │
                 └──────────────┴──────────────┴──────────────┴──────────────┘
                        (nếu fail → quay lại stage trước để fix)
```

## Gate Logic

Mỗi stage là một **gate**:
- **PASS** → tiến sang stage tiếp theo
- **FAIL** → quay lại stage trước để fix, sau đó chạy lại từ stage đó

```
Stage n FAIL → Fix tại Stage n-1 → Chạy lại từ Stage n-1
```

---

## Stage 1: Analyze & Plan

### Using frontend-analysis-plan skill
1. Understand requirements fully
2. Explore existing code
3. Design solution
4. Document implementation plan

### Analysis Checklist
- [ ] Requirements fully understood
- [ ] Existing code explored
- [ ] Solution designed
- [ ] Edge cases identified
- [ ] Implementation plan documented

### Gate Criteria
- [ ] Requirements rõ ràng, không mơ hồ
- [ ] Implementation plan đã viết

### If FAIL → Exit pipeline (không thể code nếu không hiểu requirement)

---

## Stage 2: Code Implementation

### Using frontend-code skill
1. Implement feature/fix in React components
2. Follow coding standards from frontend-code skill
3. Add proper TypeScript types
4. Handle edge cases

### Implementation Checklist
- [ ] Feature implemented according to requirements
- [ ] Code follows project conventions
- [ ] TypeScript types defined
- [ ] State management implemented
- [ ] Error handling in place

### Gate Criteria
- [ ] Code compile được (no TypeScript errors)
- [ ] Components render without errors

### If FAIL → Fix code → Rerun Stage 2

---

## Stage 3: Lint

### Using frontend-lint skill
1. Run ESLint on modified files
2. Fix all linting errors
3. Run Prettier formatter (optional)
4. Fix all warnings (optional)

### Lint Commands
```bash
cd contact-form-app/frontend
npm run lint
```

### Lint Checklist
- [ ] ESLint passes with no errors
- [ ] No TypeScript errors
- [ ] Code formatting applied
- [ ] No `any` types used

### Gate Criteria
- [ ] `npm run lint` pass, không có error

### If FAIL → Fix code (Stage 2) → Rerun Stage 3

---

## Stage 4: Security Scan

### Using frontend-security-scan skill
1. Run Snyk code scan
2. Run npm audit
3. Check for vulnerabilities
4. Fix any security issues found

### Scan Commands
```bash
cd contact-form-app/frontend

# Run Snyk Code Scan
snyk code test --severity-threshold=medium

# Run npm audit
npm audit
```

### Security Checklist
- [ ] No XSS vulnerabilities
- [ ] No sensitive data in code
- [ ] Input validation in place
- [ ] No known vulnerabilities in dependencies

### Gate Criteria
- [ ] No critical/high security issues

### If FAIL → Fix code (Stage 2) → Rerun Stage 3 → Rerun Stage 4

---

## Stage 5: Code Review

### Using frontend-review skill
1. Run code-review for the changes
2. Check React patterns
3. Verify accessibility
4. Ensure code quality

### Review Focus Areas
- **React Patterns**: Hooks usage, component structure
- **TypeScript**: Proper typing, no `any`
- **Accessibility**: ARIA labels, keyboard navigation
- **Code Quality**: Readability, naming, duplication

### Review Checklist
- [ ] Code reviewed
- [ ] React best practices followed
- [ ] Code quality meets standards
- [ ] Accessibility considered

### Gate Criteria
- [ ] Code review passed (no critical issues)

### If FAIL → Fix code (Stage 2) → Rerun Stage 3 → Rerun Stage 4 → Rerun Stage 5

---

## Stage 6: Testing

### Using frontend-test skill
1. Run existing tests first (no regression)
2. Write tests for new code
3. Cover edge cases
4. Verify all tests pass

### Test Commands
```bash
cd contact-form-app/frontend

# Run all tests
npm test -- --watchAll=false

# Run with coverage
npm test -- --coverage --watchAll=false
```

### Test Checklist
- [ ] Existing tests pass (no regression)
- [ ] New feature tests added
- [ ] Edge cases covered
- [ ] Error cases tested

### Gate Criteria
- [ ] Tất cả tests pass

### If FAIL → Fix code (Stage 2) → Rerun Stage 3 → Rerun Stage 4 → Rerun Stage 5 → Rerun Stage 6

---

## Pipeline Flow with Retry Logic

```
START
  │
  ▼
┌──────────────┐
│  Stage 1     │──── FAIL ────▶ EXIT (Requirements unclear)
│  ANALYZE     │──── PASS ────▶
└──────────────┘
  │
  ▼
┌──────────────┐
│  Stage 2     │──── FAIL ────▶ FIX → Stage 2
│  CODE        │──── PASS ────▶
└──────────────┘
  │
  ▼
┌──────────────┐
│  Stage 3     │──── FAIL ────▶ FIX → Stage 2 → Stage 3
│  LINT        │──── PASS ────▶
└──────────────┘
  │
  ▼
┌──────────────┐
│  Stage 4     │──── FAIL ────▶ FIX → Stage 2 → Stage 3 → Stage 4
│  SCAN        │──── PASS ────▶
└──────────────┘
  │
  ▼
┌──────────────┐
│  Stage 5     │──── FAIL ────▶ FIX → Stage 2 → Stage 3 → Stage 4 → Stage 5
│  REVIEW      │──── PASS ────▶
└──────────────┘
  │
  ▼
┌──────────────┐
│  Stage 6     │──── FAIL ────▶ FIX → Stage 2 → Stage 3 → Stage 4 → Stage 5 → Stage 6
│  TEST        │──── PASS ────▶
└──────────────┘
  │
  ▼
  ✅ DONE - Ready for commit
```

---

## Full Pipeline Usage

```bash
# Run full pipeline for a new feature
Use the frontend-code-review-test pipeline to implement [feature description]

# Run specific stage (với retry logic tự động nếu fail)
Analyze and plan [feature] using frontend-analysis-plan skill
Implement [feature] using frontend-code skill
Lint the code using frontend-lint skill
Scan for security issues using frontend-security-scan skill
Review [file] using frontend-review skill
Run tests using frontend-test skill

# Khi gặp fail:
# - Nếu Lint fail → Fix code rồi chạy lại Lint
# - Nếu Scan fail → Fix code rồi chạy lại Lint → Scan
# - Nếu Review fail → Fix code rồi chạy lại Lint → Scan → Review
# - Nếu Test fail → Fix code rồi chạy lại Lint → Scan → Review → Test
```

## Quick Reference

| Stage | Skill | Command | Gate |
|-------|-------|---------|------|
| 1. Analyze | frontend-analysis-plan | Plan feature | Must pass |
| 2. Code | frontend-code | Implement feature | No TS errors |
| 3. Lint | frontend-lint | `npm run lint` | No errors |
| 4. Scan | frontend-security-scan | `snyk code test` | No critical issues |
| 5. Review | frontend-review | Review code | No critical issues |
| 6. Test | frontend-test | `npm test` | All pass |

## Verification

After completing all stages:
- [ ] Implementation plan documented
- [ ] Code passes linting
- [ ] No security issues found
- [ ] Code reviewed and approved
- [ ] All tests pass
- [ ] ✅ Ready for commit
