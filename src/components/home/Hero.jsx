import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useResponsive from "../../hooks/useResponsive";
import useNavHeight from "../../hooks/useNavHeight";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { isMobile, isTablet } = useResponsive();
  useNavHeight();
  const isSmall = isMobile || isTablet;

  const secRef = useRef(null);
  const imgRef = useRef(null);
  const bgRef = useRef(null);
  const btnsRef = useRef(null);
  const l1 = useRef(null),
    l2 = useRef(null);
  const l3 = useRef(null),
    l4 = useRef(null);

  useEffect(() => {
    // Only scroll parallax — NO opacity changes
    const ctx = gsap.context(() => {
      if (!isSmall) {
        if (imgRef.current) {
          gsap.to(imgRef.current, {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: secRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
        if (bgRef.current) {
          gsap.to(bgRef.current, {
            x: -80,
            ease: "none",
            scrollTrigger: {
              trigger: secRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 2,
            },
          });
        }
      }

      // Leaves float — no opacity change
      [l1, l2, l3, l4].forEach((r, i) => {
        if (!r.current) return;
        gsap.to(r.current, {
          y: i % 2 === 0 ? -14 : -10,
          rotation: i % 2 === 0 ? 5 : -5,
          duration: 2.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });
    }, secRef);

    return () => ctx.revert();
  }, [isSmall]);

  const leafData = [
    { ref: l1, top: "10%", left: "3%", size: isSmall ? 28 : 48, rot: 18 },
    { ref: l2, top: "72%", left: "2%", size: isSmall ? 20 : 34, rot: -14 },
    { ref: l3, top: "12%", right: "3%", size: isSmall ? 24 : 42, rot: 32 },
    { ref: l4, top: "70%", right: "4%", size: isSmall ? 32 : 56, rot: -22 },
  ];

  return (
    <section
      ref={secRef}
      style={{
        position: "relative",
        minHeight: "calc(100vh - var(--nav-total-height, 104px))",
        backgroundColor: "#FDFAF5",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* BG text — visible by default */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "-1%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-heading)",
          fontSize: isMobile ? "21vw" : "clamp(100px, 17vw, 230px)",
          fontWeight: "700",
          color: "transparent",
          WebkitTextStroke: "1px #E8DDD0",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          letterSpacing: "-0.02em",
          opacity: 0.6,
        }}
      >
        WELLNESS
      </div>

      {/* Leaves — visible by default */}
      {leafData.map((lf, i) => (
        <div
          key={i}
          ref={lf.ref}
          style={{
            position: "absolute",
            top: lf.top,
            left: lf.left,
            right: lf.right,
            width: lf.size,
            height: lf.size,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <svg
            viewBox="0 0 60 60"
            fill="none"
            style={{
              width: "100%",
              height: "100%",
              transform: `rotate(${lf.rot}deg)`,
            }}
          >
            <path
              d="M30 5C30 5 8 18 8 35C8 46 18 55 30 55C42 55 52 46 52 35C52 18 30 5 30 5Z"
              fill="#7D9B76"
              opacity="0.22"
            />
            <path
              d="M30 55V20M30 20C30 20 38 26 42 34"
              stroke="#7D9B76"
              strokeWidth="1.5"
              strokeLinecap="square"
              opacity="0.45"
            />
          </svg>
        </div>
      ))}

      {/* Main Content — CSS animation, no GSAP opacity */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          padding: isMobile
            ? "24px 24px 40px"
            : isTablet
              ? "40px 40px 56px"
              : "0 48px",
          display: "grid",
          gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr",
          gap: isSmall ? "24px" : "64px",
          alignItems: "center",
          direction: isMobile ? "ltr" : "ltr",
          animation: "heroFadeIn 0.8s ease-out forwards",
        }}
      >
        {/* LEFT */}
        <div>
          {/* Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "24px",
              animation: "slideUp 0.6s ease-out 0.1s both",
            }}
          >
            <div
              style={{ width: "24px", height: "1px", background: "#7D9B76" }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#7D9B76",
              }}
            >
              Functional Medicine Expert
            </span>
            <div
              style={{ width: "24px", height: "1px", background: "#7D9B76" }}
            />
          </div>

          {/* Heading */}
          <div
            style={{
              marginBottom: "18px",
              animation: "slideUp 0.6s ease-out 0.15s both",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile
                  ? "clamp(24px, 6vw, 32px)"
                  : "clamp(44px, 5vw, 72px)",
                fontWeight: "400",
                lineHeight: isMobile ? 1.3 : 1.05,
                color: "#2D2D2D",
                letterSpacing: "-0.025em",
              }}
            >
              Dr. Rhonda{" "}
            </span>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile
                  ? "clamp(24px, 6vw, 32px)"
                  : "clamp(44px, 5vw, 72px)",
                fontWeight: "600",
                lineHeight: isMobile ? 1.3 : 1.05,
                color: "#7D9B76",
                letterSpacing: "-0.025em",
                fontStyle: "italic",
              }}
            >
              Patrick{" "}
            </span>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile
                  ? "clamp(24px, 6vw, 32px)"
                  : "clamp(44px, 5vw, 72px)",
                fontWeight: "400",
                lineHeight: isMobile ? 1.3 : 1.05,
                color: "#2D2D2D",
                letterSpacing: "-0.025em",
              }}
            ></span>
          </div>

          {/* Sub */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isMobile ? "14px" : "15px",
              lineHeight: 1.85,
              color: "#6B6B6B",
              maxWidth: isMobile ? "100%" : "400px",
              marginBottom: "28px",
              fontWeight: "300",
              animation: "slideUp 0.6s ease-out 0.35s both",
            }}
          >
            Researcher, scientist & longevity expert. Dr. Rhonda Patrick bridges
            cutting-edge nutrition science with practical health strategies —
            helping you optimize your body, mind, and lifespan through
            evidence-based medicine.
          </p>

          {/* Buttons */}
          <div
            ref={btnsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              width: isMobile ? "100%" : "auto",
              maxWidth: isMobile ? "360px" : "none",
              animation: "slideUp 0.6s ease-out 0.42s both",
            }}
          >
            {[
              { label: "Book Appointment", to: "/appointment", fill: true },
              { label: "Our Services", to: "/services", fill: false },
            ].map((btn) => (
              <Link
                key={btn.label}
                to={btn.to}
                style={{
                  padding: isMobile ? "12px 8px" : "13px 30px",
                  backgroundColor: btn.fill ? "#7D9B76" : "transparent",
                  color: btn.fill ? "#FDFAF5" : "#2D2D2D",
                  fontFamily: "var(--font-body)",
                  fontSize: isMobile ? "10px" : "11px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  border: btn.fill ? "1px solid #7D9B76" : "1px solid #2D2D2D",
                  transition: "all 0.3s",
                  display: "block",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = btn.fill
                    ? "transparent"
                    : "#2D2D2D";
                  e.currentTarget.style.color = btn.fill
                    ? "#7D9B76"
                    : "#FDFAF5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = btn.fill
                    ? "#7D9B76"
                    : "transparent";
                  e.currentTarget.style.color = btn.fill
                    ? "#FDFAF5"
                    : "#2D2D2D";
                }}
              >
                {btn.label}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2,1fr)"
                : "repeat(4, 1fr)",
              gap: isMobile ? "14px" : "20px",
              marginTop: isMobile ? "36px" : "48px",
              paddingTop: isMobile ? "28px" : "36px",
              borderTop: "1px solid #E8DDD0",
              animation: "slideUp 0.6s ease-out 0.5s both",
            }}
          >
            {[
              { num: "12+", label: "Years" },
              { num: "8,000+", label: "Patients" },
              { num: "24", label: "Specialists" },
              { num: "98%", label: "Satisfaction" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: isMobile ? "22px" : "30px",
                    fontWeight: "600",
                    color: "#2D2D2D",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "9px",
                    color: "#7D9B76",
                    letterSpacing: "0.1em",
                    marginTop: "4px",
                    textTransform: "uppercase",
                    fontWeight: "500",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — image */}
        {
          <div
            ref={imgRef}
            style={{
              position: "relative",
              animation: "slideInRight 0.8s ease-out 0.2s both",
              order: isMobile ? -1 : 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: isMobile ? "3/2" : "4/5",
                overflow: "hidden",
              }}
            >
              <img
                src="/images/hero.jpg"
                alt="Wellness Clinic"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
              <div
                style={{
                  display: "none",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(145deg,#E8DDD0 0%,#F5EFE6 45%,#D4C8B8 100%)",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
                  <path
                    d="M30 5C30 5 8 18 8 35C8 46 18 55 30 55C42 55 52 46 52 35C52 18 30 5 30 5Z"
                    fill="#7D9B76"
                    opacity="0.4"
                  />
                  <path
                    d="M30 55V20M30 20C30 20 38 26 42 34"
                    stroke="#7D9B76"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "#7D9B76",
                    textTransform: "uppercase",
                  }}
                >
                  Add /public/images/hero.jpg
                </span>
              </div>
            </div>

            {/* Floating cards */}
            <div
              style={{
                position: "absolute",
                top: isTablet ? "-10px" : "-16px",
                left: isTablet ? "-10px" : "-20px",
                backgroundColor: "#FDFAF5",
                border: "1px solid #E8DDD0",
                padding: "12px 16px",
                boxShadow: "0 8px 28px rgba(45,45,45,0.07)",
                minWidth: "140px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "9px",
                  fontWeight: "600",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7D9B76",
                  marginBottom: "3px",
                }}
              >
                Next Available
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#2D2D2D",
                }}
              >
                Today, 2:30 PM
              </div>
              <div
                style={{
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#7D9B76",
                  marginTop: "5px",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: isTablet ? "-10px" : "-16px",
                right: isTablet ? "-10px" : "-20px",
                backgroundColor: "#7D9B76",
                padding: "12px 16px",
                boxShadow: "0 8px 28px rgba(125,155,118,0.22)",
                minWidth: "125px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "9px",
                  fontWeight: "600",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(253,250,245,0.6)",
                  marginBottom: "3px",
                }}
              >
                Certified
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#FDFAF5",
                }}
              >
                24 Specialists
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "-6px",
                right: "-6px",
                width: "40px",
                height: "40px",
                borderTop: "2px solid #C9896A",
                borderRight: "2px solid #C9896A",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-6px",
                left: "-6px",
                width: "40px",
                height: "40px",
                borderBottom: "2px solid #C9896A",
                borderLeft: "2px solid #C9896A",
              }}
            />
          </div>
        }
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "9px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#7D9B76",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "28px",
            background: "#7D9B76",
            animation: "scrollA 1.8s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scrollA {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          30%  { opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
