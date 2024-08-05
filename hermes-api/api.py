from flask import Flask, request
from flask_restful import Resource, Api
from hermes import *

app = Flask(__name__)
api = Api(app)

# A dictionary to store portfolio data
portfolio = {}

class PortfolioResource(Resource):
    def get(self):
        return {'portfolio': portfolio}

    def put(self):
        # Expecting JSON data
        data = request.get_json()
        testConnection()
        if data:
            portfolio.update(data)
            return {'portfolio': portfolio}, 200
        return {'message': 'No data provided'}, 400

# Use a fixed path since we are not using a path variable
api.add_resource(PortfolioResource, '/portfolio')

if __name__ == '__main__':
    app.run(debug=True)
