export default function Loader({ fullScreen = true, text = '' }) {
  return (
    <div style={{
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      flexDirection:   'column',
      gap:             '28px',
      height:          fullScreen ? '100vh' : '200px',
      backgroundColor: '#FDFAF5',
      position:        fullScreen ? 'fixed' : 'relative',
      inset:           fullScreen ? 0 : 'auto',
      zIndex:          fullScreen ? 9999 : 1,
    }}>

      {/* Animated leaf logo */}
      <div style={{ position: 'relative', width: '64px', height: '64px' }}>
        {/* Outer rotating ring */}
        <div style={{
          position:   'absolute',
          inset:      0,
          border:     '1.5px solid #E8DDD0',
          borderTopColor: '#7D9B76',
          borderRadius:   '50%',
          animation:  'loaderSpin 1s linear infinite',
        }}/>
        {/* Inner pulse ring */}
        <div style={{
          position:     'absolute',
          inset:        '10px',
          border:       '1px solid #F5EFE6',
          borderRadius: '50%',
          animation:    'loaderPulse 1.6s ease-in-out infinite',
        }}/>
        {/* Center leaf icon */}
        <div style={{
          position:       'absolute',
          inset:          0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none"
            style={{ animation: 'loaderBreathe 1.6s ease-in-out infinite' }}>
            <path d="M14 2C14 2 4 8 4 16C4 21.5 8.5 26 14 26C19.5 26 24 21.5 24 16C24 8 14 2 14 2Z"
              fill="#7D9B76" opacity="0.3"/>
            <path d="M14 2C14 2 4 8 4 16C4 21.5 8.5 26 14 26"
              stroke="#7D9B76" strokeWidth="1.5" fill="none"/>
            <path d="M14 26V10M14 10C14 10 18 13 20 17"
              stroke="#7D9B76" strokeWidth="1.5" strokeLinecap="square"/>
          </svg>
        </div>
      </div>

      {/* Text */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily:    'var(--font-heading)',
          fontSize:      '22px',
          fontWeight:    '600',
          color:         '#2D2D2D',
          letterSpacing: '-0.01em',
          lineHeight:    1,
          marginBottom:  '5px',
        }}>
          Wellness
        </div>
        <div style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '9px',
          letterSpacing: '0.28em',
          color:         '#7D9B76',
          textTransform: 'uppercase',
          marginBottom:  '14px',
        }}>
          Clinic
        </div>
        {/* Progress bar */}
        <div style={{
          width:           '56px',
          height:          '1px',
          backgroundColor: '#E8DDD0',
          margin:          '0 auto',
          position:        'relative',
          overflow:        'hidden',
        }}>
          <div style={{
            position:        'absolute',
            top:             0,
            left:            '-100%',
            width:           '100%',
            height:          '100%',
            backgroundColor: '#7D9B76',
            animation:       'loaderBar 1.2s ease-in-out infinite',
          }}/>
        </div>
        {text && (
          <div style={{
            fontFamily:    'var(--font-body)',
            fontSize:      '11px',
            color:         '#6B6B6B',
            marginTop:     '12px',
            letterSpacing: '0.06em',
          }}>
            {text}
          </div>
        )}
      </div>

      <style>{`
        @keyframes loaderSpin    { to { transform: rotate(360deg); } }
        @keyframes loaderPulse   { 0%,100%{opacity:.3;transform:scale(.9)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes loaderBreathe { 0%,100%{opacity:.6;transform:scale(.9)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes loaderBar     { 0%{left:-100%} 50%{left:0%} 100%{left:100%} }
      `}</style>
    </div>
  )
}