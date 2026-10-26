from flask import Blueprint, request
from .helpers import find_all_info, store_data

import io
from flask import Flask, render_template_string, request, send_file
from PIL import Image
from rembg import new_session, remove

main = Blueprint('main', __name__)

@main.route('/api/date/<date>', methods=['GET'])
def date_info(date):
    return find_all_info(date)

@main.route('/api/store', methods=['POST'])
def save_data():
    data = request.data.decode('utf-8')
    store_data(data)
    return {'success': True}


# Pre-initialize lightweight model ONCE on app startup
session = new_session("u2netp")

HTML_PAGE = """
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Background Remover</title>
  <style>
    body { font-family: sans-serif; max-width: 500px; margin: 50px auto; text-align: center; }
    form { border: 2px dashed #ccc; padding: 20px; border-radius: 8px; }
    input[type=file] { margin-bottom: 15px; }
    input[type=submit] { padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Remove Image Background</h1>
  <!-- Form points explicitly to /hi -->
  <form method="POST" action="/hi" enctype="multipart/form-data">
    <input type="file" name="file" accept="image/*" required><br>
    <input type="submit" value="Upload & Remove Background">
  </form>
</body>
</html>
"""

@main.route("/hi", methods=["GET", "POST"])
def remove_bg():
    # 1. When opening the browser, show the web page form
    if request.method == "GET":
        return render_template_string(HTML_PAGE)

    # 2. When submitting the form, process the uploaded image
    file = request.files.get("file")
    if file:
        input_image = Image.open(file.stream)

        # Limit image resolution to keep processing fast & low-RAM
        input_image.thumbnail((1500, 1500))

        output_image = remove(input_image, session=session)

        img_io = io.BytesIO()
        output_image.save(img_io, format="PNG")
        img_io.seek(0)

        # Triggers a direct download of the processed transparent PNG
        return send_file(
            img_io, mimetype="image/png", as_attachment=True, download_name="no_bg.png"
        )