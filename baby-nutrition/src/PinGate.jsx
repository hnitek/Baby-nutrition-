import React, { useState, useRef, useEffect } from 'react'

const CORRECT_PIN = import.meta.env.VITE_APP_PIN || '1234'

export default function PinGate({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [shake, setShake] = useState(false)
  const [error, setError] = useState(false)
  const inputRef = useRef(null)
  const pinLen = CORRECT_PIN.length

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleChange(e) {
    const val = e.target.value.replace(/\D/g, '').slice(0, pinLen)
    setPin(val)
    setError(false)

    if (val.length === pinLen) {
      if (val === CORRECT_PIN) {
        setTimeout(onUnlock, 150)
      } else {
        setShake(true)
        setError(true)
        setTimeout(() => { setPin(''); setShake(false); setError(false) }, 700)
      }
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef9f0 0%, #fdf0e8 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Nunito', sans-serif",
      padding: '24px',
    }}
      onClick={() => inputRef.current?.focus()}
    >
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '52px', marginBottom: '10px' }}>🍼</div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '22px', fontWeight: 700, color: '#92400e',
        }}>Dzienniczek żywieniowy</div>
        <div style={{ fontSize: '14px', color: '#a78060', marginTop: '6px' }}>
          Wprowadź PIN
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-10px)}
          40%{transform:translateX(10px)}
          60%{transform:translateX(-7px)}
          80%{transform:translateX(7px)}
        }
      `}</style>

      <div style={{
        position: 'relative',
        animation: shake ? 'shake 0.6s ease' : 'none',
      }}>
        {/* Niewidoczny input — uruchamia klawiaturę systemową */}
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={pin}
          onChange={handleChange}
          maxLength={pinLen}
          autoComplete="off"
          style={{
            position: 'absolute',
            opacity: 0,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            cursor: 'default',
            fontSize: '16px',
          }}
        />

        {/* Kratki z cyferkami */}
        <div style={{
          display: 'flex',
          gap: '12px',
          cursor: 'text',
        }}>
          {Array.from({ length: pinLen }).map((_, i) => {
            const filled = i < pin.length
            const active = i === pin.length
            return (
              <div key={i} style={{
                width: '52px',
                height: '64px',
                borderRadius: '14px',
                border: `2px solid ${error ? '#ef4444' : active ? '#f97316' : filled ? '#fb923c' : '#fde68a'}`,
                background: filled ? '#fff7ed' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 800,
                color: error ? '#ef4444' : '#92400e',
                transition: 'border-color 0.15s, background 0.15s',
                boxShadow: active ? '0 0 0 3px rgba(249,115,22,0.2)' : '0 2px 6px rgba(0,0,0,0.06)',
              }}>
                {filled ? '•' : ''}
              </div>
            )
          })}
        </div>
      </div>

      {error && (
        <div style={{ marginTop: '16px', color: '#ef4444', fontSize: '14px', fontWeight: 600 }}>
          Nieprawidłowy PIN
        </div>
      )}

      <div style={{ marginTop: '28px', color: '#c4a882', fontSize: '13px' }}>
        Dotknij aby otworzyć klawiaturę
      </div>
    </div>
  )
}
