import { useState } from 'react'
import useResponsive from '../../hooks/useResponsive'
import Modal from '../common/Modal'

export default function DoctorsTable({ doctors = [] }) {
  const { isMobile } = useResponsive()
  const [showModal, setShowModal] = useState(false)

  const mockDoctors = doctors.length > 0 ? doctors : [
    { id: '1', name: 'Dr. Sarah Khan', specialty: 'General Wellness', experience: '12 Years', fee: 'PKR 3,000', available: true, initial: 'SK' },
    { id: '2', name: 'Dr. Ahmed Raza', specialty: 'Mental Health', experience: '9 Years', fee: 'PKR 4,000', available: true, initial: 'AR' },
    { id: '3', name: 'Dr. Fatima Ali', specialty: 'Nutrition', experience: '7 Years', fee: 'PKR 2,500', available: false, initial: 'FA' },
    { id: '4', name: 'Dr. Omar Sheikh', specialty: 'Physical Therapy', experience: '15 Years', fee: 'PKR 3,500', available: true, initial: 'OS' },
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6B6B6B' }}>{mockDoctors.length} doctors total</span>
        <button onClick={() => setShowModal(true)} style={{ padding: '9px 20px', backgroundColor: '#7D9B76', color: '#FDFAF5', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
          + Add Doctor
        </button>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #E8DDD0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F5EFE6', borderBottom: '1px solid #E8DDD0' }}>
              {['Doctor', 'Specialty', 'Experience', 'Fee', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B6B6B', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockDoctors.map(doc => (
              <tr key={doc.id} style={{ borderBottom: '1px solid #F5EFE6' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9F6F2'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FDFAF5'}
              >
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '34px', height: '34px', backgroundColor: '#7D9B76', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: '600', color: '#FDFAF5' }}>{doc.initial}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: '600', color: '#2D2D2D', whiteSpace: 'nowrap' }}>{doc.name}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6B6B6B', whiteSpace: 'nowrap' }}>{doc.specialty}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6B6B6B' }}>{doc.experience}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: '12px', color: '#7D9B76', fontWeight: '600' }}>{doc.fee}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ padding: '3px 8px', backgroundColor: doc.available ? '#F5EFE6' : '#F5F5F5', border: `1px solid ${doc.available ? '#7D9B76' : '#E8DDD0'}`, fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: doc.available ? '#7D9B76' : '#6B6B6B' }}>
                    {doc.available ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button style={{ padding: '4px 10px', backgroundColor: 'transparent', border: '1px solid #7D9B76', fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7D9B76', cursor: 'pointer' }}>Edit</button>
                    <button style={{ padding: '4px 10px', backgroundColor: 'transparent', border: '1px solid #E8DDD0', fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6B6B', cursor: 'pointer' }}>Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Doctor Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Doctor" size="md">
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '12px' }}>
          {['Full Name', 'Specialty', 'Experience', 'Consultation Fee', 'Email', 'Phone'].map(f => (
            <div key={f}>
              <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7D9B76', marginBottom: '6px' }}>{f}</label>
              <input type="text" style={{ width: '100%', padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#2D2D2D', backgroundColor: '#FDFAF5', border: '1px solid #E8DDD0', outline: 'none' }} onFocus={e => e.target.style.borderColor = '#7D9B76'} onBlur={e => e.target.style.borderColor = '#E8DDD0'} />
            </div>
          ))}
        </div>
        <button onClick={() => setShowModal(false)} style={{ marginTop: '20px', width: '100%', padding: '13px', backgroundColor: '#7D9B76', color: '#FDFAF5', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
          Save Doctor
        </button>
      </Modal>
    </div>
  )
}