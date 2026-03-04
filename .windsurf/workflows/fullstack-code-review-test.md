---
name: Fullstack Code-Review-Test Pipeline
description: Professional CI-style pipeline for fullstack: analyze → implement → review → test
---

# Fullstack Code-Review-Test Pipeline

## Concept

- **Rules** → Standards (`.windsurf/rules/`)
- **Skills** → Implementation + Lint + Security Scan

## Pipeline

```
        ┌──────────┐
        │  ANALYZE │  ← Plan API contract
        └────┬─────┘
             │
    ┌────────┴────────┐
    │                   │
    ▼                   ▼
┌────────┐         ┌────────┐
│BACKEND │         │FRONTEND│  ← Implement + Lint + Scan
│ CODE   │         │  CODE  │
└───┬────┘         └───┬────┘
    └────────┬────────┘
             │
             ▼
        ┌────────┐
        │ REVIEW │  ← Both layers
        └────┬────┘
             │
             ▼
        ┌────────┐
        │  TEST  │  ← Both layers
        └────────┘
```

## Prerequisites

**Backend:** `.windsurf/rules/backend-development.md`
**Frontend:** `.windsurf/rules/frontend-development.md`

---

## Stage 1: Analyze & Plan

**Skill:** `fullstack-analysis-plan`

### Gate: Plan with API contract

---

## Stage 2: Implement

**Skills:** `backend-code` + `frontend-code`

Includes: Code + Lint + Security Scan for each layer

### Commands
```bash
# Backend
cd contact-form-app/backend
source venv/bin/activate
python run.py
flake8 app/ tests/
snyk code test

# Frontend
cd contact-form-app/frontend
npm start
npm run lint
snyk code test
npm audit
```

### Gate: Both layers pass

---

## Stage 3: Review

**Skills:** `backend-review` + `frontend-review`

### Gate: Both layers reviewed

---

## Stage 4: Test

**Skills:** `backend-test` + `frontend-test`

### Commands
```bash
# Backend
pytest tests/ -v

# Frontend
npm test -- --watchAll=false
```

### Gate: All tests pass

---

## Usage & Reference

### Invoke Pipeline
```bash
# Full pipeline
Use the fullstack-code-review-test pipeline to implement [feature]

# By stage
Analyze using fullstack-analysis-plan skill
Implement backend using backend-code skill
Implement frontend using frontend-code skill
Review using backend-review and frontend-review skills
Test using backend-test and frontend-test skills
```

### Stage Reference

| Stage | Skills | Gate |
|-------|--------|------|
| 1. Analyze | fullstack-analysis-plan | Plan written |
| 2. Implement | backend-code, frontend-code | Code+Lint+Scan pass |
| 3. Review | backend-review, frontend-review | Approved |
| 4. Test | backend-test, frontend-test | All pass |

## Verification

- [ ] API contract defined
- [ ] Backend implemented
- [ ] Frontend implemented
- [ ] Both reviewed
- [ ] All tests pass
- [ ] ✅ Ready
