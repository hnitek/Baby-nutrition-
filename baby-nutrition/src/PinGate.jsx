import React, { useState } from 'react'

const CORRECT_PIN = import.meta.env.VITE_APP_PIN || '1234'

function PinDots({ length, filled }) {
  return (
    <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', margin: '28px 0' }}>
      {Array.from({ length }).map((_, i) => (
        <div key={i} style={{
          width: '16px', height: '16px', borderRadius: '50%',
          background: i < filled ? '#f97316' : 'transparent',
          border: '2px solid',
          borderColor: i < filled ? '#f97316' : '#fed7aa',
          transition: 'all 0.15s',
        }} />
      ))}
    </div>
  )
}

export default function PinGate({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [shake, setShake] = useState(false)
  const pinLen = CORRECT_PIN.length

  function press(digit) {
    if (pin.length >= pinLen) return
    const next = pin + digit
    setPin(next)
    if (next.length === pinLen) {
      if (next === CORRECT_PIN) {
        setTimeout(onUnlock, 200)
      } else {
        setShake(true)
        setTimeout(() => { setPin(''); setShake(false) }, 600)
      }
    }
  }

  function del() {
    setPin(p => p.slice(0, -1))
  }

  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫']

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
    }}>
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>🍼</div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '22px', fontWeight: 700, color: '#92400e',
        }}>Dzienniczek żywieniowy</div>
        <div style={{ fontSize: '14px', color: '#a78060', marginTop: '6px' }}>
          Wprowadź PIN aby kontynuować
        </div>
      </div>

      <div style={{
        animation: shake ? 'shake 0.5s ease' : 'none',
      }}>
        <style>{`
          @keyframes shake {
            0%,100%{transform:translateX(0)}
            20%{transform:translateX(-8px)}
            40%{transform:translateX(8px)}
            60%{transform:translateX(-6px)}
            80%{transform:translateX(6px)}
          }
        `}</style>
        <PinDots length={pinLen} filled={pin.length} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 72px)',
        gap: '12px',
        marginTop: '8px',
      }}>
        {keys.map((k, i) => {
          if (k === '') return <div key={i} />
          const isDel = k === '⌫'
          return (
            <button
              key={i}
              onClick={() => isDel ? del() : press(k)}
              style={{
                width: '72px', height: '72px', borderRadius: '50%',
                border: '2px solid',
                borderColor: isDel ? '#e5e7eb' : '#fde68a',
                background: isDel ? '#f9fafb' : '#fff',
                color: isDel ? '#9ca3af' : '#374151',
                fontSize: isDel ? '22px' : '24px',
                fontWeight: 700,
                fontFamily: "'Nunito', sans-serif",
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
                transition: 'transform 0.1s, background 0.1s',
                WebkitTapHighlightColor: 'transparent',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.93)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onTouchStart={e => e.currentTarget.style.transform = 'scale(0.93)'}
              onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {k}
            </button>
          )
        })}
      </div>
    </div>
  )
}
