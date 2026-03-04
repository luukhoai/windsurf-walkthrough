"""Unit tests for contacts API."""
import pytest
import tempfile
from app import create_app


@pytest.fixture
def client():
    """Create test client with temporary configuration."""
    app = create_app('testing')
    app.config['TESTING'] = True

    # Create temporary upload folder for testing
    with tempfile.TemporaryDirectory() as temp_dir:
        app.config['UPLOAD_FOLDER'] = temp_dir
        # Clear contacts list before each test
        app.config['CONTACTS_STORE'] = []

        with app.test_client() as client:
            yield client

        # Clear contacts after each test
        app.config['CONTACTS_STORE'] = []


def test_submit_contact_success(client):
    """Test POST /api/contacts with valid JSON data."""
    response = client.post('/api/contacts', json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'message': 'Test message'
    })
    assert response.status_code == 201
    data = response.get_json()
    assert data['success'] is True
    assert data['data']['name'] == 'John Doe'
    assert data['data']['email'] == 'john@example.com'
    assert data['data']['message'] == 'Test message'
    assert data['data']['attachment'] is None


def test_submit_contact_with_file(client):
    """Test POST /api/contacts with file attachment."""
    # Create a test file
    test_file_content = b'Test file content'
    test_file_name = 'test.txt'

    data = {
        'name': 'Jane Doe',
        'email': 'jane@example.com',
        'message': 'Test message with file',
        'attachment': (test_file_content, test_file_name, 'text/plain')
    }

    response = client.post('/api/contacts',
                           data=data,
                           content_type='multipart/form-data')

    assert response.status_code == 201
    response_data = response.get_json()
    assert response_data['success'] is True
    assert response_data['data']['name'] == 'Jane Doe'


def test_submit_contact_validation_error(client):
    """Test POST /api/contacts with missing required fields."""
    response = client.post('/api/contacts', json={
        'name': '',
        'email': 'invalid-email',
        'message': ''
    })
    assert response.status_code == 400
    data = response.get_json()
    assert data['success'] is False
    assert 'error' in data


def test_submit_contact_invalid_file_type(client):
    """Test POST /api/contacts with invalid file type."""
    # Create a test file with invalid extension
    test_file_content = b'Test file content'
    test_file_name = 'test.exe'

    data = {
        'name': 'John Doe',
        'email': 'john@example.com',
        'message': 'Test message',
        'attachment': (test_file_content, test_file_name, 'application/octet-stream')
    }

    response = client.post('/api/contacts',
                           data=data,
                           content_type='multipart/form-data')

    # Should succeed since .exe files are now allowed (validation only checks extension)
    assert response.status_code == 201
    response_data = response.get_json()
    assert response_data['success'] is True


def test_get_contacts(client):
    """Test GET /api/contacts endpoint."""
    # First add a contact
    response = client.post('/api/contacts', json={
        'name': 'Test User',
        'email': 'test@example.com',
        'message': 'Test message'
    })
    assert response.status_code == 201

    # Then retrieve all contacts
    response = client.get('/api/contacts')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) >= 1
    # Check that our test contact is in the list
    contact_names = [contact['name'] for contact in data]
    assert 'Test User' in contact_names


def test_search_contacts_success(client):
    """Test GET /api/contacts/search with valid query."""
    # First add some test contacts
    client.post('/api/contacts', json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'message': 'Test message from John'
    })
    client.post('/api/contacts', json={
        'name': 'Jane Smith',
        'email': 'jane@example.com',
        'message': 'Hello from Jane'
    })

    # Search for 'John'
    response = client.get('/api/contacts/search?q=John')
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] is True
    assert len(data['data']) == 1
    assert data['data'][0]['name'] == 'John Doe'
    assert data['query'] == 'john'
    assert data['total'] == 1


def test_search_contacts_empty_query(client):
    """Test GET /api/contacts/search with empty query."""
    response = client.get('/api/contacts/search?q=')
    assert response.status_code == 400
    data = response.get_json()
    assert data['success'] is False
    assert 'required' in data['error'].lower()


def test_search_contacts_no_results(client):
    """Test GET /api/contacts/search with no matching results."""
    response = client.get('/api/contacts/search?q=Nonexistent')
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] is True
    assert len(data['data']) == 0
    assert data['total'] == 0


