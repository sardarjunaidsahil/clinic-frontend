import useResponsive from '../../hooks/useResponsive'

export default function StatsCards({ stats }) {
  const { isMobile } = useResponsive()

  const defaultStats = stats || [
    { label: 'Today\'s Appointments', value: 12, change: '+3', up: true, color: '#7D9B76' },
    { label: 'Total Patients', value: '8,241', change: '+24', up: true, color: '#C9896A' },
    { label: 'Pending Confirmations', value: 5, change: '-2', up: false, color: '#7D9B76' },
    { label: 'Revenue This Month', value: 'PKR 186K', change: '+12%', up: true, color: '#C9896A' },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '12px' : '16px',
    }}>
      {defaultStats.map((stat, i) => (
        <div key={stat.label} style={{
          backgroundColor: '#FDFAF5',
          border: '1px solid #E8DDD0',
          padding: isMobile ? '16px' : '20px 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B' }}>{stat.label}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: '600', color: stat.up ? '#7D9B76' : '#C9896A' }}>{stat.change}</div>
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '28px' : '36px', fontWeight: '600', color: '#2D2D2D', lineHeight: 1 }}>{stat.value}</div>
          <div style={{ width: '24px', height: '2px', backgroundColor: stat.color, marginTop: '12px' }} />
        </div>
      ))}
    </div>
  )
}