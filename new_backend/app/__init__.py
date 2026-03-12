from flask import Flask
from flask_cors import CORS
from config import config

def create_app(config_name):
    app = Flask(__name__)
    CORS(app) # Add this to allow all origins
    app.config.from_object(config[config_name])

    # Register blueprints here to avoid circular imports
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app