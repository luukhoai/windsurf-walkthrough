"""Application entry point."""
import os
from app import create_app

# Create app based on environment
config_name = os.environ.get('FLASK_ENV', 'development')
app = create_app(config_name)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
