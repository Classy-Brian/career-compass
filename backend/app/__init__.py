from flask import Flask
from config import Config
from extensions import db,bcrypt
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from app.routes.routes import api
from flask_cors import CORS
from flask_migrate import Migrate
import os



load_dotenv() #loading env variables from .env file

def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000", "http://frontend-1:3000"])
    app.config.from_object(config_class)
    app.config["JWT_SECRET_KEY"] =  os.getenv("JWT_SECRET_KEY") #jwt secret key config
    jwt = JWTManager(app)
    app.config['JWT_TOKEN_LOCATION'] = ["headers"] #flask server will look in headers for jwt token
    app.register_blueprint(api,url_prefix='/api')

    # Initialize extensions with the app
    db.init_app(app)
    Migrate(app, db)
    bcrypt.init_app(app)

    return app