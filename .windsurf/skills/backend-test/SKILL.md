---
name: Backend Test
description: Professional backend testing skill for Flask Python applications
---

# Backend Test Skill

This skill guides through writing and maintaining professional tests for the Flask backend.

## When to Use
- Writing new unit tests
- Adding tests for new features
- Debugging test failures
- Improving test coverage

## Test Framework
- **Framework**: pytest 7.4.2
- **HTTP Testing**: Flask test client
- **Assertions**: pytest assertions

## Test File Structure

File: `contact-form-app/backend/test_app.py`

```python
import pytest
from app import app

@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_contacts_empty(client):
    """Test GET /api/contacts when no contacts exist."""
    response = client.get('/api/contacts')
    assert response.status_code == 200
    data = response.get_json()
    assert data['contacts'] == []

def test_create_contact_success(client):
    """Test POST /api/contacts with valid data."""
    response = client.post('/api/contacts', json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'message': 'Hello world'
    })
    assert response.status_code == 201
    data = response.get_json()
    assert data['contact']['name'] == 'John Doe'

def test_create_contact_missing_fields(client):
    """Test POST /api/contacts with missing required fields."""
    response = client.post('/api/contacts', json={
        'name': 'John Doe'
    })
    assert response.status_code == 400

def test_create_contact_invalid_email(client):
    """Test POST /api/contacts with invalid email."""
    response = client.post('/api/contacts', json={
        'name': 'John Doe',
        'email': 'not-an-email',
        'message': 'Hello'
    })
    assert response.status_code == 400
```

## Running Tests

### Run All Tests
```bash
cd contact-form-app/backend
source venv/bin/activate
pytest -v
```

### Run Specific Test
```bash
pytest test_app.py::test_create_contact_success -v
```

### Run with Coverage
```bash
pytest --cov=. --cov-report=html
```

### Run in Watch Mode
```bash
pytest --watch
```

## Test Patterns

### Using Fixtures
```python
@pytest.fixture
def sample_contact():
    return {
        'name': 'Test User',
        'email': 'test@example.com',
        'message': 'Test message'
    }

def test_create_contact(client, sample_contact):
    response = client.post('/api/contacts', json=sample_contact)
    assert response.status_code == 201
```

### Testing Error Cases
```python
def test_create_contact_invalid_email(client):
    """Always test error cases."""
    response = client.post('/api/contacts', json={
        'name': 'John',
        'email': 'invalid-email',
        'message': 'Test'
    })
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data
```

### Testing Edge Cases
```python
def test_create_contact_empty_message(client):
    """Test with empty but valid message."""
    response = client.post('/api/contacts', json={
        'name': 'John',
        'email': 'john@example.com',
        'message': ''
    })
    # Depending on requirements - may accept or reject

def test_create_contact_very_long_name(client):
    """Test with maximum length input."""
    long_name = 'A' * 256
    response = client.post('/api/contacts', json={
        'name': long_name,
        'email': 'test@example.com',
        'message': 'Test'
    })
    # Check appropriate handling
```

## Test Checklist

- [ ] Test successful case
- [ ] Test missing required fields
- [ ] Test invalid data formats (email, etc.)
- [ ] Test edge cases (empty, max length, special chars)
- [ ] Test proper HTTP status codes
- [ ] Test error response format
- [ ] Ensure tests are independent
- [ ] Use descriptive test names

## Common Assertions

```python
# Response status
assert response.status_code == 201

# Response data
data = response.get_json()
assert 'contact' in data
assert data['contact']['name'] == 'John'

# Error responses
assert response.status_code == 400
assert 'error' in response.get_json()

# List responses
contacts = data['contacts']
assert len(contacts) == 1
```

## How to Invoke

```
Write tests for [feature] using the backend-test skill
Run tests using the backend-test skill
```

## Best Practices

1. **Arrange-Act-Assert**: Structure each test clearly
2. **One assertion focus**: Each test should verify one behavior
3. **Descriptive names**: Test names should describe what they test
4. **Test isolation**: Tests should not depend on each other
5. **Coverage**: Aim for high coverage but prioritize critical paths
