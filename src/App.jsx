import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Chats from './pages/Chats.jsx'
import ChatView from './pages/ChatView.jsx'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat/:id" element={<ChatView />} />
      </Routes>
    </BrowserRouter>
  )
  }
