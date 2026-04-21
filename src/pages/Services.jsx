import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useResponsive from "../hooks/useResponsive";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    slug: "general-wellness",
    name: "General Wellness",
    icon: "🌿",
    color: "#7D9B76",
    tag: "Your Foundation of Health",
    desc: "Comprehensive health checkups and personalized wellness plans designed to keep you at your best.",
    long: "Our General Wellness program is built around you. Starting with an in-depth health assessment, our physicians identify risk factors and create a fully personalized wellness plan — covering preventive screenings, lifestyle coaching, and ongoing health monitoring.",
    duration: "60–90 min",
    price: "PKR 3,000 – 6,000",
    features: [
      "Full Health Assessment",
      "Blood Work Analysis",
      "Lifestyle Coaching",
      "Preventive Screening",
      "Nutrition Guidance",
      "Follow-up Care",
    ],
  },
  {
    slug: "mental-health",
    name: "Mental Health",
    icon: "🧠",
    color: "#C9896A",
    tag: "Nurturing Mind & Soul",
    desc: "Professional counseling, therapy and mindfulness programs for lasting emotional wellness.",
    long: "Mental wellness is the foundation of a fulfilling life. Our licensed psychologists and psychiatrists provide evidence-based therapy including CBT, mindfulness training and psychiatric support in a safe, confidential environment.",
    duration: "50–60 min",
    price: "PKR 4,000 – 8,000",
    features: [
      "Individual Therapy",
      "Group Sessions",
      "CBT Programs",
      "Mindfulness Training",
      "Stress Management",
      "Psychiatric Support",
    ],
  },
  {
    slug: "nutrition",
    name: "Nutrition & Diet",
    icon: "🥗",
    color: "#7D9B76",
    tag: "Nourish From Within",
    desc: "Science-backed nutrition planning tailored to your body, goals and lifestyle.",
    long: "Food is medicine. Our registered dietitians analyze your metabolic health, food sensitivities and lifestyle to create a nutrition plan that works in the real world — sustainable, delicious and scientifically sound.",
    duration: "45–60 min",
    price: "PKR 2,500 – 5,000",
    features: [
      "Metabolic Assessment",
      "Custom Meal Plans",
      "Food Sensitivity Testing",
      "Weight Management",
      "Sports Nutrition",
      "Gut Health Protocols",
    ],
  },
  {
    slug: "physical-therapy",
    name: "Physical Therapy",
    icon: "💪",
    color: "#C9896A",
    tag: "Restore Movement & Strength",
    desc: "Expert rehabilitation and pain management to restore your mobility and quality of life.",
    long: "Whether you are recovering from injury, managing chronic pain or improving athletic performance, our physiotherapy team designs progressive rehabilitation programs that deliver real, measurable results.",
    duration: "45–75 min",
    price: "PKR 3,500 – 7,000",
    features: [
      "Injury Rehabilitation",
      "Pain Management",
      "Sports Recovery",
      "Posture Correction",
      "Manual Therapy",
      "Exercise Programming",
    ],
  },
  {
    slug: "skin-aesthetics",
    name: "Skin & Aesthetics",
    icon: "✨",
    color: "#7D9B76",
    tag: "Radiance Redefined",
    desc: "Medical-grade skincare and aesthetic procedures for your healthiest, most confident skin.",
    long: "Healthy skin is a reflection of inner wellbeing. Our dermatologists combine clinical expertise with the latest aesthetic technology to treat skin conditions and enhance your natural beauty with precision and care.",
    duration: "60–120 min",
    price: "PKR 5,000 – 15,000",
    features: [
      "Skin Analysis",
      "Acne Treatment",
      "Anti-Aging Therapies",
      "Chemical Peels",
      "Laser Treatments",
      "Cosmetic Consultations",
    ],
  },
  {
    slug: "cardiology",
    name: "Cardiology",
    icon: "🫀",
    color: "#C9896A",
    tag: "Heart Health First",
    desc: "Comprehensive cardiac care and preventive cardiology for a strong, healthy heart.",
    long: "Your heart deserves the best care. Our preventive cardiologists focus on identifying and addressing risk factors before they become life-threatening — combining advanced diagnostics with personalized heart health programs.",
    duration: "60–90 min",
    price: "PKR 4,000 – 10,000",
    features: [
      "ECG & Echo",
      "Cholesterol Management",
      "Hypertension Care",
      "Risk Assessment",
      "Cardiac Rehab",
      "Lifestyle Counseling",
    ],
  },
];

