import os

from flask import Flask, render_template, send_file
from flask.ext.assets import Environment

from config import debug, secret


app = Flask(__name__)
app.secret_key = secret
app.debug = debug

assets = Environment(app)
assets.debug = debug
assets.auto_build = True
assets.from_yaml(os.path.join(app.static_folder, 'bundles.yaml'))
assets.config['STATIC_FOLDER'] = app.static_folder
assets.config['STATIC_URL_PATH'] = app.static_url_path

@app.errorhandler(404)
def not_found(error):
    return 'Not found', 404

@app.errorhandler(500)
def internal_error(error):
    return 'Internal error', 500

@app.route('/static/<path:path>', methods=['GET'])
def static_files(path):
    return send_file('static/{0}'.format(path))

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')
