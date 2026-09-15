import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'

export default function App(){
  const [user,setUser] = useState(null)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [mode,setMode] = useState('login')

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>setUser(data.session?.user||null))
    const {data:listener} = supabase.auth.onAuthStateChange((e,session)=>setUser(session?.user||null))
    return ()=>listener.subscription.unsubscribe()
  },[])

  const handleAuth = async()=>{
    setLoading(true)
    try{
      if(mode==='login'){
        const {error} = await supabase.auth.signInWithPassword({email,password})
        if(error) alert(error.message)
      }else{
        const {error} = await supabase.auth.signUp({email,password})
        if(error) alert(error.message)
        else alert('Check email! Account created!')
      }
    }finally{setLoading(false)}
  }

  const handleLogout = async()=>{ await supabase.auth.signOut(); setUser(null) }

  if(user){
    return <div className="card">
      <h2>KSS CONNECT LIVE! 🚀</h2>
      <p>Welcome: <b>{user.email}</b></p>
      <p style={{color:'green'}}>CEO, your app is WORKING!</p>
      <button onClick={handleLogout}>Logout</button>
      <p style={{marginTop:20}}>Next: Dashboard, Students, Payments</p>
    </div>
  }

  return <div className="card">
    <h2>KSS CONNECT</h2>
    <p>{mode==='login'?'Login to continue':'Create account'}</p>
    <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
    <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
    <button onClick={handleAuth} disabled={loading}>{loading?'Wait...':mode==='login'?'Login':'Sign Up'}</button>
    <p style={{marginTop:12}}><a href="#" onClick={()=>setMode(mode==='login'?'signup':'login')}>{mode==='login'?'Need account? Sign Up':'Have account? Login'}</a></p>
  </div>
                                                      }
