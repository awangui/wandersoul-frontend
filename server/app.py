from flask import Flask
from flask_migrate import Migrate
from config import Config
from models.models import db, User, Destination 
from flask_cors import CORS
import bcrypt
# from faker import Faker
from flask import request

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)  # Initialize DB before running migrations
migrate = Migrate(app, db)
# Create the tables in the database (if they don't exist)
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Welcome to Wandersoul!"

@app.route('/users')
def get_users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

@app.route('/destinations')
def get_destinations():
    destinations = Destination.query.all()
    return {"destinations": [destination.to_dict() for destination in destinations]}

@app.route('/users/<int:id>')
def get_user(id):
    user = User.query.get(id)
    return user.to_dict()

@app.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()  # Get JSON data from request
        fname = data.get("fname")
        sname = data.get("sname")
        email = data.get("email")
        password = data.get("password")
        role_id = data.get("role_id")
        # Perform validation
        if not data:
            return {"error": "Invalid request, no data provided"}, 400
        # Check if required fields are present
        if not fname or not sname or not email or not password:
            return {"error": "Invalid request, missing required data"}, 400
        # First name and surname length validation
        if len(fname) < 3 or len(sname) < 3:
            return {"error": "First name and surname must be at least 3 characters long each"}, 400
        # First name and surname character validation
        if not fname.isalpha() or not sname.isalpha():
            return {"error": "First name and surname must contain only letters"}, 400
        # Password validation
        if len(password) < 6:
            return {"error": "Password must be at least 6 characters"}, 400
        if password.isalpha() or password.isdigit():
            return {"error": "Password must contain both letters and numbers"}, 400
        #email validation
        if "@" not in email or "." not in email:
            return {"error": "Invalid email"}, 400
   
        # Check if email already exists
        if User.query.filter_by(email=email).first():
            return {"error": "Invalid request, email already exists"}, 400
        # Hash password
        password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

        # Create new user object
        new_user = User(fname=fname, sname=sname, email=email, password=password, role_id=role_id or 1)

        db.session.add(new_user)  # Add new user to database session
        db.session.commit()

        return new_user.to_dict(), 201  # Return user object with success code

    except Exception as e:
        print("Error:", e)  # Debugging
        return {"error": str(e)}, 500

# Login route
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()  # Get JSON data from request
        email = data.get("email")
        password = data.get("password")
        # Perform validation
        if not data:
            return {"error": "Invalid request, no data provided"}, 400
        if not email or not password:
            return {"error": "Invalid request, missing required data"}, 400
        user = User.query.filter_by(email=email).first()
        if not user:
            return {"error": "Invalid email or password"}, 400
        if not bcrypt.checkpw(password.encode(), user.password.encode()):
            return {"error": "Invalid email or password"}, 400
        return user.to_dict()
    except Exception as e:
        print("Error:", e)
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True, port=5555)
