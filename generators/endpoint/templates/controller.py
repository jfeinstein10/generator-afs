from app import app
from models import *


class <%= controllerName %>(object):
    <% endpoints.forEach(function(endpoint){ %>
    @app.route('<%= endpoint.url %>', methods=<%= JSON.stringify(endpoint.methods) %>)
    def <%= endpoint.functionName %>():
        # TODO
        pass
    <% }); %>
