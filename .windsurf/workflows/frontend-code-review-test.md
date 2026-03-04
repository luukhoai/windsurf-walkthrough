---
name: Frontend Code-Review-Test Pipeline
description: Professional CI-style pipeline for frontend: analyze → implement → review → test
---

# Frontend Code-Review-Test Pipeline

## Concept

- **Rules** → Standards (`.windsurf/rules/`)
- **Skills** → Implementation + Lint + Security Scan

## Pipeline

```
┌──────────┐  ┌───────────┐  ┌──────────┐  ┌─────────┐
│ ANALYZE │─▶│ IMPLEMENT │─▶│  REVIEW  │─▶│   TEST  │
│  Plan   │  │Code+Lint+Scan│ │ Quality  │  │ Verify │
└──────────┘  └───────────┘  └──────────┘  └─────────┘
```

## Prerequisites

See `.windsurf/rules/frontend-development.md`

---

## Stage 1: Analyze & Plan

**Skill:** `frontend-analysis-plan`

### Gate: Plan written

---

## Stage 2: Implement

**Skill:** `frontend-code`

Includes: Code + Lint + Security Scan

### Commands
```bash
cd contact-form-app/frontend

# Run app
npm start

# Run lint
npm run lint

# Run security scan
snyk code test --severity-threshold=medium
npm audit
```

### Gate: Code + Lint + Security pass

---

## Stage 3: Review

**Skill:** `frontend-review`

### Gate: Code reviewed

---

## Stage 4: Test

**Skill:** `frontend-test`

### Command
```bash
npm test -- --watchAll=false
```

### Gate: All tests pass

---

## Usage & Reference

### Invoke Pipeline
```bash
# Full pipeline
Use the frontend-code-review-test pipeline to implement [feature]

# By stage
Analyze using frontend-analysis-plan skill
Implement using frontend-code skill
Review using frontend-review skill
Test using frontend-test skill
```

### Stage Reference

| Stage | Skill | Gate |
|-------|-------|------|
| 1. Analyze | frontend-analysis-plan | Plan written |
| 2. Implement | frontend-code | Code+Lint+Scan pass |
| 3. Review | frontend-review | Approved |
| 4. Test | frontend-test | All pass |

## Verification

- [ ] Plan documented
- [ ] Implement complete
- [ ] Code reviewed
- [ ] Tests pass
- [ ] ✅ Ready
