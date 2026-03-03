---
name: Backend Lint
description: Code linting and formatting skill for Python backend
---

# Backend Lint Skill

This skill guides through linting and formatting Python code to maintain code quality.

## When to Use
- Before committing code
- After implementing new features
- During code review
- As part of the development workflow

## Linting Tools

### Primary Tool: flake8
- Style guide enforcement (PEP 8)
- Code complexity checks
- Unused imports/variables detection

### Optional Tools
- **black** - Code formatter
- **isort** - Import sorting
- **pylint** - More thorough analysis

## Commands

### Run flake8
```bash
cd contact-form-app/backend
source venv/bin/activate
flake8 . --max-line-length=100 --ignore=E501,W503
```

### Run with specific file
```bash
flake8 app.py --max-line-length=100
```

### Run black formatter
```bash
black . --line-length=100
```

### Run isort (import sorting)
```bash
isort . --profile=black
```

### Run all linters
```bash
flake8 . && black --check . && isort --check .
```

## Common Issues and Fixes

### Line Too Long
```python
# Bad
def some_function(arg1, arg2, arg3, arg4, arg5):
    return arg1 + arg2 + arg3 + arg4 + arg5

# Good
def some_function(arg1, arg2, arg3, arg4, arg5):
    return (arg1 + arg2 + arg3 +
            arg4 + arg5)
```

### Unused Import
```python
# Bad
import json
from flask import request

def example():
    data = request.get_json()
    return data

# Good
from flask import request

def example():
    data = request.get_json()
    return data
```

### Import Order (use isort)
```python
# Bad
import requests
from flask import jsonify
import os

# Good (isort will fix)
import os

import requests
from flask import jsonify
```

### Unused Variable
```python
# Bad
def process_data(data):
    result = transform(data)
    return data  # Should be 'result'

# Good
def process_data(data):
    result = transform(data)
    return result
```

## Configuration

### flake8 config in pyproject.toml or setup.cfg
```toml
[flake8]
max-line-length = 100
exclude = .git,__pycache__,venv
ignore = E501,W503
```

## Checklist

- [ ] Run flake8 on modified files
- [ ] Fix all linting errors
- [ ] Run black formatter (optional)
- [ ] Run isort for imports (optional)
- [ ] No warnings remain

## Related Rules

See `.windsurf/rules/secure-development.md` for security guidelines:
- Use parameterized queries (prevent SQL injection)
- Validate and sanitize all user inputs

## How to Invoke

```
Lint the backend code using the backend-lint skill
Run flake8 on [file] using the backend-lint skill
```
