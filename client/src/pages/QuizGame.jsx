import React, { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { apiStatus } from '../assets/static'
import { api } from '../assets/api'
import QuizSection from '../components/QuizSection'

const QuizGame = () => {

    const [apiState, setApiState] = useState(apiStatus.init)
    const [searchParams] = useSearchParams()
    const [quizData, setQuizData] = useState({})
    const url = searchParams.get("url")

    const { title } = quizData


    if (url === null || !url.includes(".wikipedia.org/wiki")) {
        return <Navigate to="/" />
    }

    const getQuizdata = async () => {
        try {
            setApiState(apiStatus.init)
            setApiState(apiStatus.loading)
            const res = await api(`/api/get-quiz?url=${url}`)
            setApiState(apiStatus.success)
            setQuizData(res.data)
            // console.log(res.data)
        } catch (err) {
            console.log(err)
            setApiState(apiStatus.fail)
        }
    }

    useEffect(() => {
        getQuizdata()
    }, [])

    switch (apiState) {
        case apiStatus.loading:
            return (<div className='h-screen flex items-center justify-center text-xl text-black '>
                <p>loading......</p>
            </div>)

        case apiStatus.success:
            return (
                <section className='pt-3'>
                    <h1 className='text-[1rem] text-black font-semibold'>Wiki Quiz Game</h1>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-12'>
                            <h1>{title}</h1>
                        </div>
                        <QuizSection quiz={quizData.quiz} />
                    </div>
                </section>
            )

        case apiStatus.fail:
            return (<div className='h-screen flex justify-center ite'>
                <h1>sorry failed to start the quiz game</h1>
            </div>)

    }


}

export default QuizGame