import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";

const specialties = [
  "All",
  "General Wellness",
  "Mental Health",
  "Nutrition",
  "Physical Therapy",
  "Skin & Aesthetics",
  "Cardiology",
];



export default function Doctors({ preFilter = '' }) {
  const { isMobile, isTablet } = useResponsive();
  const [activeFilter, setActiveFilter] = useState('All')
  const [allDoctors,   setAllDoctors]   = useState([])
  const [loading,      setLoading]      = useState(true)
  const heroRef = useRef(null)
  const gridRef = useRef(null)

  // Filter based on preFilter prop
  const isSpecialists = preFilter === 'specialists'

  // Load doctors from API
  useEffect(() => {
    import('../services/api').then(({ default: api }) => {
      api.get('/doctors')
        .then(res => setAllDoctors(res?.data || []))
        .catch(() => setAllDoctors([]))
        .finally(() => setLoading(false))
    })
  }, [])

  const base = isSpecialists
    ? allDoctors.filter(d => (d.experience_years || 0) >= 10)
    : allDoctors

  const filtered = activeFilter === "All"
    ? base
    : base.filter(d => d.specialty === activeFilter)

  useEffect(() => {
  if (!heroRef.current) return
  Array.from(heroRef.current.children).forEach((el, i) => {
    el.style.animation = `slideUp 0.5s ease-out ${i * 0.1}s both`
  })
}, [])

  return (
    <main style={{ backgroundColor: "#FDFAF5", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        ref={heroRef}
        style={{
          backgroundColor: "#F5EFE6",
          padding: isMobile ? "60px 24px 48px" : "80px 48px 64px",
          borderBottom: "1px solid #E8DDD0",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{ width: "22px", height: "1px", background: "#C9896A" }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9896A",
              }}
            >
              Our Specialists
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isMobile ? "40px" : "clamp(40px, 5vw, 68px)",
              fontWeight: "400",
              color: "#2D2D2D",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            {isSpecialists ? 'Senior ' : 'Meet Our '}
            <em style={{ fontStyle: "italic", color: "#7D9B76" }}>
              {isSpecialists ? 'Specialists' : 'Doctors'}
            </em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#6B6B6B",
              fontWeight: "300",
              maxWidth: "520px",
            }}
          >
            Our team of certified specialists brings together decades of
            expertise in holistic and modern medicine — all committed to your
            complete wellness.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div
        style={{
          backgroundColor: "#FDFAF5",
          borderBottom: "1px solid #E8DDD0",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: isMobile ? "0 24px" : "0 48px",
            display: "flex",
            gap: 0,
            minWidth: "max-content",
          }}
        >
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setActiveFilter(s)}
              style={{
                padding: "16px 20px",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: activeFilter === s ? "#7D9B76" : "#6B6B6B",
                borderBottom:
                  activeFilter === s
                    ? "2px solid #7D9B76"
                    : "2px solid transparent",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile
            ? "40px 24px"
            : isTablet
              ? "56px 40px"
              : "64px 48px",
        }}
      >
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "repeat(2, 1fr)"
                : "repeat(4, 1fr)",
            gap: "1px",
            backgroundColor: "#E8DDD0",
            border: "1px solid #E8DDD0",
          }}
        >
          {loading ? (
            <div style={{ gridColumn: '1/-1', padding: '60px', textAlign: 'center', backgroundColor: '#FDFAF5', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B6B6B' }}>
              Loading doctors...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ gridColumn: '1/-1', padding: '60px', textAlign: 'center', backgroundColor: '#FDFAF5' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: '#E8DDD0', marginBottom: '8px' }}>No doctors found</div>
              <button onClick={() => setActiveFilter('All')} style={{ padding: '9px 20px', backgroundColor: '#7D9B76', color: '#FDFAF5', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>Show All</button>
            </div>
          ) : filtered.map((doc) => (
            <Link
              key={doc.id || doc.name}
              to={`/doctors/${doc.id}`}
              style={{
                display: "block",
                backgroundColor: "#FDFAF5",
                padding: isMobile ? "28px 24px" : "36px 28px",
                textDecoration: "none",
                transition: "background-color 0.3s",
                position: "relative",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#F5EFE6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#FDFAF5")
              }
            >
              {/* Available badge */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  padding: "3px 8px",
                  backgroundColor: (doc.available || doc.is_available) ? "#7D9B76" : "#E8DDD0",
                  fontFamily: "var(--font-body)",
                  fontSize: "9px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: (doc.available || doc.is_available) ? "#FDFAF5" : "#6B6B6B",
                }}
              >
                {(doc.available || doc.is_available) ? "Available" : "Busy"}
              </div>

              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: doc.color || "#7D9B76",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "18px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#FDFAF5",
                  }}
                >
                  {doc.initial || doc.name?.split(' ').filter(w => w !== 'Dr.').map(w => w[0]).join('').slice(0,2).toUpperCase()}
                </span>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9896A",
                  marginBottom: "6px",
                }}
              >
                {doc.specialty}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "21px",
                  fontWeight: "500",
                  color: "#2D2D2D",
                  marginBottom: "4px",
                  letterSpacing: "-0.01em",
                }}
              >
                {doc.name}
              </h3>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "#7D9B76",
                  marginBottom: "16px",
                }}
              >
                {doc.experience_years ? `${doc.experience_years} Years` : doc.experience} Experience
              </div>
              <div
                style={{ display: "flex", gap: "2px", marginBottom: "18px" }}
              >
                {Array.from({ length: 5 }).map((_, si) => (
                  <span
                    key={si}
                    style={{
                      color: si < doc.rating ? "#C9896A" : "#E8DDD0",
                      fontSize: "12px",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              {/* Fee */}
              {doc.consultation_fee && (
                <div style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#6B6B6B', marginBottom:'12px' }}>
                  Fee: <strong style={{ color:'#2D2D2D' }}>PKR {Number(doc.consultation_fee).toLocaleString()}</strong>
                </div>
              )}

              {/* Reviews count */}
              {doc.total_reviews > 0 && (
                <div style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'#6B6B6B', marginBottom:'12px' }}>
                  {doc.total_reviews} patient review{doc.total_reviews !== 1 ? 's' : ''}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#7D9B76",
                }}
              >
                View Profile
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="#7D9B76"
                    strokeWidth="1.2"
                    strokeLinecap="square"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
