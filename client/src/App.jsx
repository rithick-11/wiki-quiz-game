import React from 'react'
import Home from './pages/Home'
import { Route, Router, Routes } from 'react-router-dom'
import QuizGame from './pages/QuizGame'
import Container from './components/Container'

const App = () => {
  return (
    <Container className='h-screen bg-linear-to-br from-cyan-400 via-cyan-200 to-white'>
      <Routes>
        <Route path='/' element={<Home />} exact ></Route>
        <Route path='/quiz-game' element={<QuizGame />} exact ></Route>
      </Routes>
    </Container>
  )
}

export default App