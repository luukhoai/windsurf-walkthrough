---
name: Backend Code-Review-Test Pipeline
description: Professional CI-style pipeline for backend: analyze → implement → review → test
---

# Backend Code-Review-Test Pipeline

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

See `.windsurf/rules/backend-development.md`

---

## Stage 1: Analyze & Plan

**Skill:** `backend-analysis-plan`

### Gate: Plan written

---

## Stage 2: Implement

**Skill:** `backend-code`

Includes: Code + Lint + Security Scan

### Commands
```bash
cd contact-form-app/backend
source venv/bin/activate

# Run app
python run.py

# Run lint
flake8 app/ tests/

# Run security scan
snyk code test --severity-threshold=medium
```

### Gate: Code + Lint + Security pass

---

## Stage 3: Review

**Skill:** `backend-review`

### Gate: Code reviewed

---

## Stage 4: Test

**Skill:** `backend-test`

### Command
```bash
pytest tests/ -v
```

### Gate: All tests pass

---

## Usage & Reference

### Invoke Pipeline
```bash
# Full pipeline
Use the backend-code-review-test pipeline to implement [feature]

# By stage
Analyze using backend-analysis-plan skill
Implement using backend-code skill
Review using backend-review skill
Test using backend-test skill
```

### Stage Reference

| Stage | Skill | Gate |
|-------|-------|------|
| 1. Analyze | backend-analysis-plan | Plan written |
| 2. Implement | backend-code | Code+Lint+Scan pass |
| 3. Review | backend-review | Approved |
| 4. Test | backend-test | All pass |

## Verification

- [ ] Plan documented
- [ ] Implement complete
- [ ] Code reviewed
- [ ] Tests pass
- [ ] ✅ Ready
