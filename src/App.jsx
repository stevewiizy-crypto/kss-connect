import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Chats from './pages/Chats.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          background: '#f97316',
          color: 'white',
          padding: '8px',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '13px'
        }}
      >
        KSS CONNECT • Kingston SS • Buikwe
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/chats" element={<Chats />} />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}
