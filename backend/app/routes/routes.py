# app/routes.py
from flask import Blueprint, jsonify, request
from flask_cors import CORS
from services  import create_user
from app.models.user import User


api = Blueprint('api', __name__)
CORS(api)



@api.route('/signup', methods=['POST'])
def signup():
    if request.method == "POST":
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']

        new_user_obj = create_user(email,password)

        #error if email is already used
        if not new_user_obj:
            return jsonify({"Error": "Email already in use"})
        else:
            return jsonify({"Success": "User created successfully"})

    else:
        return jsonify({"Error":"Only post requests allowed!"})

    


@api.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        data = request.get_json()
        email_input = data['email']
        password_input = data['password']

        #query db for users based on provided email
        user1 = User.query.filter_by(email=email_input)

        #authenticating provided password
        if user1.check_password(password_input):
            #create & return JWT token here
            print()
        else:
            return jsonify({"Error": "Invalid credentials"})
      
    else:
        return jsonify({"Error":"Only post requests allowed!"})
