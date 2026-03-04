"""Contact API routes."""
from flask import Blueprint, request, jsonify, current_app
from datetime import datetime

from ..utils.validators import (
    validate_email_format,
    validate_required_fields,
    validate_file_extension,
    validate_file_size
)
from ..utils.helpers import save_uploaded_file
from ..config import Config

# Create blueprint
contacts_bp = Blueprint('contacts', __name__, url_prefix='/api/contacts')


def get_contacts_store():
    """Get the contacts store from the current app."""
    return current_app.config.get('CONTACTS_STORE', [])


def check_email_exists(email: str) -> bool:
    """
    Check if email already exists in contacts (case-insensitive).

    Args:
        email: Email to check

    Returns:
        True if email exists, False otherwise
    """
    email_lower = email.lower().strip()
    contacts = get_contacts_store()
    for contact in contacts:
        if contact['email'].lower().strip() == email_lower:
            return True
    return False


@contacts_bp.route('/check-email', methods=['GET'])
def check_email():
    """
    Check if email already exists in the system.

    Query Parameters:
        email: Email address to check

    Returns:
        JSON response with existence status
    """
    try:
        email = request.args.get('email', '').strip()

        if not email:
            return jsonify({'success': False, 'error': 'Email parameter is required'}), 400

        if not validate_email_format(email):
            return jsonify({'success': False, 'error': 'Invalid email format'}), 400

        exists = check_email_exists(email)

        return jsonify({
            'success': True,
            'data': {
                'exists': exists,
                'email': email
            }
        })

    except Exception as e:
        current_app.logger.error(f"Error checking email: {str(e)}")
        return jsonify({'success': False, 'error': 'Internal server error'}), 500


@contacts_bp.route('', methods=['POST'])
def submit_contact():
    """
    Submit a new contact form entry.

    Accepts both JSON and multipart/form-data (with file attachment).

    Returns:
        JSON response with created contact or error
    """
    try:
        content_type = request.content_type or ''

        if content_type.startswith('multipart/form-data'):
            return handle_contact_with_file()
        else:
            return handle_contact_without_file()

    except Exception as e:
        current_app.logger.error(f"Error submitting contact: {str(e)}")
        return jsonify({'success': False, 'error': 'Internal server error'}), 500


def handle_contact_with_file():
    """Handle contact submission with file attachment."""
    name = request.form.get('name', '').strip()
    email = request.form.get('email', '').strip()
    message = request.form.get('message', '').strip()
    file = request.files.get('attachment')

    # Validate required fields
    is_valid, error = validate_required_fields(
        {'name': name, 'email': email, 'message': message},
        ['name', 'email', 'message']
    )
    if not is_valid:
        return jsonify({'success': False, 'error': error}), 400

    # Validate email format
    if not validate_email_format(email):
        return jsonify({'success': False, 'error': 'Invalid email format'}), 400

    # Check for duplicate email
    if check_email_exists(email):
        return jsonify({'success': False, 'error': 'A contact with this email already exists'}), 409

    # Handle file upload
    attachment_info = None
    if file and file.filename != '':
        allowed_extensions = current_app.config.get('ALLOWED_EXTENSIONS', Config.ALLOWED_EXTENSIONS)
        max_file_size = current_app.config.get('MAX_FILE_SIZE', Config.MAX_FILE_SIZE)

        # Validate file extension
        if not validate_file_extension(file.filename, allowed_extensions):
            error_msg = 'File type not allowed. Allowed types: pdf, doc, docx, txt, jpg, jpeg, png'
            return jsonify({'success': False, 'error': error_msg}), 400

        # Validate file size
        if not validate_file_size(file.content_length, max_file_size):
            error_msg = 'File size too large. Maximum size is 5MB'
            return jsonify({'success': False, 'error': error_msg}), 400

        # Save file
        upload_folder = current_app.config.get('UPLOAD_FOLDER', Config.UPLOAD_FOLDER)
        attachment_info = save_uploaded_file(file, upload_folder)

    # Create contact record
    contact = {
        'id': str(datetime.now().timestamp()) + '_' + str(hash(email))[:8],
        'name': name,
        'email': email,
        'message': message,
        'attachment': attachment_info,
        'created_at': datetime.now().isoformat()
    }

    contacts = get_contacts_store()
    contacts.append(contact)
    current_app.logger.info(f"Contact created with ID: {contact['id']}")

    return jsonify({'success': True, 'data': contact}), 201


