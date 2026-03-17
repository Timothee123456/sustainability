from flask import Blueprint
from .helpers import find_all_info

main = Blueprint('main', __name__)

@main.route('/api/date/<date>', methods=['GET'])
def index(date):
    return find_all_info(date)