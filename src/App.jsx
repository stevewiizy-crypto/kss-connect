import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { detectConnectionMode } from './services/connectionMode.js'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Chats from './pages/Chats.jsx'

export default function App(){
  const [mode, setMode] = useState({ label:'Detecting...', color:'#666' })
  
  useEffect(()=>{
    detectConnectionMode().then(setMode)
    const id = setInterval(()=> detectConnectionMode().then(setMode), 10000)
    return ()=> clearInterval(id)
  },[])

  return (
    <BrowserRouter>
      <div style={{background:mode.color, color:'white', padding:'6px', textAlign:'center', fontWeight:'bold', fontSize:'13px'}}>
        {mode.label} | KSS CONNECT • Kingston SS • Buikwe
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </BrowserRouter>
  )
}
