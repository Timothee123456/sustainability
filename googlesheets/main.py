import json

import gspread
from google.oauth2.service_account import Credentials

scopes = ['https://www.googleapis.com/auth/spreadsheets']

creds = Credentials.from_service_account_file('group2.json', scopes=scopes)
client = gspread.authorize(creds)

sheet = client.open_by_url('https://docs.google.com/spreadsheets/d/1VlOpnuUkrDvq0LD0SgQGq1X9IPv0E8xh-Oq8lrXaQ_I/')

datasheet = sheet.worksheet("Data")
cleanedsheet = sheet.worksheet("Ingredients")
imglinksheet = sheet.worksheet("Ingredients_images_links")

first_cell_value = datasheet.acell('A1').value

"""
[
    {
        'name': 'Pork',
        'type': 'Dish A',
        'img_link': 'https://www.lovefoodhatewaste.com/sites/default/files/styles/16_9_two_column/public/2022-08/Pork-sh1419942758.jpg.webp?itok=_Ow0IXe6'
    },
    {
        'name': 'Eggplant',
        'type': 'Dish B',
        'img_link': 'https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/eggplant.jpg.webp?itok=k6_74IzB'
    },
    {
        'name': 'Cabbage',
        'type': 'Vegetables',
        'img_link': 'https://greengarden.ph/cdn/shop/products/LINE_ALBUM_PICTURE_230412_85.jpg?v=1681290016'
    },
    {
        'name': 'Rice',
        'type': 'Starch',
        'img_link': 'https://healthynibblesandbits.com/wp-content/uploads/2018/10/Jasmine-Rice-FF.jpg'
    },
    {
        'name': 'Sponge cake',
        'type': 'Dessert',
        'img_link': 'https://www.laserbiscuit.com/wp-content/uploads/2021/03/sponge-cake-stuck.jpg'
    }
];
"""

def find_date(date):
    cell = datasheet.find(date)
    if cell:
        return cell.row
    else:
        return None

def return_info(type, row_number, column_number):
    full_name = datasheet.cell(row_number, column_number).value
    cleaned_name = cleanedsheet.cell(row_number, column_number).value
    location_name = imglinksheet.find(cleaned_name)
    if location_name:
        img_link = imglinksheet.cell(location_name.row, location_name.col + 1).value
    else:
        img_link = False

    component_name = full_name if cleaned_name != "salad bar" else False if type == "Appetizer" else full_name
    component_name = component_name.replace('\n', '')
    component = { 
        'name': component_name,
        'type': type,
        'img_link': img_link
    }

    return component



def find_all_info(date):
    return_list = []
    row_number = find_date(date)
    
    if row_number:
        appetizer = return_info("Appetizer", row_number, 2)
        dishA = return_info("Dish A", row_number, 3)
        dishB = return_info("Dish B", row_number, 4)
        vegetables = return_info("Vegetables", row_number, 5)
        starch = return_info("Starch", row_number, 6)
        dessert = return_info("Dessert", row_number, 8)

    return_list = [appetizer, dishA, dishB, vegetables, starch, dessert]

    return json.dumps(return_list, indent=4)
    


date_to_find = "Wednesday 18 Mar"
print(find_all_info(date_to_find))
