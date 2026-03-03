from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid
from werkzeug.utils import secure_filename
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# TODO: Add database integration
contacts = []

# Initialize app.contacts for consistency
app.contacts = contacts


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def validate_file_size(file):
    """Check if file size is within limit"""
    return file.content_length <= MAX_FILE_SIZE


@app.route('/api/contacts', methods=['POST'])
def submit_contact():
    try:
        # Check if this is a multipart/form-data request (file upload)
        content_type = request.content_type or ''
        if content_type.startswith('multipart/form-data'):
            return handle_contact_with_file()
        else:
            return handle_contact_without_file()
    except Exception as e:
        app.logger.error(f"Error submitting contact: {str(e)}")
        return jsonify({'success': False, 'error': 'Internal server error'}), 500


def handle_contact_with_file():
    """Handle contact submission with file attachment"""
    # Get form fields
    name = request.form.get('name', '').strip()
    email = request.form.get('email', '').strip()
    message = request.form.get('message', '').strip()
    file = request.files.get('attachment')

    # Validate required fields
    if not name:
        return jsonify({'success': False, 'error': 'Name is required'}), 400
    if not email:
        return jsonify({'success': False, 'error': 'Email is required'}), 400
    if not message:
        return jsonify({'success': False, 'error': 'Message is required'}), 400

    # Validate email format
    if '@' not in email or '.' not in email:
        return jsonify({'success': False, 'error': 'Invalid email format'}), 400

    # Handle file upload
    attachment_info = None
    if file and file.filename != '':
        # Validate file
        if not allowed_file(file.filename):
            error_msg = 'File type not allowed. Allowed types: pdf, doc, docx, txt, jpg, jpeg, png'
            return jsonify({'success': False, 'error': error_msg}), 400

        if not validate_file_size(file):
            error_msg = 'File size too large. Maximum size is 5MB'
            return jsonify({'success': False, 'error': error_msg}), 400

        # Save file
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        file.save(file_path)

        attachment_info = {
            'original_filename': filename,
            'stored_filename': unique_filename,
            'size': file.content_length,
            'type': file.content_type or 'application/octet-stream'
        }

    # Create contact record
    contact = {
        'id': str(uuid.uuid4()),
        'name': name,
        'email': email,
        'message': message,
        'attachment': attachment_info,
        'created_at': datetime.now().isoformat()
    }

    contacts.append(contact)
    app.logger.info(f"Contact created with ID: {contact['id']}")

    return jsonify({'success': True, 'data': contact}), 201


def handle_contact_without_file():
    """Handle contact submission without file attachment (backward compatibility)"""
    data = request.json
    if not data:
        return jsonify({'success': False, 'error': 'No data provided'}), 400

    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()

    # Validate required fields
    if not name:
        return jsonify({'success': False, 'error': 'Name is required'}), 400
    if not email:
        return jsonify({'success': False, 'error': 'Email is required'}), 400
    if not message:
        return jsonify({'success': False, 'error': 'Message is required'}), 400

    # Validate email format
    if '@' not in email or '.' not in email:
        return jsonify({'success': False, 'error': 'Invalid email format'}), 400

    # Create contact record
    contact = {
        'id': str(uuid.uuid4()),
        'name': name,
        'email': email,
        'message': message,
        'attachment': None,
        'created_at': datetime.now().isoformat()
    }

    app.contacts.append(contact)
    app.logger.info(f"Contact created with ID: {contact['id']}")

    return jsonify({'success': True, 'data': contact}), 201


@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    return jsonify(app.contacts)


@app.route('/api/contacts/search', methods=['GET'])
def search_contacts():
    """
    Search contacts by query string with optional field filtering and sorting
    Query parameters:
    - q: search term (required)
    - field: search field (name|email|message|all, default: all)
    - sort: sort field (created_at|name|email, default: created_at)
    - order: sort order (asc|desc, default: desc)
    """
    try:
        # Get query parameters
        query = request.args.get('q', '').strip()
        field = request.args.get('field', 'all').lower()
        sort_field = request.args.get('sort', 'created_at').lower()
        order = request.args.get('order', 'desc').lower()

        # Validate parameters
        if not query:
            return jsonify({
                'success': False,
                'error': 'Search query is required'
            }), 400

        valid_fields = ['name', 'email', 'message', 'all']
        if field not in valid_fields:
            return jsonify({
                'success': False,
                'error': f'Invalid field. Must be one of: {", ".join(valid_fields)}'
            }), 400

        valid_sort_fields = ['created_at', 'name', 'email']
        if sort_field not in valid_sort_fields:
            return jsonify({
                'success': False,
                'error': f'Invalid sort field. Must be one of: {", ".join(valid_sort_fields)}'
            }), 400

        if order not in ['asc', 'desc']:
            return jsonify({
                'success': False,
                'error': 'Invalid order. Must be asc or desc'
            }), 400

        # Sanitize search query
        query = query.lower()

        # Filter contacts based on search query and field
        filtered_contacts = []
        for contact in app.contacts:
            if field == 'all':
                # Search across all fields
                if (query in contact['name'].lower() or
                    query in contact['email'].lower() or
                        query in contact['message'].lower()):
                    filtered_contacts.append(contact)
            else:
                # Search in specific field
                if query in contact[field].lower():
                    filtered_contacts.append(contact)

        # Sort results
        reverse_order = (order == 'desc')
        if sort_field == 'created_at':
            # Sort by datetime
            filtered_contacts.sort(
                key=lambda x: datetime.fromisoformat(
                    x[sort_field].replace('Z', '+00:00')),
                reverse=reverse_order
            )
        else:
            # Sort by string field
            filtered_contacts.sort(
                key=lambda x: x[sort_field].lower(),
                reverse=reverse_order
            )

        app.logger.info(f"Search performed: query='{query}', field='{field}', "
                        f"results={len(filtered_contacts)}")

        return jsonify({
            'success': True,
            'data': filtered_contacts,
            'total': len(filtered_contacts),
            'query': query,
            'field': field,
            'sort': sort_field,
            'order': order
        })

    except Exception as e:
        app.logger.error(f"Error in search_contacts: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Internal server error during search'
        }), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
