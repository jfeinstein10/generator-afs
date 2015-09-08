import os

from flask import Flask, render_template, send_file
from flask.ext.assets import Environment


app = Flask(__name__)
assets = Environment(app)
assets.debug = True
assets.auto_build = True
assets.from_yaml(os.path.join(app.static_folder, 'bundles.yaml'))
assets.config['STATIC_FOLDER'] = app.static_folder
assets.config['STATIC_URL_PATH'] = app.static_url_path
app.secret_key = 'REPLACE THIS AND KEEP IT SECRET'

@app.errorhandler(404)
def not_found(error):
    return '404 not found'

@app.errorhandler(500)
def internal_error(error):
    return '500 internal error'

@app.route('/static/<path:path>', methods=['GET'])
def static_files(path):
    return send_file('static/{0}'.format(path))

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')
