"""Flask application factory module."""
import os
from flask import Flask
from flask_cors import CORS

from .config import config_by_name


def create_app(config_name: str = None) -> Flask:
    """
    Create and configure the Flask application.

    Args:
        config_name: Configuration name (development, testing, production).
                    Defaults to environment variable FLASK_ENV or 'development'.

    Returns:
        Configured Flask application instance
    """
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')

    app = Flask(__name__)

    # Load configuration
    config_class = config_by_name.get(config_name, config_by_name['default'])
    app.config.from_object(config_class)

    # Initialize CORS
    CORS(app)

    # Initialize contacts store
    app.config['CONTACTS_STORE'] = []

    # Ensure upload folder exists
    upload_folder = app.config.get('UPLOAD_FOLDER', 'uploads')
    os.makedirs(upload_folder, exist_ok=True)

    # Register blueprints
    from .routes.contacts import contacts_bp
    app.register_blueprint(contacts_bp)

    return app
