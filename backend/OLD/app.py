from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from hermes import ModernPortfolio

app = Flask(__name__)
CORS(app)
api = Api(app)

class PortfolioResource(Resource):
    def get(self):
        tickers = request.args.get('tickers')
        start_date = request.args.get('start_date', '2018-01-01')
        end_date = request.args.get('end_date', '2024-01-01')

        if not tickers:
            return {'message': 'No tickers provided'}, 400
        
        tickers_list = tickers.split(',')

        try:
            portfolio = ModernPortfolio(tickers_list, start_date, end_date)
            optimal_weights = portfolio.optimize_portfolio()
            return jsonify({'optimal_weights': optimal_weights})
        
        except Exception as e:
            return {'message': str(e)}, 500
        
class CalculateResource(Resource):
    def post(self):
        data = request.get_json() 

        if not data or 'portfolio' not in data:
            return {'message': 'No portfolio provided'}, 400

        portfolio = data.get('portfolio')
        start_date = data.get('start_date', '2018-01-01')
        end_date = data.get('end_date', '2024-01-01')

        if not isinstance(portfolio, dict):
            return {'message': 'Portfolio must be a dictionary of ticker weights'}, 400

        try:
            tickers_list = list(portfolio.keys())

            model = ModernPortfolio(tickers_list, start_date, end_date)
            portfolio_return, std, sharpe = model.calculate_metrics_from_dict(portfolio)
            return jsonify({'return': portfolio_return, 'std': std, 'sharpe': sharpe})
        
        except Exception as e:
            return {'message': str(e)}, 500

api.add_resource(PortfolioResource, '/portfolio')
api.add_resource(CalculateResource, '/calculate')

if __name__ == '__main__':
    app.run(debug=True)