from flask import Flask
from flask_migrate import Migrate
from config import Config
from models.models import db, User, Destination 
from flask_cors import CORS
# from faker import Faker
from flask import request
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)  # Initialize DB before running migrations
migrate = Migrate(app, db)

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
        if not data:
            return {"error": "Invalid request, no data provided"}, 400

        user = User(
            name=data["name"],
            email=data["email"],
            password=data["password"],  # ⚠️ Hash passwords in real apps
            role_id=data.get("role_id", 1)  # Default role_id to 1 if not provided
        )

        db.session.add(user)
        db.session.commit()

        return user.to_dict(), 201  # Return user object with success code

    except Exception as e:
        print("Error:", e)  # Debugging
        return {"error": str(e)}, 500
if __name__ == '__main__':
    app.run(debug=True, port=5555)
