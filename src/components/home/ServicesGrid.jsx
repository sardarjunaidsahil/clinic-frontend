import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useResponsive from "../../hooks/useResponsive";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: "🌿",
    title: "General Wellness",
    desc: "Comprehensive health checkups, preventive care, and personalized wellness plans.",
    path: "/services/general-wellness",
    tag: "Foundation Care",
  },
  {
    icon: "🧠",
    title: "Mental Health",
    desc: "Professional counseling, therapy, and mindfulness programs for inner balance.",
    path: "/services/mental-health",
    tag: "Mind & Soul",
  },
  {
    icon: "🥗",
    title: "Nutrition & Diet",
    desc: "Science-backed nutrition plans tailored to your body, goals, and lifestyle.",
    path: "/services/nutrition",
    tag: "Nourishment",
  },
  {
    icon: "💪",
    title: "Physical Therapy",
    desc: "Rehabilitation, pain management, and movement therapy by certified specialists.",
    path: "/services/physical-therapy",
    tag: "Body & Movement",
  },
  {
    icon: "✨",
    title: "Skin & Aesthetics",
    desc: "Medical-grade skincare treatments, facials, and aesthetic enhancement procedures.",
    path: "/services/skin-aesthetics",
    tag: "Glow & Radiance",
  },
  {
    icon: "🫀",
    title: "Cardiology",
    desc: "Heart health monitoring, preventive cardiology, and cardiac risk assessments.",
    path: "/services/cardiology",
    tag: "Heart Health",
  },
];

export default function ServicesGrid() {
  const { isMobile, isTablet } = useResponsive();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        },
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: (i % (isMobile ? 1 : 3)) * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#FDFAF5",
        padding: isMobile ? "60px 24px" : isTablet ? "80px 40px" : "100px 48px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Title */}
        <div
          ref={titleRef}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: "20px",
            marginBottom: isMobile ? "40px" : "60px",
          }}
        >
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
                What We Offer
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
              }}
            >
              Our{" "}
              <em style={{ fontStyle: "italic", color: "#7D9B76" }}>
                Services
              </em>
            </h2>
          </div>

          <Link
            to="/services"
            style={{
              padding: "11px 28px",
              border: "1px solid #2D2D2D",
              color: "#2D2D2D",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "all 0.3s",
              alignSelf: isMobile ? "flex-start" : "auto",
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
            All Services
          </Link>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "repeat(2, 1fr)"
                : "repeat(3, 1fr)",
            gap: isMobile ? "1px" : "1px",
            border: "1px solid #E8DDD0",
          }}
        >
          {services.map((svc, i) => (
            <Link
              key={svc.title}
              to={svc.path}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{
                display: "block",
                padding: isMobile ? "32px 24px" : "40px 32px",
                backgroundColor: "#FDFAF5",
                textDecoration: "none",
                borderRight:
                  !isMobile && (i + 1) % 3 !== 0 ? "1px solid #E8DDD0" : "none",
                borderBottom: "1px solid #E8DDD0",
                transition: "background-color 0.3s",
                position: "relative",
                overflow: "hidden",
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F5EFE6";
                const accent = e.currentTarget.querySelector(".card-accent");
                if (accent) accent.style.width = "100%";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FDFAF5";
                const accent = e.currentTarget.querySelector(".card-accent");
                if (accent) accent.style.width = "0%";
              }}
            >
              {/* Top accent line */}
              <div
                className="card-accent"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "2px",
                  width: "0%",
                  backgroundColor: "#7D9B76",
                  transition: "width 0.4s ease",
                }}
              />

              {/* Tag */}
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "9px",
                  fontWeight: "600",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#C9896A",
                  marginBottom: "20px",
                }}
              >
                {svc.tag}
              </div>

              {/* Icon */}
              <div
                style={{
                  fontSize: "28px",
                  marginBottom: "16px",
                  display: "block",
                }}
              >
                {svc.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: isMobile ? "22px" : "26px",
                  fontWeight: "500",
                  color: "#2D2D2D",
                  marginBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                {svc.title}
              </h3>

              {/* Desc */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "#6B6B6B",
                  fontWeight: "300",
                  marginBottom: "24px",
                }}
              >
                {svc.desc}
              </p>

              {/* Arrow */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#7D9B76",
                }}
              >
                Learn More
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
    </section>
  );
}
