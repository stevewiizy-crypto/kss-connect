import { useState } from 'react'
import api from '../services/api.js'
import { Link, useNavigate } from 'react-router-dom'
export default function Register(){
  const [name,setName]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[role,setRole]=useState('student')
  const nav=useNavigate()
  async function submit(e){
    e.preventDefault()
    try{
      const res=await api.post('/auth/register',{name,email,password,role})
      localStorage.setItem('kss_token',res.data.token)
      localStorage.setItem('kss_user',JSON.stringify(res.data.user))
      nav('/chats')
    }catch(err){alert(err.response?.data?.message||'Register failed — backend not yet deployed')}
  }
  return <div className="card"><h2>Create KSS Account</h2>
  <form onSubmit={submit}>
  <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)}/>
  <input placeholder="school email" value={email} onChange={e=>setEmail(e.target.value)}/>
  <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
  <select value={role} onChange={e=>setRole(e.target.value)} style={{width:'100%',padding:'12px',borderRadius:'10px',margin:'8px 0'}}><option value="student">Student</option><option value="teacher">Teacher</option><option value="parent">Parent</option></select>
  <button>Register</button></form><p><Link to="/login">Have account? Login</Link></p></div>
    }
