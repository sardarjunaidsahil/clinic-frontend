import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useResponsive from "../../hooks/useResponsive";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sara Ahmed",
    role: "Nutritional Therapy Patient",
    text: "Wellness Clinic completely transformed my relationship with food and health. The personalized nutrition plan changed my life in ways I never imagined possible.",
    rating: 5,
    initial: "SA",
  },
  {
    name: "Omar Khalid",
    role: "Physical Therapy Patient",
    text: "After my injury, I had lost hope. The physical therapy team here gave me back my mobility and confidence. Truly exceptional, compassionate care.",
    rating: 5,
    initial: "OK",
  },
  {
    name: "Fatima Noor",
    role: "Mental Health Patient",
    text: "The mental health program here is unlike anything else. My therapist understood me deeply. I feel grounded, calm, and genuinely well for the first time.",
    rating: 5,
    initial: "FN",
  },
  {
    name: "Bilal Raza",
    role: "General Wellness Patient",
    text: "The comprehensive wellness checkup revealed issues I had no idea about. Early detection and a solid care plan — this clinic saved me from serious trouble.",
    rating: 5,
    initial: "BR",
  },
  {
    name: "Aisha Malik",
    role: "Skin & Aesthetics Patient",
    text: "The skincare treatment was medical-grade and so gentle. My skin has never looked or felt better. The doctors here truly understand holistic beauty.",
    rating: 5,
    initial: "AM",
  },
];

export default function Testimonials() {
  const { isMobile, isTablet } = useResponsive();
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
    );
  }, [active]);

  const colsCount = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#2D2D2D",
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
            marginBottom: isMobile ? "40px" : "64px",
            opacity: 0,
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
                Patient Stories
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile ? "36px" : "clamp(36px, 4vw, 56px)",
                fontWeight: "400",
                color: "#FDFAF5",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Real{" "}
              <em style={{ fontStyle: "italic", color: "#7D9B76" }}>Healing</em>
            </h2>
          </div>

          {/* Nav dots */}
          <div style={{ display: "flex", gap: "8px" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? "28px" : "8px",
                  height: "8px",
                  backgroundColor:
                    i === active ? "#7D9B76" : "rgba(253,250,245,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Cards */}
        <div
          ref={contentRef}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${colsCount}, 1fr)`,
            gap: "1px",
            backgroundColor: "#3D3D3D",
          }}
        >
          {testimonials
            .slice(active, active + colsCount)
            .concat(
              active + colsCount > testimonials.length
                ? testimonials.slice(
                    0,
                    (active + colsCount) % testimonials.length,
                  )
                : [],
            )
            .map((t, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#2D2D2D",
                  padding: isMobile ? "32px 24px" : "40px 32px",
                }}
              >
                {/* Stars */}
                <div
                  style={{
                    display: "flex",
                    gap: "3px",
                    marginBottom: "20px",
                  }}
                >
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <span
                      key={si}
                      style={{ color: "#C9896A", fontSize: "14px" }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote mark */}
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "64px",
                    color: "#7D9B76",
                    lineHeight: 0.8,
                    marginBottom: "16px",
                    opacity: 0.5,
                  }}
                >
                  "
                </div>

                {/* Text */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: isMobile ? "14px" : "15px",
                    lineHeight: 1.8,
                    color: "rgba(253,250,245,0.8)",
                    fontWeight: "300",
                    marginBottom: "28px",
                    fontStyle: "italic",
                  }}
                >
                  {t.text}
                </p>

                {/* Author */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    paddingTop: "20px",
                    borderTop: "1px solid rgba(253,250,245,0.1)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#7D9B76",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#FDFAF5",
                      flexShrink: 0,
                    }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#FDFAF5",
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        color: "#7D9B76",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
