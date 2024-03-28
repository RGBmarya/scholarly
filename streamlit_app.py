import streamlit as st
from streamlit_pdf_viewer import pdf_viewer
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