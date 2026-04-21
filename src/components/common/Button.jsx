export default function Button({
  children, onClick, type = 'button',
  variant = 'primary', size = 'md',
  fullWidth = false, disabled = false, loading = false,
}) {
  const sizes = {
    sm: { padding: '8px 18px', fontSize: '10px' },
    md: { padding: '12px 28px', fontSize: '11px' },
    lg: { padding: '15px 36px', fontSize: '12px' },
  }

  const variants = {
    primary: {
      base: { backgroundColor: '#7D9B76', color: '#FDFAF5', border: '1px solid #7D9B76' },
      hover: { backgroundColor: 'transparent', color: '#7D9B76' },
    },
    secondary: {
      base: { backgroundColor: 'transparent', color: '#2D2D2D', border: '1px solid #2D2D2D' },
      hover: { backgroundColor: '#2D2D2D', color: '#FDFAF5' },
    },
    outline: {
      base: { backgroundColor: 'transparent', color: '#7D9B76', border: '1px solid #7D9B76' },
      hover: { backgroundColor: '#7D9B76', color: '#FDFAF5' },
    },
    ghost: {
      base: { backgroundColor: 'transparent', color: '#7D9B76', border: '1px solid transparent' },
      hover: { backgroundColor: '#F5EFE6', color: '#7D9B76' },
    },
    danger: {
      base: { backgroundColor: 'transparent', color: '#B91C1C', border: '1px solid #B91C1C' },
      hover: { backgroundColor: '#B91C1C', color: '#FDFAF5' },
    },
  }

  const v = variants[variant] || variants.primary
  const s = sizes[size] || sizes.md

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...v.base,
        ...s,
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-body)',
        fontWeight: '600',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.3s',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
      onMouseEnter={e => { if (!disabled && !loading) Object.assign(e.currentTarget.style, v.hover) }}
      onMouseLeave={e => { if (!disabled && !loading) Object.assign(e.currentTarget.style, v.base) }}
    >
      {loading ? (
        <>
          <div style={{ width: '12px', height: '12px', border: '1.5px solid currentColor', borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }} />
          Loading
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
      ) : children}
    </button>
  )
}