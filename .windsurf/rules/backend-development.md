---
trigger: always_on
description: when working on backend code files
globs: ["**/*.py", "requirements.txt", "app.py", "run.py"]
---

## Python Environment
Always use venv/bin/python as the Python interpreter for backend tasks
When running backend commands, prefix with venv/bin/python

## Flask Development Standards
- Use Flask 2.3.3 with Flask-CORS
- Follow PEP 8 style guide (4 spaces, 100 char line limit)
- Use Flask app factory pattern
- Organize code with Blueprints
- Add type hints to function signatures

## Project Structure
```
contact-form-app/backend/
├── app/
│   ├── __init__.py          # Flask app factory (create_app)
│   ├── config.py            # Configuration (Dev/Testing/Prod)
│   ├── models/
│   │   └── __init__.py      # Contact model
│   ├── routes/
│   │   ├── __init__.py
│   │   └── contacts.py       # Contact API routes
│   └── utils/
│       ├── __init__.py
│       ├── validators.py     # Validation functions
│       └── helpers.py        # File handling helpers
├── tests/
│   ├── __init__.py
│   └── test_contacts.py     # Unit tests
├── run.py                   # Entry point
├── requirements.txt
└── uploads/                 # File uploads directory
```

## Security Requirements
- Validate all user inputs
- Use parameterized queries for databases
- Configure CORS properly
- Don't expose sensitive data in errors

## API Standards
- Return proper HTTP status codes
- Use JSON responses
- Add error handling
- Include logging for debugging

## Entry Points
- **Run app**: `python run.py`
- **Run tests**: `pytest tests/ -v`