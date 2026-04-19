import json
import os
import sys

import gspread
from google.oauth2.service_account import Credentials

scopes = ['https://www.googleapis.com/auth/spreadsheets']

# Use env var if set, otherwise use the hardcoded path
base_path = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(base_path, "group2.json")

json_str = os.getenv("GOOGLE_CREDENTIALS_JSON")

if json_str:
    # Load from env (JSON string)
    try:
        creds = Credentials.from_service_account_info(json.loads(json_str), scopes=scopes)
    except Exception as e:
        print("ERROR: Failed to load Google credentials from GOOGLE_CREDENTIALS_JSON:", e)
        sys.exit(1)
else:
    # Load from file
    try:
        creds = Credentials.from_service_account_file(config_path, scopes=scopes)
    except FileNotFoundError:
        print("ERROR: Google service account file not found at:", config_path)
        print("Please place the JSON file there and restart the server.")
        sys.exit(1)
    except Exception as e:
        print("ERROR: Failed to load Google credentials from file:", e)
        sys.exit(1)

client = gspread.authorize(creds)

sheet = client.open_by_url('https://docs.google.com/spreadsheets/d/1VlOpnuUkrDvq0LD0SgQGq1X9IPv0E8xh-Oq8lrXaQ_I/')

datasheet = sheet.worksheet("Data")
cleanedsheet = sheet.worksheet("Ingredients")
imglinksheet = sheet.worksheet("Ingredients_images_links")

first_cell_value = datasheet.acell('A1').value

def find_date(date):
    cell = datasheet.find(date)
    if cell:
        return cell.row
    else:
        return None

def return_info(type, row_number, column_number):
    full_name = datasheet.cell(row_number, column_number).value
    cleaned_name = cleanedsheet.cell(row_number, column_number).value
    if full_name is None:
        return None
    location_name = imglinksheet.find(cleaned_name)
    if location_name:
        img_link = imglinksheet.cell(location_name.row, location_name.col + 1).value
    else:
        img_link = False

    component_name =  full_name if cleaned_name != "salad bar" else False if type == "Appetizer" else full_name
    if isinstance(component_name, str):
        component_name = component_name.replace('\\n', '') if component_name is not bool else component_name
    component = {
        'name': component_name,
        'type': type,
        'img_link': img_link
    }

    return component



def find_all_info(date):
    row_number = find_date(date)

    if row_number:
        # appetizer = return_info("Appetizer", row_number, 2)
        dishA = return_info("Dish A", row_number, 3)
        dishB = return_info("Dish B", row_number, 4)
        vegetables = return_info("Vegetables", row_number, 5)
        starch = return_info("Starch", row_number, 6)
        dessert = return_info("Dessert", row_number, 8)
        return_data = [dishA, dishB, vegetables, starch, dessert]

        if any(item is None for item in return_data):
            return_data = False
    else:
        return_data = False


    return json.dumps(return_data, indent=4)


#######################################################################

store_sheet_url = os.getenv('GOOGLE_SHEET_URL')
if store_sheet_url:
    store_sheet = client.open_by_url(store_sheet_url)
else:
    # Fallback to production sheet
    store_sheet = client.open_by_url('https://docs.google.com/spreadsheets/d/18PKyGEufH3nxx-YLQ1vNPgIE7TX8EQAl20VobDY6_KQ/')
store_datasheet = store_sheet.worksheet("Data")
def store_data(data):
    # Assumes data is a string or simple value to store in first column (A)
    # Finds the next available row by checking column A
    col_a = store_datasheet.col_values(1)
    next_row = len(col_a) + 1
    store_datasheet.update_acell(f'A{next_row}', data)
