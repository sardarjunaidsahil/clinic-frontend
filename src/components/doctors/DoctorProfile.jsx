import { Link } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";

export default function DoctorProfile({ doctor }) {
  const { isMobile, isTablet } = useResponsive();

  if (!doctor) return null;

  const education = [
    {
      degree: "MBBS",
      institution: "Aga Khan University, Karachi",
      year: "2010",
    },
    {
      degree: "FCPS",
      institution: "College of Physicians & Surgeons Pakistan",
      year: "2014",
    },
    {
      degree: "Fellowship",
      institution: "Johns Hopkins Bloomberg School",
      year: "2016",
    },
  ];

  const schedule = [
    { day: "Monday", hours: "9:00 AM – 5:00 PM", available: true },
    { day: "Tuesday", hours: "9:00 AM – 5:00 PM", available: true },
    { day: "Wednesday", hours: "9:00 AM – 1:00 PM", available: true },
    { day: "Thursday", hours: "9:00 AM – 5:00 PM", available: true },
    { day: "Friday", hours: "2:00 PM – 6:00 PM", available: true },
    { day: "Saturday", hours: "Closed", available: false },
    { day: "Sunday", hours: "Closed", available: false },
  ];

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: isMobile ? "40px 24px" : isTablet ? "56px 40px" : "64px 48px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
          gap: isMobile ? "40px" : "64px",
          alignItems: "start",
        }}
      >
        {/* Left sidebar */}
        <div>
          {/* Avatar */}
          <div
            style={{
              width: "100%",
              aspectRatio: "1",
              backgroundColor: doctor.color || "#7D9B76",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "72px",
                fontWeight: "600",
                color: "#FDFAF5",
              }}
            >
              {doctor.initial}
            </span>
          </div>

          {/* Book CTA */}
          <Link
            to="/appointment"
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
              marginBottom: "12px",
              transition: "all 0.3s",
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
            Book Appointment
          </Link>

          {/* Fee */}
          <div
            style={{
              backgroundColor: "#F5EFE6",
              border: "1px solid #E8DDD0",
              padding: "16px 20px",
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
                color: "#7D9B76",
                marginBottom: "4px",
              }}
            >
              Consultation Fee
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "22px",
                fontWeight: "500",
                color: "#2D2D2D",
              }}
            >
              {doctor.fee}
            </div>
          </div>

          {/* Schedule */}
          <div style={{ border: "1px solid #E8DDD0" }}>
            <div
              style={{
                padding: "10px 16px",
                backgroundColor: "#F5EFE6",
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C9896A",
              }}
            >
              Weekly Schedule
            </div>
            {schedule.map((s) => (
              <div
                key={s.day}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 16px",
                  borderTop: "1px solid #F5EFE6",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: s.available ? "#2D2D2D" : "#6B6B6B",
                  }}
                >
                  {s.day}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    color: s.available ? "#7D9B76" : "#6B6B6B",
                  }}
                >
                  {s.hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right content */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: "600",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9896A",
              marginBottom: "10px",
            }}
          >
            {doctor.specialty}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isMobile ? "36px" : "clamp(36px, 4vw, 52px)",
              fontWeight: "400",
              color: "#2D2D2D",
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            {doctor.name}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: "2px" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < doctor.rating ? "#C9896A" : "#E8DDD0",
                    fontSize: "14px",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "#6B6B6B",
              }}
            >
              {doctor.experience} Experience
            </span>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              lineHeight: 1.85,
              color: "#4A4A4A",
              fontWeight: "300",
              marginBottom: "36px",
            }}
          >
            {doctor.bio}
          </p>

          {/* Education */}
          <div style={{ marginBottom: "36px" }}>
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
              Education & Qualifications
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1px",
                border: "1px solid #E8DDD0",
                backgroundColor: "#E8DDD0",
              }}
            >
              {education.map((e) => (
                <div
                  key={e.degree}
                  style={{
                    backgroundColor: "#FDFAF5",
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    gap: "4px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#2D2D2D",
                      }}
                    >
                      {e.degree}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        color: "#6B6B6B",
                      }}
                    >
                      {e.institution}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "#7D9B76",
                      fontWeight: "500",
                      flexShrink: 0,
                    }}
                  >
                    {e.year}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
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
              Patient Reviews
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1px",
                border: "1px solid #E8DDD0",
                backgroundColor: "#E8DDD0",
              }}
            >
              {[
                {
                  name: "Sara A.",
                  text: "Absolutely transformed my health. So knowledgeable and genuinely caring.",
                  rating: 5,
                },
                {
                  name: "Omar K.",
                  text: "Professional, thorough, and patient. Best doctor I have visited in years.",
                  rating: 5,
                },
              ].map((review) => (
                <div
                  key={review.name}
                  style={{ backgroundColor: "#FDFAF5", padding: "20px 24px" }}
                >
                  <div
                    style={{ display: "flex", gap: "2px", marginBottom: "8px" }}
                  >
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span
                        key={i}
                        style={{ color: "#C9896A", fontSize: "12px" }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      lineHeight: 1.7,
                      color: "#4A4A4A",
                      fontWeight: "300",
                      marginBottom: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    "{review.text}"
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "#7D9B76",
                    }}
                  >
                    {review.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