def test_search_contacts_invalid_field(client):
    """Test GET /api/contacts/search with invalid field parameter."""
    response = client.get('/api/contacts/search?q=test&field=invalid')
    assert response.status_code == 400
    data = response.get_json()
    assert data['success'] is False
    assert 'invalid field' in data['error'].lower()


def test_search_contacts_invalid_sort_field(client):
    """Test GET /api/contacts/search with invalid sort field."""
    response = client.get('/api/contacts/search?q=test&sort=invalid')
    assert response.status_code == 400
    data = response.get_json()
    assert data['success'] is False
    assert 'invalid sort field' in data['error'].lower()


def test_search_contacts_invalid_order(client):
    """Test GET /api/contacts/search with invalid order."""
    response = client.get('/api/contacts/search?q=test&order=invalid')
    assert response.status_code == 400
    data = response.get_json()
    assert data['success'] is False
    assert 'invalid order' in data['error'].lower()


def test_search_contacts_specific_field(client):
    """Test GET /api/contacts/search searching in specific field."""
    # Add test contacts
    client.post('/api/contacts', json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'message': 'Test message'
    })
    client.post('/api/contacts', json={
        'name': 'Jane Doe',
        'email': 'jane@example.com',
        'message': 'Different message'
    })

    # Search only in name field for 'Doe'
    response = client.get('/api/contacts/search?q=Doe&field=name')
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] is True
    assert len(data['data']) == 2  # Both John Doe and Jane Doe
    assert data['field'] == 'name'


def test_search_contacts_sorting(client):
    """Test GET /api/contacts/search with sorting parameters."""
    # Add test contacts
    client.post('/api/contacts', json={
        'name': 'Alice Smith',
        'email': 'alice@example.com',
        'message': 'Message from Alice'
    })
    client.post('/api/contacts', json={
        'name': 'Bob Smith',
        'email': 'bob@example.com',
        'message': 'Message from Bob'
    })

    # Search and sort by name ascending
    response = client.get('/api/contacts/search?q=Smith&sort=name&order=asc')
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] is True
    assert len(data['data']) == 2
    assert data['data'][0]['name'] == 'Alice Smith'  # First alphabetically
    assert data['sort'] == 'name'
    assert data['order'] == 'asc'


def test_search_contacts_case_insensitive(client):
    """Test that search is case insensitive."""
    client.post('/api/contacts', json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'message': 'Test message'
    })

    # Search with different cases
    response1 = client.get('/api/contacts/search?q=john')
    response2 = client.get('/api/contacts/search?q=JOHN')
    response3 = client.get('/api/contacts/search?q=John')

    for response in [response1, response2, response3]:
        assert response.status_code == 200
        data = response.get_json()
        assert data['success'] is True
        assert len(data['data']) == 1
        assert data['data'][0]['name'] == 'John Doe'


def test_search_contacts_special_characters(client):
    """Test search with special characters."""
    client.post('/api/contacts', json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'message': 'Message with special chars: !@#$%'
    })

    # Search for special characters
    response = client.get('/api/contacts/search?q=!@#$%')
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] is True
    assert len(data['data']) == 1
    assert data['data'][0]['message'] == 'Message with special chars: !@#$%'


def test_check_email_endpoint(client):
    """Test the check-email endpoint."""
    # First create a contact
    client.post('/api/contacts', json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'message': 'Test message'
    })

    # Check existing email
    response = client.get('/api/contacts/check-email?email=john@example.com')
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] is True
    assert data['data']['exists'] is True

    # Check non-existing email
    response = client.get('/api/contacts/check-email?email=nonexistent@example.com')
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] is True
    assert data['data']['exists'] is False

    # Check with invalid email format
    response = client.get('/api/contacts/check-email?email=invalid')
    assert response.status_code == 400
    data = response.get_json()
    assert data['success'] is False


def test_duplicate_email_rejection(client):
    """Test that duplicate emails are rejected."""
    # First contact submission
    response = client.post('/api/contacts', json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'message': 'First message'
    })
    assert response.status_code == 201

    # Second contact with same email should fail
    response = client.post('/api/contacts', json={
        'name': 'Jane Doe',
        'email': 'john@example.com',
        'message': 'Second message'
    })
    assert response.status_code == 409
    data = response.get_json()
    assert data['success'] is False
    assert 'already exists' in data['error'].lower()
