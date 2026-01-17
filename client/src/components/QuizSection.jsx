import React, { useEffect, useState } from 'react'
import { Link, data } from 'react-router-dom'
import { FcSearch } from "react-icons/fc";

const QuizSection = ({ quiz }) => {

    const [questions, setQuestion] = useState([[]])
    const [current, setCurrent] = useState(0)
    const [state, setState] = useState("quiz")
    const [result, setResult] = useState({ score: 0, answered: 0 })
    const [showExplaination, setShowExplaination] = useState(false)

    useEffect(() => {
        const newQuiz = quiz.map((data) => ({ ...data, isAnswered: false, selectedAns: "" }))
        setQuestion(newQuiz)
    }, [])

    // console.log(questions)

    // const { answer, difficulty, explanation, isAnswered, options, question, selectedAns } = questions[current]

    const onNextQuestion = () => {
        // console.log(current, questions.length)
        if (current >= questions.length - 1) {
            setState("result")
            let score = 0
            let answered_q = 0
            questions?.map(question => {
                if (question.isAnswered) answered_q++;
                if (question.selectedAns === question.answer) score++
            })
            setResult({ score, answered: answered_q })
        }
        setCurrent(pre => pre + 1)
        setShowExplaination(false)
    }

    const onChangeOption = (option) => {
        if (questions[current]?.isAnswered) return
        const new_question = questions?.map((question, i) => {
            if (i == current) {
                return { ...question, isAnswered: true, selectedAns: option }
            } else {
                return question
            }
        })
        console.log(new_question)
        setQuestion(new_question)
        setShowExplaination(false)
    }


    switch (state) {
        case "quiz":
            return (<>
                <div className='col-span-12 flex flex-col md:col-span-8 bg-white p-4 mt-5 rounded-md'>
                    <p className='text-black font-semibold'>{current + 1} {questions[current]?.question}</p>
                    <ul className='flex flex-col gap-2 my-5 text-[1rem]'>
                        {questions[current]?.options?.map((option, i) => {
                            let classSel = ""
                            if (option === questions[current]?.selectedAns) {
                                if (questions[current]?.selectedAns === questions[current]?.answer) classSel = "bg-green-500 hover:bg-green-500 text-white"
                                else classSel = "bg-red-500 hover:bg-red-500"
                            }
                            return <li key={i + "option"} className={` text-[1rem] border border-gray-600 hover:bg-gray-500 hover:text-white rounded-sm font-normal bg-gray-50 px-2 py-1 ${classSel} cursor-pointer`} onClick={() => { onChangeOption(option) }}>{option}</li>

                        })}
                    </ul>
                    <button className='bg-cyan-500 w-full py-2 mt-2 cursor-pointer' onClick={onNextQuestion}>submit</button>
                    {questions[current]?.isAnswered && (
                        <>
                            <button onClick={() => setShowExplaination(pre => !pre)} className='flex items-center gap-3 self-center mt-3 text-sm px-2 py-1 rounded-sm shadow-md cursor-pointer border border-cyan-500   '>Show explaination <FcSearch /> </button>
                            {showExplaination && (
                                <div className='text-center mt-2 text-sm'>
                                    <p>{questions[current]?.explanation}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className='col-span-12 md:col-span-4 bg-white/90 rounded-md mt-5 p-4'>
                    <h1 className='text-[1rem] font-semibold'>Attempted Questions</h1>
                    <ul className='flex gap-2 flex-wrap mt-5'>
                        {questions?.map((question, i) => <li key={i+"ans"} onClick={() => setCurrent(i)} className={`${i === current ? "border-blue-500 bg-blue-300 text-blue-500" : ""} cursor-pointer rounded-sm ${question.isAnswered ? "bg-cyan-500 text-white" : "bg-gray-200"}   flex justify-center items-center w-8 h-8 border text-center`}>{i + 1}</li>)}
                    </ul>
                </div>
            </>)

        case "result":
            return (<>
                <div className='col-span-12 text-center h-[40vh] bg-white text-xl flex justify-center items-center flex-col mt-5' >
                    <p>score : {result.score}</p>
                    <p>answered : {result.answered}</p>
                    <div className='flex gap-2 text-[1rem] mt-4'>
                        <Link to={"/"} className='bg-blue-400 px-2 py-1 rounded-sm text-white'>Go to home </Link>
                        <Link to='/quiz-recent' className='bg-gray-100 border rounded-sm px-2 py-1'> Recent quiz </Link>
                    </div>
                </div></>)

        default:
            break;
    }
}

export default QuizSection