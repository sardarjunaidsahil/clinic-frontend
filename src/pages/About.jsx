import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useResponsive from "../hooks/useResponsive";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { isMobile, isTablet } = useResponsive();

  // Scroll-triggered sections (NOT hero)
  const missionRef = useRef(null);
  const statsRef = useRef(null);
  const teamRef = useRef(null);
  const certRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only scroll-triggered animations for sections BELOW hero
      const sections = [missionRef, statsRef, teamRef, certRef]
        .map((r) => r.current)
        .filter(Boolean);
      sections.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const STATS = [
    { num: "12+", label: "Years of Excellence" },
    { num: "8,000+", label: "Patients Served" },
    { num: "24", label: "Specialists" },
    { num: "98%", label: "Satisfaction Rate" },
  ];

  const TEAM = [
    {
      name: "Dr. Sarah Khan",
      role: "General Wellness",
      exp: "12 Years",
      init: "SK",
      color: "#7D9B76",
    },
    {
      name: "Dr. Ahmed Raza",
      role: "Mental Health",
      exp: "9 Years",
      init: "AR",
      color: "#C9896A",
    },
    {
      name: "Dr. Fatima Ali",
      role: "Nutrition",
      exp: "7 Years",
      init: "FA",
      color: "#7D9B76",
    },
    {
      name: "Dr. Omar Sheikh",
      role: "Physical Therapy",
      exp: "15 Years",
      init: "OS",
      color: "#C9896A",
    },
  ];

  const CERTS = [
    { title: "Joint Commission International", year: "2018" },
    { title: "Pakistan Medical Commission", year: "2019" },
    { title: "ISO 9001:2015 Certified", year: "2020" },
    { title: "WHO Health Standards", year: "2022" },
  ];

  return (
    <main style={{ backgroundColor: "#FDFAF5" }}>
      {/* ── HERO — CSS animation, NO GSAP opacity ── */}
      <div
        style={{
          backgroundColor: "#F5EFE6",
          borderBottom: "1px solid #E8DDD0",
          padding: isMobile
            ? "48px 24px 40px"
            : isTablet
              ? "64px 40px 48px"
              : "80px 48px 60px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
              animation: "slideUp 0.5s ease-out 0.05s both",
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
              Our Story
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isMobile
                ? "clamp(36px,10vw,52px)"
                : "clamp(44px,5vw,72px)",
              fontWeight: "400",
              color: "#2D2D2D",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              animation: "slideUp 0.5s ease-out 0.12s both",
            }}
          >
            Healing Lives,{" "}
            <em style={{ fontStyle: "italic", color: "#7D9B76" }}>
              Since 2012
            </em>
          </h1>

          {/* Sub */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isMobile ? "14px" : "16px",
              lineHeight: 1.85,
              color: "#6B6B6B",
              fontWeight: "300",
              maxWidth: "560px",
              animation: "slideUp 0.5s ease-out 0.19s both",
            }}
          >
            Wellness Clinic was founded with a singular vision — to create a
            sanctuary where modern medicine and holistic healing unite, giving
            every patient the care they truly deserve.
          </p>
        </div>
      </div>

      {/* ── MISSION & VISION ── */}
      <div
        id="mission"
        ref={missionRef}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile
            ? "48px 24px"
            : isTablet
              ? "64px 40px"
              : "80px 48px",
          opacity: 0,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "32px" : "64px",
            alignItems: "center",
          }}
        >
          {/* Left text */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9896A",
                marginBottom: "14px",
              }}
            >
              Our Mission
            </div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile ? "32px" : "clamp(30px,3.5vw,48px)",
                fontWeight: "400",
                color: "#2D2D2D",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                marginBottom: "20px",
              }}
            >
              Redefining What{" "}
              <em style={{ fontStyle: "italic", color: "#7D9B76" }}>
                Healthcare
              </em>{" "}
              Feels Like
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                lineHeight: 1.85,
                color: "#6B6B6B",
                fontWeight: "300",
                marginBottom: "16px",
              }}
            >
              We believe healthcare should be proactive, not reactive. Our team
              of 24 certified specialists works together to understand the root
              causes of your health concerns — not just the symptoms.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                lineHeight: 1.85,
                color: "#6B6B6B",
                fontWeight: "300",
                marginBottom: "28px",
              }}
            >
              From nutritional science to mental wellness, physical
              rehabilitation to aesthetic medicine — we offer a complete
              spectrum of care under one roof.
            </p>
            <Link
              to="/appointment"
              style={{
                display: "inline-block",
                padding: "13px 28px",
                backgroundColor: "#7D9B76",
                color: "#FDFAF5",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid #7D9B76",
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
              Book an Appointment
            </Link>
          </div>

          {/* Right visual */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              backgroundColor: "#E8DDD0",
              border: "1px solid #E8DDD0",
            }}
          >
            {[
              { label: "Founded", value: "2012", sub: "In Islamabad" },
              { label: "Specialists", value: "24", sub: "Certified Doctors" },
              { label: "Patients", value: "8,000+", sub: "Lives Touched" },
              { label: "Satisfaction", value: "98%", sub: "Happy Patients" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  backgroundColor: "#FDFAF5",
                  padding: isMobile ? "24px 20px" : "32px 28px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: isMobile ? "28px" : "38px",
                    fontWeight: "600",
                    color: "#2D2D2D",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    marginBottom: "6px",
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: "600",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#7D9B76",
                    marginBottom: "2px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    color: "#6B6B6B",
                  }}
                >
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── VALUES / STATS ── */}
      <div
        ref={statsRef}
        style={{
          backgroundColor: "#F5EFE6",
          borderTop: "1px solid #E8DDD0",
          borderBottom: "1px solid #E8DDD0",
          padding: isMobile ? "48px 24px" : "64px 48px",
          opacity: 0,
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9896A",
                marginBottom: "10px",
              }}
            >
              Why Choose Us
            </div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile ? "32px" : "clamp(30px,3.5vw,48px)",
                fontWeight: "400",
                color: "#2D2D2D",
                letterSpacing: "-0.015em",
              }}
            >
              Our Core{" "}
              <em style={{ fontStyle: "italic", color: "#7D9B76" }}>Values</em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                  ? "repeat(2,1fr)"
                  : "repeat(4,1fr)",
              gap: "1px",
              backgroundColor: "#E8DDD0",
              border: "1px solid #E8DDD0",
            }}
          >
            {[
              {
                icon: "🌿",
                title: "Holistic Care",
                desc: "We treat the whole person — mind, body and spirit — not just the disease.",
              },
              {
                icon: "🎓",
                title: "Expert Team",
                desc: "Every specialist is board-certified with a minimum of 5 years clinical experience.",
              },
              {
                icon: "💚",
                title: "Patient First",
                desc: "Your comfort, dignity and wellbeing guide every decision we make.",
              },
              {
                icon: "🔬",
                title: "Evidence-Based",
                desc: "We combine traditional wisdom with the latest medical research and technology.",
              },
            ].map((val) => (
              <div
                key={val.title}
                style={{
                  backgroundColor: "#FDFAF5",
                  padding: isMobile ? "28px 22px" : "36px 28px",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "14px" }}>
                  {val.icon}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#7D9B76",
                    marginBottom: "10px",
                  }}
                >
                  {val.title}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    lineHeight: 1.7,
                    color: "#6B6B6B",
                    fontWeight: "300",
                  }}
                >
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TEAM ── */}
      <div
        id="team"
        ref={teamRef}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "48px 24px" : "72px 48px",
          opacity: 0,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: "600",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C9896A",
              marginBottom: "10px",
            }}
          >
            Meet The Doctors
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isMobile ? "32px" : "clamp(30px,3.5vw,48px)",
              fontWeight: "400",
              color: "#2D2D2D",
              letterSpacing: "-0.015em",
            }}
          >
            Our{" "}
            <em style={{ fontStyle: "italic", color: "#7D9B76" }}>
              Specialists
            </em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "repeat(2,1fr)"
                : "repeat(4,1fr)",
            gap: "1px",
            backgroundColor: "#E8DDD0",
            border: "1px solid #E8DDD0",
          }}
        >
          {TEAM.map((doc) => (
            <div
              key={doc.name}
              style={{
                backgroundColor: "#FDFAF5",
                padding: isMobile ? "28px 24px" : "36px 28px",
                textAlign: "center",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#F5EFE6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#FDFAF5")
              }
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: doc.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
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
                  {doc.init}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "9px",
                  fontWeight: "600",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9896A",
                  marginBottom: "6px",
                }}
              >
                {doc.role}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#2D2D2D",
                  marginBottom: "4px",
                  letterSpacing: "-0.01em",
                }}
              >
                {doc.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "#7D9B76",
                }}
              >
                {doc.exp} Experience
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <Link
            to="/doctors"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              border: "1px solid #2D2D2D",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#2D2D2D",
              textDecoration: "none",
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
            View All Doctors
          </Link>
        </div>
      </div>

      {/* ── CERTIFICATIONS ── */}
      <div
        id="certifications"
        ref={certRef}
        style={{
          backgroundColor: "#2D2D2D",
          padding: isMobile ? "48px 24px" : "72px 48px",
          opacity: 0,
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#7D9B76",
                marginBottom: "10px",
              }}
            >
              Accreditations
            </div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile ? "30px" : "clamp(28px,3vw,44px)",
                fontWeight: "400",
                color: "#FDFAF5",
                letterSpacing: "-0.015em",
              }}
            >
              Certified &{" "}
              <em style={{ fontStyle: "italic", color: "#7D9B76" }}>
                Accredited
              </em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)",
              gap: "1px",
              backgroundColor: "rgba(253,250,245,0.08)",
              border: "1px solid rgba(253,250,245,0.08)",
            }}
          >
            {CERTS.map((cert) => (
              <div
                key={cert.title}
                style={{
                  backgroundColor: "#2D2D2D",
                  padding: "24px 28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#383838")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2D2D2D")
                }
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
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
                      fontWeight: "400",
                      color: "rgba(253,250,245,0.8)",
                    }}
                  >
                    {cert.title}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#7D9B76",
                    flexShrink: 0,
                  }}
                >
                  {cert.year}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "rgba(253,250,245,0.55)",
                fontWeight: "300",
                marginBottom: "24px",
              }}
            >
              Ready to experience the Wellness difference?
            </p>
            <Link
              to="/appointment"
              style={{
                display: "inline-block",
                padding: "14px 36px",
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
              Book Your First Visit
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </main>
  );
}
