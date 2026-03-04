"""Validation utilities for contact form."""
import re
from typing import Any


def validate_email_format(email: str) -> bool:
    """
    Validate email format using regex pattern.

    Args:
        email: Email address to validate

    Returns:
        True if email format is valid, False otherwise
    """
    if not email:
        return False
    pattern = r'^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$'
    return re.match(pattern, email) is not None


def validate_required_fields(data: dict, required_fields: list) -> tuple:
    """
    Validate that required fields are present and not empty.

    Args:
        data: Dictionary containing form data
        required_fields: List of required field names

    Returns:
        Tuple of (is_valid, error_message)
        If valid, error_message will be None
    """
    for field in required_fields:
        value = data.get(field, '').strip() if isinstance(data.get(field), str) else data.get(field)
        if not value:
            return False, f"{field.capitalize()} is required"
    return True, None


def validate_file_extension(filename: str, allowed_extensions: set) -> bool:
    """
    Check if file extension is allowed.

    Args:
        filename: Name of the file
        allowed_extensions: Set of allowed extensions

    Returns:
        True if extension is allowed, False otherwise
    """
    if not filename or '.' not in filename:
        return False
    extension = filename.rsplit('.', 1)[1].lower()
    return extension in allowed_extensions


def validate_file_size(content_length: int, max_size: int) -> bool:
    """
    Check if file size is within the limit.

    Args:
        content_length: Size of the file in bytes
        max_size: Maximum allowed size in bytes

    Returns:
        True if size is within limit, False otherwise
    """
    if content_length is None:
        return True  # If content length is unknown, allow it
    return content_length <= max_size
