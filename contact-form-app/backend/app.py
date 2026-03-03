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

    contacts.append(contact)
    app.logger.info(f"Contact created with ID: {contact['id']}")

    return jsonify({'success': True, 'data': contact}), 201


@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    return jsonify(contacts)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
