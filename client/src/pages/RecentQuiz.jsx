import React, { useEffect } from 'react'
import { useState } from 'react'
import { apiStatus } from '../assets/static'
import { api } from '../assets/api'
import { Link, data } from 'react-router-dom'

const RecentQuiz = () => {
    const [apiState, setApiState] = useState(apiStatus.init)
    const [recentQuiz, setRecentQuiz] = useState([])

    const getRecentQuiz = async () => {
        try {
            setApiState(apiStatus.loading)
            const res = await api.get("/api/get-quiz-history")
            console.log(res.data)
            setRecentQuiz(res.data.quiz_history)
            setApiState(apiStatus.success)
        } catch (err) {
            setApiState(apiStatus.fail)
            console.log(err)
        }
    }
    useEffect(() => {
        getRecentQuiz()
    }, [])

    switch (apiState) {
        case apiStatus.loading:
            return <div className='h-screen flex justify-center items-center'><p>loading .....</p></div>
        case apiStatus.success:
            return (
                <div>
                    {recentQuiz?.map(quiz => <Link to={`/quiz-game?url=${quiz.url}`} className='bg-white p-2 rounded-md shadow-lg' >
                        <p>title :{quiz.title}</p>
                        <p>{quiz.summary}</p>
                        <a href={quiz.url}>{quiz.url}</a>
                    </Link>)}
                </div>
            )

        default:
            return <>not found</>
    }


}

export default RecentQuiz