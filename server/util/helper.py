import requests
from bs4 import BeautifulSoup


def scrape_site(url: str):
    headers = {
    'User-Agent': 'MyEducationalScraper/1.0 (contact: myemail@example.com)'
    }  
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    site_scrap_data = {"title" : soup.find(id="firstHeading").text}
    
    soup = soup.find(id="bodyContent")
    
    site_table = soup.find("table", {"class":"infobox"})
    if site_table:
        rows = site_table.find_all("tr")
        for row in rows:
            header = row.find("th")
            data = row.find("td")
            if header and data:
                site_scrap_data[header.text.strip()] = data.text.strip()    
                
    site_paragraphs = soup.find_all("p")
    paragraphs_text = []
    for paragraph in site_paragraphs[:4]:
        paragraphs_text.append(paragraph.text.strip())
    site_scrap_data["paragraphs"] = paragraphs_text
    
    site_unordered_lists = soup.find_all("ul")
    ul_texts = []
    for ul in site_unordered_lists:
        ul_texts.append(ul.text.strip())
    site_scrap_data["unordered_lists"] = ul_texts
    
    return {
        "url": url,
        "data": site_scrap_data
    }