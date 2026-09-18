import { useState } from 'react'
import api from '../services/api.js'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState(''),[password,setPassword]=useState('')
  const nav=useNavigate()
  async function submit(e){
    e.preventDefault()
    try{
      const res=await api.post('/auth/login',{email,password})
      localStorage.setItem('kss_token',res.data.token)
      localStorage.setItem('kss_user',JSON.stringify(res.data.user))
      nav('/chats')
    }catch(err){alert(err.response?.data?.message||'Login failed — backend not yet deployed')}
  }
  return <div className="card"><h2>KSS CONNECT Login</h2><p>Kingston SS — Buikwe</p>
  <form onSubmit={submit}><input placeholder="school email" value={email} onChange={e=>setEmail(e.target.value)}/>
  <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
  <button>Login</button></form><p><Link to="/register">No account? Register</Link></p></div>
                                                                                                }
