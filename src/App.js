import React from 'react'
import "./App.css"
import { Route, Routes } from 'react-router-dom'
import ChatPage from './Components/ChatPage'
import HomePage from './Components/HomePage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/chats" element={<ChatPage/>} />
      </Routes>
    </div>
  )
}

export default App