export default function Services() {
  const { slug } = useParams();
  const { isMobile, isTablet } = useResponsive();
  const [active, setActive] = useState(null);

  const gridRef = useRef(null);

  // Set active service from URL slug
  useEffect(() => {
    if (slug) {
      const found = SERVICES.find((s) => s.slug === slug);
      setActive(found || null);
    } else {
      setActive(null);
    }
  }, [slug]);

  // Scroll animation for grid ONLY (not hero)
  useEffect(() => {
    if (!gridRef.current || active) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(gridRef.current.children),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, gridRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <main style={{ backgroundColor: "#FDFAF5", minHeight: "100vh" }}>
      {/* ── HERO — CSS only, NO GSAP opacity ── */}
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
              {active ? active.tag : "Our Services"}
            </span>
          </div>

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
            {active ? (
              <>
                <em style={{ fontStyle: "italic", color: "#7D9B76" }}>
                  {active.name}
                </em>
              </>
            ) : (
              <>
                Complete{" "}
                <em style={{ fontStyle: "italic", color: "#7D9B76" }}>
                  Wellness
                </em>{" "}
                Care
              </>
            )}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isMobile ? "14px" : "15px",
              lineHeight: 1.85,
              color: "#6B6B6B",
              fontWeight: "300",
              maxWidth: "520px",
              animation: "slideUp 0.5s ease-out 0.19s both",
            }}
          >
            {active
              ? active.desc
              : "Six specialised disciplines united under one roof — for complete, personalised healthcare."}
          </p>

          {/* Breadcrumb if detail view */}
          {active && (
            <button
              onClick={() => setActive(null)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                marginTop: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "#7D9B76",
                padding: 0,
                animation: "slideUp 0.5s ease-out 0.26s both",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 3L5 8l5 5"
                  stroke="#7D9B76"
                  strokeWidth="1.2"
                  strokeLinecap="square"
                />
              </svg>
              Back to All Services
            </button>
          )}
        </div>
      </div>

      {/* ── SERVICE DETAIL VIEW ── */}
      {active ? (
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: isMobile ? "40px 24px" : "64px 48px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
              gap: isMobile ? "40px" : "64px",
              alignItems: "start",
            }}
          >
            {/* Left */}
            <div>
              <div
                style={{
                  fontSize: isMobile ? "40px" : "52px",
                  marginBottom: "20px",
                }}
              >
                {active.icon}
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: isMobile ? "28px" : "38px",
                  fontWeight: "400",
                  color: "#2D2D2D",
                  letterSpacing: "-0.01em",
                  marginBottom: "16px",
                }}
              >
                About This Service
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  lineHeight: 1.85,
                  color: "#6B6B6B",
                  fontWeight: "300",
                  marginBottom: "28px",
                }}
              >
                {active.long}
              </p>

              {/* Features */}
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
                What's Included
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                  gap: "1px",
                  backgroundColor: "#E8DDD0",
                  border: "1px solid #E8DDD0",
                  marginBottom: "32px",
                }}
              >
                {active.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      backgroundColor: "#FDFAF5",
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "5px",
                        height: "5px",
                        backgroundColor: active.color,
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
                "Personalised treatment plan creation",
                "Regular sessions with your specialist",
                "Progress tracking and plan refinement",
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
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "10px",
                        fontWeight: "600",
                        color: "#7D9B76",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
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

            {/* Right sticky card */}
            <div
              style={{ position: isMobile ? "static" : "sticky", top: "120px" }}
            >
              <div
                style={{
                  backgroundColor: "#F5EFE6",
                  border: "1px solid #E8DDD0",
                  padding: "28px",
                  marginBottom: "12px",
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
                    marginBottom: "18px",
                  }}
                >
                  Booking Info
                </div>
                <div
                  style={{
                    marginBottom: "14px",
                    paddingBottom: "14px",
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
                      marginBottom: "4px",
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
                    {active.duration}
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: "600",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#7D9B76",
                      marginBottom: "4px",
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
                    {active.price}
                  </div>
                </div>
                <Link
                  to="/appointment"
                  state={{ service: active.name }}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "14px",
                    backgroundColor: "#7D9B76",
                    color: "#FDFAF5",
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.14em",
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
                  View Our Doctors
                </Link>
              </div>
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
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="#7D9B76"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M8 5v4M8 11v0"
                    stroke="#7D9B76"
                    strokeWidth="1.2"
                    strokeLinecap="square"
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
                  Most major insurance providers accepted. Contact us to verify
                  coverage before your appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── SERVICES GRID ── */
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: isMobile ? "40px 24px" : "64px 48px",
          }}
        >
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                  ? "repeat(2,1fr)"
                  : "repeat(3,1fr)",
              gap: "1px",
              backgroundColor: "#E8DDD0",
              border: "1px solid #E8DDD0",
            }}
          >
            {SERVICES.map((svc) => (
              <div
                key={svc.slug}
                onClick={() => setActive(svc)}
                style={{
                  backgroundColor: "#FDFAF5",
                  padding: isMobile ? "28px 22px" : "40px 32px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#F5EFE6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#FDFAF5")
                }
              >
                {/* Accent top bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: svc.color,
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.35s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scaleX(1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scaleX(0)")
                  }
                />

                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "9px",
                    fontWeight: "600",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#C9896A",
                    marginBottom: "14px",
                  }}
                >
                  {svc.tag}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "28px" : "36px",
                    marginBottom: "12px",
                  }}
                >
                  {svc.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: isMobile ? "22px" : "26px",
                    fontWeight: "500",
                    color: "#2D2D2D",
                    marginBottom: "10px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  {svc.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    lineHeight: 1.7,
                    color: "#6B6B6B",
                    fontWeight: "300",
                    marginBottom: "20px",
                  }}
                >
                  {svc.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "14px",
                    borderTop: "1px solid #F5EFE6",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "#7D9B76",
                      fontWeight: "500",
                    }}
                  >
                    {svc.price}
                  </span>
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
                    Learn More
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="#7D9B76"
                        strokeWidth="1.2"
                        strokeLinecap="square"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
