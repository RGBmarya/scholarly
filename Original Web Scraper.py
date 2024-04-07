import requests
from bs4 import BeautifulSoup
url = 'https://ar5iv.labs.arxiv.org/html/2304.01852'
response = requests.get(url)
if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    print(soup.prettify())
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")

