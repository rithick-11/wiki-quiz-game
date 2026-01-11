from fastapi import FastAPI
from util.helper import scrape_site
from util.gemini import generate_quiz_question
from database.db import Db

app= FastAPI()

@app.get("/")
def get_server_health():
    Db()

    return "asdasdasdas"

@app.get("/api/get-quiz")
def get_quiz(url: str):
    print("api called")
    scraped_data = scrape_site(url)
    print("data scriped")
    quiz_data = generate_quiz_question(scraped_data=scraped_data)

    db = Db()

    id =  db.insert_quiz_data_in_database(quiz_data)
    print(id)
    print("quiz generated")
    return quiz_data