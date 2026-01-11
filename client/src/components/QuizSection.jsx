import React, { useEffect, useState } from 'react'
import { data } from 'react-router-dom'

const QuizSection = ({ quiz }) => {

    const [questions, setQuestion] = useState([[]])
    const [current, setCurrent] = useState(0)
    const [state, setState] = useState("quiz")
    const [result, setResult] = useState({ score: 0, answered: 0 })

    useEffect(() => {
        const newQuiz = quiz.map((data) => ({ ...data, isAnswered: false, selectedAns: "" }))
        setQuestion(newQuiz)
    }, [])

    const onNextQuestion = () => {
        if (current >= questions.length) {
            setState("result")
            score = 0
            answered = 0
            questions?.map(question => {
                if (question.isAnswered) answered++;
                if (question.selectedAns === question.answer) score++
            })
            setResult({ score, answered })
        }
        setCurrent(pre => pre + 1)
    }

    const onChangeOption = (option) => {
        const new_question = questions?.map((question, i) => {
            if (i == current) {
                return { ...question, isAnswered: true, selectedAns: option }
            } else {
                return question
            }
        })
        setQuestion(new_question)
    }


    switch (state) {
        case "quiz":
            return (<div className='col-span-12 bg-white p-2 mt-5 rounded-md'>
                <p className='text-black'>{current + 1}. {questions[current]?.question}</p>
                <ul className='flex flex-col gap-2 mt-2 text-[1rem]'>
                    {questions[current]?.options?.map((option, i) => (<label>
                        <input type='radio' name={questions[current]?.question} onChange={() => { onChangeOption(option) }} /> {option}

                    </label>))}
                </ul>
                <button className='bg-cyan-500 w-full py-2 mt-2 ' onClick={onNextQuestion}>submit</button>
            </div>)

        case "result":
            return (<div>
                <p>score : {result.score}</p>
                <p>answered : {result.answered}</p>
            </div>)

        default:
            break;
    }
}

export default QuizSection