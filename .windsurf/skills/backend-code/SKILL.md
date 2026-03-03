---
name: Backend Code
description: Professional backend Python code implementation following best practices
---

# Backend Code Skill

This skill guides through professional backend Python development for the Flask contact form API.

## When to Use
- Implementing new API endpoints
- Adding business logic
- Modifying existing endpoints
- Creating utility functions

## Code Standards

### Project Structure
```
contact-form-app/backend/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── test_app.py         # Unit tests
└── venv/              # Virtual environment
```

### Coding Conventions
- Use Flask 2.3.3 with Flask-CORS for cross-origin requests
- Follow PEP 8 style guide
- Use 4 spaces for indentation
- Maximum line length: 100 characters
- Type hints for function signatures

### API Design Patterns

#### Endpoint Structure
```python
@app.route('/api/resource', methods=['POST'])
def create_resource():
    # 1. Parse and validate request
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # 2. Validate input data
    # 3. Process business logic
    # 4. Return response
    return jsonify({'result': 'success'}), 201
```

#### Error Handling
```python
from flask import jsonify

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500
```

#### Validation
```python
def validate_contact_data(data):
    required_fields = ['name', 'email', 'message']
    for field in required_fields:
        if field not in data or not data[field]:
            return False, f'{field} is required'
    if not is_valid_email(data['email']):
        return False, 'Invalid email format'
    return True, None
```

### Security Guidelines
- **SQL Injection**: Use parameterized queries if using databases
- **Input Validation**: Validate and sanitize all user inputs
- **CORS**: Configure CORS properly for trusted origins
- **Error Messages**: Don't expose sensitive information in errors

### Logging
```python
import logging

logger = logging.getLogger(__name__)

@app.route('/api/contacts', methods=['POST'])
def create_contact():
    logger.info(f"Received contact submission: {request.json}")
    # ... process
    logger.info("Contact created successfully")
```

## Implementation Checklist

- [ ] Parse request data properly
- [ ] Validate all required fields
- [ ] Add appropriate error handling
- [ ] Return proper HTTP status codes
- [ ] Add logging for debugging
- [ ] Follow RESTful conventions
- [ ] Add type hints
- [ ] Write or update tests

## Related Rules

See `.windsurf/rules/secure-development.md` for security guidelines:
- Use parameterized queries (prevent SQL injection)
- Validate and sanitize all user inputs

## How to Invoke

```
Implement [feature description] using the backend-code skill
```

## File Locations

- Main app: `contact-form-app/backend/app.py`
- Tests: `contact-form-app/backend/test_app.py`
- Requirements: `contact-form-app/backend/requirements.txt`
