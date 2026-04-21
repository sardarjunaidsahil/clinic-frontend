import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useResponsive from "../../hooks/useResponsive";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 12, suffix: "+", label: "Years of Excellence" },
  { num: 8000, suffix: "+", label: "Patients Healed" },
  { num: 24, suffix: "", label: "Certified Specialists" },
  { num: 98, suffix: "%", label: "Patient Satisfaction" },
  { num: 6, suffix: "", label: "Wellness Disciplines" },
];

export default function StatsBar() {
  const { isMobile, isTablet } = useResponsive();
  const sectionRef = useRef(null);
  const numRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].num;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent =
              Math.round(obj.val).toLocaleString() + stats[i].suffix;
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });
      });

      gsap.fromTo(
        sectionRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        backgroundColor: "#2D2D2D",
        padding: isMobile ? "48px 24px" : "56px 48px",
      }}
    >
      <div
        ref={sectionRef}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(2, 1fr)"
            : isTablet
              ? "repeat(3, 1fr)"
              : "repeat(5, 1fr)",
          gap: isMobile ? "32px 20px" : "24px",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              textAlign: "center",
              padding: "8px 0",
              borderRight:
                !isMobile && i < stats.length - 1
                  ? "1px solid rgba(253,250,245,0.08)"
                  : "none",
            }}
          >
            <div
              ref={(el) => (numRefs.current[i] = el)}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile ? "36px" : "48px",
                fontWeight: "600",
                color: "#FDFAF5",
                lineHeight: 1,
                marginBottom: "8px",
                letterSpacing: "-0.02em",
              }}
            >
              0{stat.suffix}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                color: "#7D9B76",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "500",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
