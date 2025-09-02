from extensions import db
from app.models.user import User

def create_user(email, password, name):
    """
    Creates a new user and adds them to the database.
    """

    # Checks if a user with this email already exists 
    if User.query.filter_by(email=email).first():
        return None
    
    new_user = User(email=email,name = name)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return new_user
