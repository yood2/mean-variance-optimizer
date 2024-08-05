from hermes import *

############### GLOBAL VARIABLES ######################
symbols = ['NVDA', 'SBUX']
window_start = '2018-01-01'
window_end = '2023-01-01'
data_type = 'Adj Close'
risk_free_Rate = 0.02
#######################################################

expected_return = historical_average_return(fetch(symbols, window_start, window_end, data_type))

