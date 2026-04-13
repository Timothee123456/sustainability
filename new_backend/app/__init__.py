from flask import Flask
from flask_cors import CORS
from config import config
import os

def create_app(config_name):
    # Flask serves React automatically from static/
    app = Flask(__name__, 
                static_folder=os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "static"),
                static_url_path="")
    
    CORS(app)
    app.config.from_object(config[config_name])

    # Your API blueprint
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # Single catch-all for React Router
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_react(path):
        return app.send_static_file("index.html")

    return app

