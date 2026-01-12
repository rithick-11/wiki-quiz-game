import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"


const Home = () => {
    const [url, setUrl] = useState("")
    const [err, setErr] = useState("")

    const navigate = useNavigate()

    const onStartGame = () => {
        if (!url.includes("wikipedia.org/wiki/")) {
            setErr("Enter vailid wikipedia url")
            return
        }

        navigate(`/quiz-game?url=${url}`)
    }

    return (
        <div className="h-screen  flex flex-col gap-3 items-center justify-center">
            <h1 className='text-2xl font-semibold'>Wiki Quiz</h1>
            <p className='text-black/80 text-center text-[1rem]'>
                Finished reading?
                Challenge yourself with a quiz game generated from the article using Gemini AI.
            </p>
            <div className='flex flex-col gap-2 items-center'>
                <input type='text' placeholder='exp: https://en.wikipedia.org/wiki/Oops' className='rounded-sm bg-white outline-none px-2 py-1 w-[70vw] sm:w-[50vw] md:w-[30vw]' value={url} onChange={(e) => setUrl(e.target.value)} />
                {err !== "" && <p className='text-xs text-red-600'>{err}</p>}
                <div className='flex gap-2 items-center'>
                    <button className='w-fit px-2 py-1 bg-cyan-300 border-cyan-700 rounded-lg' onClick={onStartGame}>Start Quiz</button>
                    <Link to='/quiz-recent' className='bg-gray-100 border rounded-sm px-2 py-1'> Recent quiz </Link>
                </div>
            </div>
        </div>
    )
}

export default Home