"""Contact model module."""
import uuid
from datetime import datetime
from typing import Optional, Dict, Any


class Contact:
    """Contact data model class."""

    def __init__(
        self,
        name: str,
        email: str,
        message: str,
        attachment: Optional[Dict[str, Any]] = None,
        contact_id: Optional[str] = None,
        created_at: Optional[str] = None
    ):
        """
        Initialize a Contact instance.

        Args:
            name: Contact's name
            email: Contact's email address
            message: Contact message
            attachment: Optional file attachment info
            contact_id: Optional contact ID (generated if not provided)
            created_at: Optional creation timestamp (generated if not provided)
        """
        self.id = contact_id or str(uuid.uuid4())
        self.name = name
        self.email = email
        self.message = message
        self.attachment = attachment
        self.created_at = created_at or datetime.now().isoformat()

    def to_dict(self) -> Dict[str, Any]:
        """
        Convert Contact to dictionary.

        Returns:
            Dictionary representation of the contact
        """
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'attachment': self.attachment,
            'created_at': self.created_at
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Contact':
        """
        Create Contact instance from dictionary.

        Args:
            data: Dictionary containing contact data

        Returns:
            Contact instance
        """
        return cls(
            name=data.get('name', ''),
            email=data.get('email', ''),
            message=data.get('message', ''),
            attachment=data.get('attachment'),
            contact_id=data.get('id'),
            created_at=data.get('created_at')
        )

    def __repr__(self) -> str:
        return f"<Contact {self.email}>"
