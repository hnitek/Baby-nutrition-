import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PinGate from './PinGate.jsx'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function Root() {
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem('pin-date') === todayStr()
  )
  function unlock() {
    localStorage.setItem('pin-date', todayStr())
    setUnlocked(true)
  }
  return unlocked ? <App /> : <PinGate onUnlock={unlock} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><Root /></React.StrictMode>
)
