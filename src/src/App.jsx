import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Chats from './pages/Chats.jsx'
import ChatView from './pages/ChatView.jsx'
export default function App(){
  const token=localStorage.getItem('kss_token')
  return (<BrowserRouter><div style={{background:'#0a4da1',color:'white',textAlign:'center',padding:'6px',fontSize:'13px',fontWeight:'bold'}}>KSS Connect | Kingston SS - Buikwe</div><Routes><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/chats" element={token?<Chats/>:<Navigate to="/login"/>}/><Route path="/chat/:id" element={token?<ChatView/>:<Navigate to="/login"/>}/><Route path="*" element={<Navigate to={token?"/chats":"/login"}/>}/></Routes></BrowserRouter>)
    }
