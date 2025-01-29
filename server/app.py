from flask import Flask
from flask_migrate import Migrate
from config import Config
from models.models import db, User, Role, Destination  # Explicitly import models

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)  # Initialize DB before running migrations
migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run(debug=True)
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