from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from util.helper import scrape_site
from util.gemini import generate_quiz_question
from database.db import Db

app= FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

@app.get("/")
def get_server_health():
    Db()

    return "asdasdasdas"

@app.get("/api/get-quiz")
def get_quiz(url: str):

    print("api called")
    
    db = Db()

    ifExist = db.get_quix_by_url(url) 

    if ifExist:
        return ifExist

    scraped_data = scrape_site(url)
    print("data scriped")
    quiz_data = generate_quiz_question(scraped_data=scraped_data)

   

    id =  db.insert_quiz_data_in_database(quiz_data)
    print(id)
    print("quiz generated")
    return quiz_data


@app.get("/api/get-quiz-history")
def get_quiz_history():
    db = Db()
    return {"quiz_history":db.get_recent_quiz()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)