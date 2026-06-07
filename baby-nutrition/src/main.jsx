import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PinGate from './PinGate.jsx'

function Root() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('pin-unlocked') === '1'
  )
  function unlock() {
    sessionStorage.setItem('pin-unlocked', '1')
    setUnlocked(true)
  }
  return unlocked ? <App /> : <PinGate onUnlock={unlock} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><Root /></React.StrictMode>
)