def handle_contact_without_file():
    """Handle contact submission without file attachment."""
    data = request.json
    if not data:
        return jsonify({'success': False, 'error': 'No data provided'}), 400

    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()

    # Validate required fields
    is_valid, error = validate_required_fields(
        {'name': name, 'email': email, 'message': message},
        ['name', 'email', 'message']
    )
    if not is_valid:
        return jsonify({'success': False, 'error': error}), 400

    # Validate email format
    if not validate_email_format(email):
        return jsonify({'success': False, 'error': 'Invalid email format'}), 400

    # Check for duplicate email
    if check_email_exists(email):
        return jsonify({'success': False, 'error': 'A contact with this email already exists'}), 409

    # Create contact record
    contact = {
        'id': str(datetime.now().timestamp()) + '_' + str(hash(email))[:8],
        'name': name,
        'email': email,
        'message': message,
        'attachment': None,
        'created_at': datetime.now().isoformat()
    }

    contacts = get_contacts_store()
    contacts.append(contact)
    current_app.logger.info(f"Contact created with ID: {contact['id']}")

    return jsonify({'success': True, 'data': contact}), 201


@contacts_bp.route('', methods=['GET'])
def get_contacts():
    """
    Get all contacts.

    Returns:
        JSON response with list of all contacts
    """
    contacts = get_contacts_store()
    return jsonify(contacts)


@contacts_bp.route('/search', methods=['GET'])
def search_contacts():
    """
    Search contacts by query string with optional field filtering and sorting.

    Query Parameters:
        q: search term (required)
        field: search field (name|email|message|all, default: all)
        sort: sort field (created_at|name|email, default: created_at)
        order: sort order (asc|desc, default: desc)

    Returns:
        JSON response with search results
    """
    try:
        query = request.args.get('q', '').strip()
        field = request.args.get('field', 'all').lower()
        sort_field = request.args.get('sort', 'created_at').lower()
        order = request.args.get('order', 'desc').lower()

        # Validate parameters
        if not query:
            return jsonify({'success': False, 'error': 'Search query is required'}), 400

        valid_fields = ['name', 'email', 'message', 'all']
        if field not in valid_fields:
            return jsonify({'success': False, 'error': f'Invalid field. Must be one of: {", ".join(valid_fields)}'}), 400

        valid_sort_fields = ['created_at', 'name', 'email']
        if sort_field not in valid_sort_fields:
            return jsonify({'success': False, 'error': f'Invalid sort field. Must be one of: {", ".join(valid_sort_fields)}'}), 400

        if order not in ['asc', 'desc']:
            return jsonify({'success': False, 'error': 'Invalid order. Must be asc or desc'}), 400

        # Sanitize search query
        query = query.lower()

        # Filter contacts
        contacts = get_contacts_store()
        filtered_contacts = []

        for contact in contacts:
            if field == 'all':
                if (query in contact.get('name', '').lower() or
                    query in contact.get('email', '').lower() or
                        query in contact.get('message', '').lower()):
                    filtered_contacts.append(contact)
            else:
                if query in contact.get(field, '').lower():
                    filtered_contacts.append(contact)

        # Sort results
        reverse_order = (order == 'desc')
        if sort_field == 'created_at':
            filtered_contacts.sort(
                key=lambda x: datetime.fromisoformat(
                    x.get(sort_field, '').replace('Z', '+00:00')),
                reverse=reverse_order
            )
        else:
            filtered_contacts.sort(
                key=lambda x: x.get(sort_field, '').lower(),
                reverse=reverse_order
            )

        current_app.logger.info(
            f"Search performed: query='{query}', field='{field}', results={len(filtered_contacts)}"
        )

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
        current_app.logger.error(f"Error in search_contacts: {str(e)}")
        return jsonify({'success': False, 'error': 'Internal server error during search'}), 500
