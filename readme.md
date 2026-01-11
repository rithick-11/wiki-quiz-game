# Wiki Quiz Game 🎮📚

An interactive quiz game that generates questions from Wikipedia articles, featuring a full-stack architecture with a Python backend and JavaScript frontend.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Wiki Quiz Game is a knowledge-testing application that dynamically generates quiz questions based on Wikipedia content. The application fetches information from Wikipedia articles and presents them in an engaging quiz format, allowing users to test their knowledge across various topics.

## ✨ Features

- **Dynamic Question Generation**: Automatically generates quiz questions from Wikipedia articles
- **Multiple Topics**: Support for various categories and topics
- **Real-time Scoring**: Instant feedback and score tracking
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean UI**: User-friendly interface for an engaging quiz experience
- **RESTful API**: Well-structured backend API for quiz management

## 🛠️ Tech Stack

### Backend (Server)
- **Python**: Core backend language
- **Flask/FastAPI**: Web framework (assumed based on typical Python backend)
- **Wikipedia API**: For fetching article content
- **JSON**: Data exchange format

### Frontend (Client)
- **JavaScript**: Core frontend language
- **HTML5**: Markup structure
- **CSS3**: Styling and responsive design
- **Fetch API**: For making HTTP requests to backend

## 📁 Project Structure

```
wiki-quiz-game/
├── client/                 # Frontend application
│   ├── index.html         # Main HTML file
│   ├── css/               # Stylesheets
│   │   └── style.css      # Main stylesheet
│   ├── js/                # JavaScript files
│   │   ├── app.js         # Main application logic
│   │   ├── quiz.js        # Quiz logic
│   │   └── api.js         # API communication
│   └── assets/            # Images and other assets
│
├── server/                # Backend application
│   ├── app.py            # Main application file
│   ├── routes/           # API routes
│   ├── models/           # Data models
│   ├── utils/            # Utility functions
│   │   └── wikipedia.py  # Wikipedia API integration
│   ├── config.py         # Configuration settings
│   └── requirements.txt  # Python dependencies
│
└── README.md             # Project documentation
```

## 🚀 Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Node.js (optional, for frontend tooling)
- Modern web browser

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/rithick-11/wiki-quiz-game.git
cd wiki-quiz-game
```

2. Navigate to the server directory:
```bash
cd server
```

3. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Configure environment variables (create a `.env` file):
```env
FLASK_APP=app.py
FLASK_ENV=development
PORT=5000
```

6. Run the server:
```bash
python app.py
```

The server should now be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd ../client
```

2. Open `index.html` in your browser, or use a local server:
```bash
# Using Python's built-in server
python -m http.server 8000

# Or using Node's http-server (if installed)
npx http-server -p 8000
```

3. Access the application at `http://localhost:8000`

## 💻 Usage

### Starting a Quiz

1. Open the application in your browser
2. Select a topic or category from the available options
3. Choose the difficulty level (if applicable)
4. Click "Start Quiz" to begin

### Playing the Game

1. Read each question carefully
2. Select your answer from the multiple-choice options
3. Click "Submit" or "Next" to proceed
4. View your score at the end of the quiz
5. Review correct answers and explanations

### API Endpoints

The backend provides the following endpoints:

- `GET /api/topics` - Retrieve available quiz topics
- `GET /api/quiz/:topic` - Get quiz questions for a specific topic
- `POST /api/quiz/submit` - Submit quiz answers and get score
- `GET /api/leaderboard` - Get top scores (if implemented)

## 🔧 Configuration

### Backend Configuration

Edit `server/config.py` to customize:

```python
class Config:
    # Server settings
    HOST = '0.0.0.0'
    PORT = 5000
    DEBUG = True
    
    # Quiz settings
    QUESTIONS_PER_QUIZ = 10
    TIME_LIMIT = 300  # seconds
    
    # Wikipedia API settings
    WIKI_LANGUAGE = 'en'
    MAX_SUMMARY_LENGTH = 500
```

### Frontend Configuration

Edit `client/js/config.js`:

```javascript
const config = {
    apiBaseUrl: 'http://localhost:5000/api',
    questionsPerQuiz: 10,
    timeLimit: 300,
    enableTimer: true
};
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

### Development Guidelines

- Follow PEP 8 style guide for Python code
- Use ESLint for JavaScript code formatting
- Write descriptive commit messages
- Add comments for complex logic
- Update documentation for new features

## 📝 API Documentation

### Get Quiz Questions

**Endpoint**: `GET /api/quiz/:topic`

**Parameters**:
- `topic` (string): The Wikipedia topic/category
- `difficulty` (optional): easy, medium, hard

**Response**:
```json
{
    "questions": [
        {
            "id": 1,
            "question": "What is the capital of France?",
            "options": ["London", "Berlin", "Paris", "Madrid"],
            "correctAnswer": 2
        }
    ],
    "topic": "Geography",
    "totalQuestions": 10
}
```

### Submit Quiz Answers

**Endpoint**: `POST /api/quiz/submit`

**Request Body**:
```json
{
    "quizId": "abc123",
    "answers": [0, 2, 1, 3, 2, 1, 0, 3, 2, 1]
}
```

**Response**:
```json
{
    "score": 8,
    "totalQuestions": 10,
    "percentage": 80,
    "correctAnswers": [0, 2, 1, 3, 2, 1, 0, 3, 2, 1],
    "results": [...]
}
```

## 🐛 Troubleshooting

### Common Issues

**Server won't start**:
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check if port 5000 is available
- Verify Python version compatibility

**CORS errors**:
- Enable CORS in the backend configuration
- Check that the frontend is making requests to the correct API URL

**Questions not loading**:
- Verify internet connection (required for Wikipedia API)
- Check API endpoint configuration
- Review browser console for error messages

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Rithick**
- GitHub: [@rithick-11](https://github.com/rithick-11)

## 🙏 Acknowledgments

- Wikipedia API for providing article content
- Open source community for inspiration and tools
- Contributors and testers

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Persistent leaderboard with database
- [ ] Multiple language support
- [ ] Custom quiz creation
- [ ] Social sharing features
- [ ] Progressive Web App (PWA) support
- [ ] Mobile app versions
- [ ] Advanced statistics and analytics

---

**Note**: For detailed information about specific components, please refer to the inline code documentation in the respective directories.

For questions or support, please open an issue on GitHub.