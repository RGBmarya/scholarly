import requests
from bs4 import BeautifulSoup
import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

url = 'https://ar5iv.labs.arxiv.org/html/2304.01852'
response = requests.get(url)
if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    print(soup.prettify()) 
    if not os.path.exists('images'):
        os.mkdir('images')
    images = soup.find_all('img')
    for i, img in enumerate(images):
        img_url = img['src']
        if not img_url.startswith(('http://', 'https://')):
            img_url = url + img_url  
        img_response = requests.get(img_url)
        if img_response.status_code == 200:
            img_path = f'images/image_{i}.jpg'  
            with open(img_path, 'wb') as img_file:
                img_file.write(img_response.content)
            print(f"Downloaded {img_path}")
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
    
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in background

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)


driver.get('https://ar5iv.labs.arxiv.org/html/2304.01852')


time.sleep(2)  


images = driver.find_elements(By.TAG_NAME, 'img')
for img in images:
    print(img.get_attribute('src'))


driver.quit()


