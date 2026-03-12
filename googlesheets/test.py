print("Hello, GitHub Codespaces!")

import requests
response = requests.get("https://www.example.com")
print(f"Status code: {response.status_code}")