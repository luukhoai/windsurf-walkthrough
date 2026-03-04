---
name: backend-code
description: Backend implementation skill with lint
---

# Backend Code Skill

Implement backend code with linting.

## When to Use
- Implementing new API endpoints
- Adding business logic
- Creating utility functions
- After analysis stage

## Concept

- **This skill**: Implementation + Lint
- **Review**: See `backend-review` skill
- **Rules**: Standards (`.windsurf/rules/`)

## Implementation

See `.windsurf/rules/backend-development.md` for project structure.

### Where to Add Code

| Type | Location |
|------|-----------|
| New endpoint | `app/routes/new_resource.py` |
| New model | `app/models/__init__.py` |
| New validator | `app/utils/validators.py` |
| New test | `tests/test_new_resource.py` |

### Code Pattern

```python
# Route: app/routes/contacts.py
from flask import Blueprint, request, jsonify

contacts_bp = Blueprint('contacts', __name__)

@contacts_bp.route('/api/contacts', methods=['POST'])
def create_contact():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    # ... process
    return jsonify({'success': True, 'data': result}), 201
```

## Lint

### Run Lint
```bash
cd contact-form-app/backend
source venv/bin/activate
flake8 app/ tests/ --max-line-length=100 --ignore=E501,W503
```

### Common Fixes

| Issue | Fix |
|-------|-----|
| Line too long | Split line |
| Unused import | Remove import |
| Missing type hint | Add `-> type` |

## Commands

### Run App
```bash
cd contact-form-app/backend
source venv/bin/activate
python run.py
```

### Run Tests
```bash
pytest tests/ -v
```

### Run Lint
```bash
flake8 app/ tests/
```

## Checklist

- [ ] Code follows project structure
- [ ] Flask patterns correct
- [ ] Error handling in place
- [ ] Validation implemented
- [ ] Logging added
- [ ] Type hints used
- [ ] Tests written
- [ ] Lint passes

## Related Rules

See `.windsurf/rules/backend-development.md`

## How to Invoke

```
Implement [feature] using the backend-code skill
```

## Related Skills

- **Review**: Use `backend-review` skill for code review
