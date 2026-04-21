import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useResponsive from "../../hooks/useResponsive";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Book Online",
    desc: "Choose your specialist, pick a convenient time slot, and confirm your appointment in minutes.",
    icon: "📅",
  },
  {
    num: "02",
    title: "Meet Your Doctor",
    desc: "Visit our serene clinic or connect virtually. Our specialists listen, assess, and understand you.",
    icon: "🩺",
  },
  {
    num: "03",
    title: "Personalized Plan",
    desc: "Receive a tailored wellness plan — treatments, nutrition guidance, and follow-up care.",
    icon: "📋",
  },
  {
    num: "04",
    title: "Heal & Thrive",
    desc: "Follow your plan, track progress, and experience lasting transformation in your health.",
    icon: "🌱",
  },
];

export default function HowItWorks() {
  const { isMobile, isTablet } = useResponsive();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stepsRef = useRef([]);
  const lineRef = useRef(null);

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
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        },
      );

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: lineRef.current, start: "top 80%" },
          },
        );
      }

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 88%" },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#F5EFE6",
        padding: isMobile ? "60px 24px" : isTablet ? "80px 40px" : "100px 48px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Title */}
        <div
          ref={titleRef}
          style={{
            textAlign: "center",
            marginBottom: isMobile ? "48px" : "72px",
            opacity: 0,
          }}
        >
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
              Simple Process
            </span>
            <div
              style={{ width: "24px", height: "1px", background: "#C9896A" }}
            />
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
            How It{" "}
            <em style={{ fontStyle: "italic", color: "#7D9B76" }}>Works</em>
          </h2>
        </div>

        {/* Connecting line — desktop */}
        {!isMobile && (
          <div style={{ position: "relative", marginBottom: "40px" }}>
            <div
              ref={lineRef}
              style={{
                position: "absolute",
                top: "28px",
                left: "12.5%",
                right: "12.5%",
                height: "1px",
                backgroundColor: "#C9896A",
                transformOrigin: "left",
                opacity: 0.4,
                scaleX: 0,
              }}
            />
          </div>
        )}

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "repeat(2, 1fr)"
                : "repeat(4, 1fr)",
            gap: isMobile ? "32px" : "24px",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => (stepsRef.current[i] = el)}
              style={{
                textAlign: isMobile ? "left" : "center",
                padding: isMobile ? "28px 24px" : "32px 20px",
                backgroundColor: "#FDFAF5",
                border: "1px solid #E8DDD0",
                position: "relative",
                transition: "all 0.3s",
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#7D9B76";
                e.currentTarget.style.backgroundColor = "#FDFAF5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E8DDD0";
                e.currentTarget.style.backgroundColor = "#FDFAF5";
              }}
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "48px",
                  fontWeight: "300",
                  color: "#E8DDD0",
                  lineHeight: 1,
                  marginBottom: "12px",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.num}
              </div>

              {/* Icon */}
              <div
                style={{
                  fontSize: "24px",
                  marginBottom: "16px",
                  display: isMobile ? "inline-block" : "block",
                }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "22px",
                  fontWeight: "500",
                  color: "#2D2D2D",
                  marginBottom: "10px",
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>

              {/* Desc */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "#6B6B6B",
                  fontWeight: "300",
                }}
              >
                {step.desc}
              </p>

              {/* Bottom accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#7D9B76",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s ease",
                }}
                className="step-accent"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            marginTop: isMobile ? "48px" : "64px",
          }}
        >
          <Link
            to="/appointment"
            style={{
              padding: isMobile ? "14px 32px" : "16px 48px",
              backgroundColor: "#7D9B76",
              color: "#FDFAF5",
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid #7D9B76",
              display: "inline-block",
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
            Begin Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
