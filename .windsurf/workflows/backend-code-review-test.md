---
name: backend-code-review-test
description: Professional CI-style pipeline for backend analyze → implement → test → review
---

# Backend Code-Review-Test Pipeline

## Concept

- **Rules** → Standards (`.windsurf/rules/`)
- **Skills** → Implementation + Lint + Security Scan

## Pipeline

```
┌──────────┐  ┌───────────┐  ┌─────────┐  ┌──────────┐
│ ANALYZE │─▶│ IMPLEMENT │─▶│  TEST   │─▶│  REVIEW  │
│  Plan   │  │Code+Lint│ │ Verify │  │ Quality  │
└──────────┘  └───────────┘  └─────────┘  └──────────┘
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

## Stage 3: Test

**Skill:** `backend-test`

### Command
```bash
pytest tests/ -v
```

### Gate: All tests pass

---

## Stage 4: Review

**Skill:** `backend-review`

### Gate: Code reviewed

---

## Usage & Reference

### Invoke Pipeline
```bash
# Full pipeline
Use the backend-code-review-test pipeline to implement [feature]

# By stage
Analyze using backend-analysis-plan skill
Implement using backend-code skill
Test using backend-test skill
Review using backend-review skill
```

### Stage Reference

| Stage | Skill | Gate |
|-------|-------|------|
| 1. Analyze | backend-analysis-plan | Plan written |
| 2. Implement | backend-code | Code+Lint pass |
| 3. Test | backend-test | All tests pass |
| 4. Review | backend-review | Approved |

## Verification

- [ ] Plan documented
- [ ] Implement complete
- [ ] Tests pass
- [ ] Code reviewed
- [ ] ✅ Ready
