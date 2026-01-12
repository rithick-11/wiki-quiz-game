import axios from "axios"


export const api = axios.create({
    baseURL: "https://wiki-quiz-game-api.vercel.app",
    headers: {
      'Content-Type': 'application/json',
    },
});


