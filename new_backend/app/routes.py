from flask import Blueprint, request
from .helpers import find_all_info, store_data

main = Blueprint('main', __name__)

@main.route('/api/date/<date>', methods=['GET'])
def date_info(date):
    return find_all_info(date)

@main.route('/api/store', methods=['POST'])
def save_data():
    data = request.data.decode('utf-8')
    store_data(data)
    return {'success': True}
