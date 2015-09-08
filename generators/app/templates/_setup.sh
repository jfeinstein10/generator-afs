#! /bin/bash

PROJECT_NAME="<%= projectName %>"
bower install
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
migrate create ./migrate $PROJECT_NAME