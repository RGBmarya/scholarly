import re
import streamlit as st
from streamlit_pdf_viewer import pdf_viewer
import os
import urllib.request

st.title("Balls. *Tickled.*")
# pdf_viewer("./2201.08821v1.Representing_Long_Range_Context_for_Graph_Neural_Networks_with_Global_Attention.pdf")


fp = urllib.request.urlopen("https://ar5iv.labs.arxiv.org/html/2201.08821")
mybytes = fp.read()

html_string = mybytes.decode("utf8")
fp.close()

# Save the HTML content to a file
with open("output.html", "w") as file:
    file.write(html_string)

st.markdown(html_string, unsafe_allow_html=True)

fp2 = urllib.request.urlopen("https://ar5iv.labs.arxiv.org/html/2201.08821/assets")
# Create a directory to store the downloaded files
os.makedirs("./assets", exist_ok=True)

# Read the HTML content
html_content = fp2.read().decode("utf-8")

# Find all the links to files in the HTML content
file_links = re.findall(r'<a href="(.*?)">', html_content)

# Download each file
for link in file_links:
    # Check if the file is a PNG file
    if link.endswith(".png"):
        # Construct the file URL
        file_url = "https://ar5iv.labs.arxiv.org/html/2201.08821/assets/" + link
        
        # Download the file
        urllib.request.urlretrieve(file_url, f"./assets/{link}")