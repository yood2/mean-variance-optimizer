Technologies:

-   FastAPI
-   Python
-   Numpy
-   Pandas
-   SciPy
-   yFinance

Stateless API for calculating expected return, volatility, optimized weights for
portfolio.

Creating lambda artifact zip:

1. pip3 install -t dependencies -r requirements.txt
2. (cd dependencies; zip ../aws_lambda_artifact.zip -r .)
3. zip aws_lambda_artifact.zip -u main.py
