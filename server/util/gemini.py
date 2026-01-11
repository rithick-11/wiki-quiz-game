from google import genai
import json
import os

client = genai.Client(api_key=os.getenv("GEMINI_API"))




def generate_quiz_question(scraped_data: dict):
    prompt = """
You are an expert Wikipedia quiz generator. Your task is to analyze the provided scraped Wikipedia data and generate a structured JSON output **EXACTLY** in the following format. Do not add any extra text, explanations, or deviations—output only the valid JSON string within triple quotes.

**Scraped Data:**
{}



**Required Output Format (exactly 10 quiz questions):**

Note: while formating a json data, don't include any qoute within qoute('', "") example => "data 'needed' for this" X

json
{{
  "url": "url",
  "title": "EXAMPLE TITLE",
  "summary": "A concise 1-2 sentence summary of the topic based on the scraped data.",
  "key_entities": {{
    "people": ["List relevant people from infobox, paragraphs, or lists"],
    "organizations": ["List relevant organizations"],
    "locations": ["List relevant locations"]
  }},
  "sections": ["Infer 3-6 main sections/topics from infobox keys, paragraphs, and lists, e.g., 'Early life', 'Career', 'Legacy'"],
  "quiz": [
    {{
      "question": "Clear, factual multiple-choice question based on the data",
      "options": [
        "Distractor 1",
        "Distractor 2",
        "Correct answer",
        "Distractor 3"
      ],
      "answer": "The exact correct option text",
      "difficulty": "easy|medium|hard",
      "explanation": "Brief explanation citing source like 'From infobox: Born', 'Paragraph 1', or inferred section."
    }}
    // Exactly 9 more similar objects, total 10. Vary difficulty: ~4 easy, ~4 medium, ~2 hard. Questions from infobox (4-5), paragraphs (3-4), lists (1-2). 4 options each, 1 correct. Plausible distractors.
  ],
  "related_topics": ["5-8 relevant topics/terms from content, e.g., 'Cryptography', 'Enigma machine'"]
    }}""".format(scraped_data)
    
    response = client.models.generate_content(
        model="gemini-2.5-flash-lite", 
        contents=prompt
    ).text.strip("```").strip('json').strip()
    
    
    
    return json.loads(response)
    

    