import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Chats() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    try {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser()

      if (error || !user) {
        navigate('/login')
        return
      }

      setUser(user)
      setLoading(false)
    } catch (err) {
      console.error(err)
      navigate('/login')
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    localStorage.removeItem('kss_user')
    navigate('/login')
  }

  function send(e) {
    e.preventDefault()

    if (!text.trim()) return

    const newMessage = {
      id: Date.now(),
      sender:
        user?.user_metadata?.name ||
        user?.email ||
        'You',
      content: text.trim()
    }

    setMessages((prev) => [...prev, newMessage])
    setText('')
  }

  if (loading) {
    return (
      <div style={{ padding: '30px', textAlign: 'center' }}>
        Loading KSS Connect...
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 40px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <header
        style={{
          padding: '12px 16px',
          background: '#f97316',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <strong>KSS CONNECT</strong>
          <div style={{ fontSize: '12px' }}>
            Kingston SS • Buikwe
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            background: 'white',
            color: '#f97316',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px'
          }}
        >
          Logout
        </button>
      </header>

      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #ddd'
        }}
      >
        <strong>
          {user?.user_metadata?.name || user?.email}
        </strong>

        <div style={{ fontSize: '13px', color: '#666' }}>
          {user?.email}
        </div>
      </div>

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto'
          }}
        >
          <h3>General Chat</h3>

          {messages.length === 0 && (
            <p style={{ color: '#777' }}>
              Welcome to KSS Connect. Send the first message.
            </p>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                margin: '8px 0',
                padding: '10px',
                background: '#f3f4f6',
                borderRadius: '10px'
              }}
            >
              <strong>{message.sender}</strong>
              <div>{message.content}</div>
            </div>
          ))}
        </div>

        <form
          onSubmit={send}
          style={{
            display: 'flex',
            gap: '8px',
            padding: '10px',
            borderTop: '1px solid #ddd'
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          />

          <button
            type="submit"
            style={{
              width: '90px',
              border: 'none',
              borderRadius: '8px',
              background: '#f97316',
              color: 'white'
            }}
          >
            Send
          </button>
        </form>
      </main>
    </div>
  )
}
