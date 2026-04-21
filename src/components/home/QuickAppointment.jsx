import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "General Wellness",
  "Mental Health",
  "Nutrition & Diet",
  "Physical Therapy",
  "Skin & Aesthetics",
  "Cardiology",
];

export default function QuickAppointment() {
  const { isMobile, isTablet } = useResponsive();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", phone: "", service: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) return;
    setSubmitted(true);
    setTimeout(() => navigate("/appointment"), 1500);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    fontFamily: "var(--font-body)",
    fontSize: "13px",
    color: "#2D2D2D",
    backgroundColor: "#FDFAF5",
    border: "1px solid #E8DDD0",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      style={{
        backgroundColor: "#F5EFE6",
        padding: isMobile ? "60px 24px" : isTablet ? "80px 40px" : "100px 48px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          ref={sectionRef}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "40px" : "80px",
            alignItems: "center",
            opacity: 0,
          }}
        >
          {/* Left */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{ width: "24px", height: "1px", background: "#C9896A" }}
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
                Quick Booking
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile ? "36px" : "clamp(36px, 4vw, 56px)",
                fontWeight: "400",
                color: "#2D2D2D",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              Book Your{" "}
              <em style={{ fontStyle: "italic", color: "#7D9B76" }}>
                Appointment
              </em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                lineHeight: 1.8,
                color: "#6B6B6B",
                fontWeight: "300",
                maxWidth: "400px",
                marginBottom: "32px",
              }}
            >
              Take the first step towards complete wellness. Fill in your
              details and we'll confirm your appointment within 24 hours.
            </p>

            {/* Features */}
            {[
              "Same-day appointments available",
              "Expert certified specialists",
              "Personalized care plans",
            ].map((f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
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

          {/* Right — Form */}
          <div
            style={{
              backgroundColor: "#FDFAF5",
              border: "1px solid #E8DDD0",
              padding: isMobile ? "28px 24px" : "40px 36px",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "32px",
                    color: "#7D9B76",
                    marginBottom: "12px",
                  }}
                >
                  Thank You
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "#6B6B6B",
                  }}
                >
                  Redirecting to full booking...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: "600",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#7D9B76",
                      marginBottom: "6px",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                    onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                    required
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: "600",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#7D9B76",
                      marginBottom: "6px",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+92 300 000 0000"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                    onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                    required
                  />
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: "600",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#7D9B76",
                      marginBottom: "6px",
                    }}
                  >
                    Service Required
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) =>
                      setForm({ ...form, service: e.target.value })
                    }
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      appearance: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                    onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                    required
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "15px",
                    backgroundColor: "#7D9B76",
                    color: "#FDFAF5",
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    border: "1px solid #7D9B76",
                    cursor: "pointer",
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
                  Request Appointment
                </button>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    color: "#6B6B6B",
                    textAlign: "center",
                    marginTop: "12px",
                  }}
                >
                  We'll confirm within 24 hours
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
