import { useEffect, useState } from 'react'
import api from '../services/api.js'
import { io } from 'socket.io-client'
import { SOCKET_URL } from '../config.js'

export default function Chats(){
  const user = JSON.parse(localStorage.getItem('kss_user')||'{}')
  const [chats,setChats]=useState([])
  const [selected,setSelected]=useState(null)
  const [messages,setMessages]=useState([])
  const [text,setText]=useState('')

  useEffect(()=>{
    api.get('/chats/my-chats').then(r=>setChats(r.data)).catch(()=>setChats([{ _id:'demo', name:'General Chat (Backend not yet deployed)' }]))
    const socket = io(SOCKET_URL)
    socket.on('new_message', m=>{ if(m.chatId===selected?._id) setMessages(prev=>[...prev,m]) })
    return ()=> socket.disconnect()
  },[selected])

  async function openChat(c){
    setSelected(c)
    try{ const res=await api.get(`/messages/${c._id}`); setMessages(res.data) }catch{ setMessages([{sender:'System', content:'Backend not yet deployed — messages will work after backend deploy'}]) }
  }
  async function send(e){
    e.preventDefault()
    if(!text.trim()||!selected) return
    try{ const res=await api.post('/messages/send',{chatId:selected._id, content:text}); setMessages([...messages,res.data]); setText('') }catch{ setMessages([...messages,{sender:user.name||'You', content:text}]); setText('') }
  }

  return <div style={{display:'flex',height:'95vh'}}>
    <div style={{width:'30%',borderRight:'1px solid #ddd',padding:'10px'}}><h3>{user.name}</h3>{chats.map(c=><div key={c._id} onClick={()=>openChat(c)} style={{padding:'10px',cursor:'pointer',background:selected?._id===c._id?'#eef':''}}>{c.name||c._id}</div>)}</div>
    <div style={{flex:1,display:'flex',flexDirection:'column'}}>{selected?<><div style={{flex:1,padding:'10px',overflowY:'auto'}}>{messages.map((m,i)=><div key={i} style={{margin:'6px 0'}}><b>{m.sender?.name||m.sender}:</b> {m.content}</div>)}</div><form onSubmit={send} style={{display:'flex'}}><input value={text} onChange={e=>setText(e.target.value)} placeholder="Type message"/><button style={{width:'100px'}}>Send</button></form></>:<p style={{padding:'20px'}}>Select chat</p>}</div>
  </div>
      }
