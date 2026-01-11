import psycopg2
import json
import os


class Db:
    connection = None
    cursor = None

    def __init__(self):
        self.connection = psycopg2.connect(os.getenv("DATABASE_URL"))
        self.cursor = self.connection.cursor()

        print("database connected")

        create_quiz_table = '''
        CREATE TABLE IF NOT EXISTS quiz_table (
            id SERIAL PRIMARY KEY,
            url TEXT NOT NULL,
            title VARCHAR(255) NOT NULL,
            summary TEXT
        );
        '''
        self.cursor.execute(create_quiz_table)

        create_peope_table = '''
        CREATE TABLE IF NOT EXISTS people (
            id INT REFERENCES quiz_table(id) ON DELETE CASCADE,
            name TEXT NOT NULL
         );
        '''
        self.cursor.execute(create_peope_table)
        
        create_organization_table = '''
        CREATE TABLE IF NOT EXISTS organization (
            id INT REFERENCES quiz_table(id) ON DELETE CASCADE,
            name TEXT NOT NULL
         );
        '''
        self.cursor.execute(create_organization_table)

        create_location_table = '''
        CREATE TABLE IF NOT EXISTS location (
            id INT REFERENCES quiz_table(id) ON DELETE CASCADE,
            name TEXT NOT NULL
         );
        '''
        self.cursor.execute(create_location_table)

        create_section_table = '''
        CREATE TABLE IF NOT EXISTS section (
            id INT REFERENCES quiz_table(id) ON DELETE CASCADE,
            name TEXT NOT NULL
         );
        '''
        self.cursor.execute(create_section_table)

        create_question_table = '''
        CREATE TABLE IF NOT EXISTS question (
            id SERIAL PRIMARY KEY,
            qid INT REFERENCES quiz_table(id) ON DELETE CASCADE,
            question VARCHAR(255) NOT NULL,
            answer VARCHAR(255) NOT NULL,
            difficulty TEXT NOT NULL,
            explanation TEXT NOT NULL
        );
        '''
        self.cursor.execute(create_question_table)


        create_option_table = """
        CREATE TABLE IF NOT EXISTS option (
            id INT REFERENCES question(id) ON DELETE CASCADE,
            option text NOT NULL
        );
        """
        self.cursor.execute(create_option_table)


        create_quiz_recent = '''
        CREATE TABLE IF NOT EXISTS  quiz_history(
            id SERIAL PRIMARY KEY,
            data json not null
        );
        '''
        self.cursor.execute(create_quiz_recent)

        self.connection.commit()
        print("database initalized")

    def insert_quiz_data_in_database(self, data):
        self.cursor.execute("""INSERT INTO quiz_history (url, data) VALUES (%s, %s)""", (data['url'], json.dumps(data)))
        self.connection.commit()
        return data

        # try:
        #     # Insert main quiz data
        #     quiz_query = """
        #         INSERT INTO quiz_table (url, title, summary) 
        #         VALUES (%s, %s, %s) RETURNING id;
        #     """
        #     self.cursor.execute(quiz_query, (data["url"], data["title"], data['summary']))
        #     quiz_id = self.cursor.fetchone()[0]
            
        #     # Insert people
        #     if "key_entities" in data and "people" in data["key_entities"]:
        #         for person in data["key_entities"]["people"]:
        #             people_query = "INSERT INTO people (id, name) VALUES (%s, %s);"
        #             self.cursor.execute(people_query, (quiz_id, person))
            
        #     # Insert organizations
        #     if "key_entities" in data and "organizations" in data["key_entities"]:
        #         for org in data["key_entities"]["organizations"]:
        #             org_query = "INSERT INTO organization (id, name) VALUES (%s, %s);"
        #             self.cursor.execute(org_query, (quiz_id, org))
            
        #     # Insert locations
        #     if "key_entities" in data and "locations" in data["key_entities"]:
        #         for location in data["key_entities"]["locations"]:
        #             location_query = "INSERT INTO location (id, name) VALUES (%s, %s);"
        #             self.cursor.execute(location_query, (quiz_id, location))
            
        #     # Insert sections
        #     if "sections" in data:
        #         for section in data["sections"]:
        #             section_query = "INSERT INTO section (id, name) VALUES (%s, %s);"
        #             self.cursor.execute(section_query, (quiz_id, section))
            
        #     # Insert quiz questions and options
        #     if "quiz" in data:
        #         for quiz_item in data["quiz"]:
        #             question_query = """
        #                 INSERT INTO question (qid, question, answer, difficulty, explanation) 
        #                 VALUES (%s, %s, %s, %s, %s) RETURNING id;
        #             """
        #             self.cursor.execute(question_query, (
        #                 quiz_id,
        #                 quiz_item["question"],
        #                 quiz_item["answer"],
        #                 quiz_item["difficulty"],
        #                 quiz_item["explanation"]
        #             ))
        #             question_id = self.cursor.fetchone()[0]
                    
        #             # Insert options for this question
        #             if "options" in quiz_item:
        #                 for option in quiz_item["options"]:
        #                     option_query = "INSERT INTO option (id, option) VALUES (%s, %s);"
        #                     self.cursor.execute(option_query, (question_id, option))
            
        #     self.connection.commit()
        #     print(f"Quiz data inserted successfully with ID: {quiz_id}")
        #     return quiz_id
            
        # except Exception as e:
        #     self.connection.rollback()
        #     print(f"Error inserting data: {e}")
        #     raise


    def __del__(self):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()

        print("database connection closed")

        