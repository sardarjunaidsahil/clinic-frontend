import { Link } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";

export default function ServiceDetail({ service, onBack }) {
  const { isMobile, isTablet } = useResponsive();

  if (!service) return null;

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "#7D9B76",
          marginBottom: "28px",
          letterSpacing: "0.08em",
          padding: 0,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M13 8H3M7 4L3 8l4 4"
            stroke="#7D9B76"
            strokeWidth="1.2"
            strokeLinecap="square"
          />
        </svg>
        Back to Services
      </button>

      {/* Hero */}
      <div style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "14px",
          }}
        >
          <div
            style={{ width: "20px", height: "1px", background: "#C9896A" }}
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
            {service.tagline}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: isMobile ? "36px" : "48px" }}>
            {service.icon}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isMobile ? "36px" : "clamp(36px, 4vw, 56px)",
              fontWeight: "400",
              color: "#2D2D2D",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {service.title}
          </h1>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            lineHeight: 1.85,
            color: "#6B6B6B",
            fontWeight: "300",
            maxWidth: "600px",
          }}
        >
          {service.longDesc}
        </p>
      </div>

      {/* Content grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
          gap: isMobile ? "32px" : "48px",
          alignItems: "start",
        }}
      >
        {/* Features */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: "600",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9896A",
              marginBottom: "16px",
            }}
          >
            What's Included
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "1px",
              backgroundColor: "#E8DDD0",
              border: "1px solid #E8DDD0",
              marginBottom: "24px",
            }}
          >
            {service.features.map((f) => (
              <div
                key={f}
                style={{
                  backgroundColor: "#FDFAF5",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    backgroundColor: "#7D9B76",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#2D2D2D",
                  }}
                >
                  {f}
                </span>
              </div>
            ))}
          </div>

          {/* Process */}
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: "600",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9896A",
              marginBottom: "14px",
            }}
          >
            Our Approach
          </div>
          {[
            "Initial consultation and health assessment",
            "Personalized treatment plan creation",
            "Regular sessions with your specialist",
            "Progress tracking and plan adjustments",
            "Long-term follow-up care",
          ].map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  backgroundColor: "#F5EFE6",
                  border: "1px solid #E8DDD0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: "600",
                  color: "#7D9B76",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "#4A4A4A",
                  lineHeight: 1.6,
                }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Booking card */}
        <div style={{ position: "sticky", top: "90px" }}>
          <div
            style={{
              backgroundColor: "#F5EFE6",
              border: "1px solid #E8DDD0",
              padding: isMobile ? "24px" : "32px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C9896A",
                marginBottom: "20px",
              }}
            >
              Booking Info
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#7D9B76",
                  marginBottom: "5px",
                }}
              >
                Session Duration
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "22px",
                  fontWeight: "500",
                  color: "#2D2D2D",
                }}
              >
                {service.duration}
              </div>
            </div>

            <div
              style={{
                marginBottom: "24px",
                paddingBottom: "20px",
                borderBottom: "1px solid #E8DDD0",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#7D9B76",
                  marginBottom: "5px",
                }}
              >
                Fee Range
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "22px",
                  fontWeight: "500",
                  color: "#2D2D2D",
                }}
              >
                {service.price}
              </div>
            </div>

            <Link
              to="/appointment"
              state={{ service: service.title }}
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px",
                backgroundColor: "#7D9B76",
                color: "#FDFAF5",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid #7D9B76",
                transition: "all 0.3s",
                marginBottom: "10px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#7D9B76";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#7D9B76";
                e.currentTarget.style.color = "#FDFAF5";
              }}
            >
              Book This Service
            </Link>

            <Link
              to="/doctors"
              style={{
                display: "block",
                textAlign: "center",
                padding: "12px",
                backgroundColor: "transparent",
                color: "#2D2D2D",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid #E8DDD0",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2D2D2D";
                e.currentTarget.style.color = "#FDFAF5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2D2D2D";
              }}
            >
              View Doctors
            </Link>
          </div>

          {/* Insurance note */}
          <div
            style={{
              padding: "14px 16px",
              backgroundColor: "#FDFAF5",
              border: "1px solid #E8DDD0",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              style={{ flexShrink: 0, marginTop: "1px" }}
            >
              <path
                d="M8 2L10 6H14L11 9L12 13L8 11L4 13L5 9L2 6H6Z"
                stroke="#7D9B76"
                strokeWidth="1.1"
                fill="none"
              />
            </svg>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                lineHeight: 1.6,
                color: "#6B6B6B",
                fontWeight: "300",
              }}
            >
              Most major insurance providers accepted. Contact us to verify your
              coverage before your appointment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
