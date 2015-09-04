import flask
from flask_login import LoginManager

from app import app
from models.models import User


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = ''
login_manager.session_protection = 'strong'

@login_manager.user_loader
def load_user(self, user_id):
    pass

@app.route('/login', methods=['GET'])
def login():
    return flask.jsonify({})

@app.route('/logout', methods=['GET'])
def logout():
    return flask.jsonify({})
