import React, { useEffect, useState } from 'react'
import { Link, data } from 'react-router-dom'

const QuizSection = ({ quiz }) => {

    const [questions, setQuestion] = useState([[]])
    const [current, setCurrent] = useState(0)
    const [state, setState] = useState("quiz")
    const [result, setResult] = useState({ score: 0, answered: 0 })

    useEffect(() => {
        const newQuiz = quiz.map((data) => ({ ...data, isAnswered: false, selectedAns: "" }))
        setQuestion(newQuiz)
    }, [])


    // const { answer, difficulty, explanation, isAnswered, options, question, selectedAns } = questions[current]

    const onNextQuestion = () => {
        if (current >= questions.length) {
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
    }


    switch (state) {
        case "quiz":
            return (<div className='col-span-12 bg-white/90 p-2 mt-5 rounded-md'>
                <p className='text-black'>{questions[current]?.question}</p>
                <ul className='flex flex-col gap-2 mt-2 text-[1rem]'>
                    {questions[current]?.options?.map((option, i) => {
                        let classSel = ""
                        if (option === questions[current]?.selectedAns) {
                            if (questions[current]?.selectedAns === questions[current]?.answer) classSel = "bg-green-500"
                            else classSel = "bg-red-500"
                        }
                        return <li className={` text-[1rem] font-extralight px-2 py-1 ${classSel} cursor-pointer`} onClick={() => { onChangeOption(option) }}>{option}</li>

                    })}
                </ul>
                <button className='bg-cyan-500 w-full py-2 mt-2 cursor-pointer' onClick={onNextQuestion}>submit</button>
            </div>)

        case "result":
            return (<div className='col-span-12 text-center h-[40vh] bg-white text-xl flex justify-center items-center flex-col mt-5' >
                <p>score : {result.score}</p>
                <p>answered : {result.answered}</p>
                <div className='flex gap-2 text-[1rem] mt-4'>
                    <Link to={"/"} className='bg-blue-400 px-2 py-1 rounded-sm text-white'>Go to home </Link>
                    <Link to='/quiz-recent' className='bg-gray-100 border rounded-sm px-2 py-1'> Recent quiz </Link>
                </div>
            </div>)

        default:
            break;
    }
}

export default QuizSection