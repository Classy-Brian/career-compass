# app/routes.py
from flask import Blueprint, jsonify, request
from flask_cors import CORS

from flask_jwt_extended import create_access_token,get_jwt_identity,jwt_required,JWTManager
from app.models.user import User
from app.services.user_service import create_user

api = Blueprint('api', __name__)
CORS(api, origins=["http://localhost:3000", "http://frontend-1:3000"])



@api.route('/signup', methods=['POST'])
def signup():
    if request.method == "POST":
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']

        new_user_obj = create_user(email,password, username)

        #error if email is already used
        if not new_user_obj:
            return jsonify({}), 409 #"Error": "Email already in use"
        else:
            return jsonify({}), 201 #"User created successfully"

    else:
        return jsonify({}),405

    


@api.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        data = request.get_json()
        email_input = data['email']
        password_input = data['password']

        #query db for users based on provided email
        user1 = User.query.filter_by(email=email_input).first()

        #authenticating provided password
        if user1 and user1.check_password(password_input):
            #create & return JWT token here
            access_token = create_access_token(identity = email_input)
            return jsonify(access_token=access_token),201
        else:
            return jsonify({}), 400 #Error: "Invalid credentials"
      
    else:
        return jsonify({}), 405

@api.route('/dashboard-data',methods = ['GET'])
@jwt_required()
def jwt_token_validation():
    if request.method  == "GET":
        user_email = get_jwt_identity()

        user1 = User.query.filter_by(email=user_email).first()
        if user1:
            return jsonify(username = user1.name, email = user1.email)
        else:
            return jsonify({}), 404 #User not found
      
    else:
        return jsonify({}), 405