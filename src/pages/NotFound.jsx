import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import useResponsive from "../hooks/useResponsive";

export default function NotFound() {
  const { isMobile } = useResponsive();
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" },
    );
  }, []);

  return (
    <main
      style={{
        backgroundColor: "#FDFAF5",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
      }}
    >
      <div ref={ref} style={{ textAlign: "center", maxWidth: "480px" }}>
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: isMobile ? "80px" : "120px",
            fontWeight: "300",
            color: "#E8DDD0",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            opacity: 0,
          }}
        >
          404
        </div>

        <div
          style={{
            width: "40px",
            height: "2px",
            backgroundColor: "#7D9B76",
            margin: "16px auto",
            opacity: 0,
          }}
        />

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: isMobile ? "28px" : "36px",
            fontWeight: "400",
            color: "#2D2D2D",
            letterSpacing: "-0.01em",
            marginBottom: "14px",
            opacity: 0,
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            lineHeight: 1.8,
            color: "#6B6B6B",
            fontWeight: "300",
            marginBottom: "32px",
            opacity: 0,
          }}
        >
          The page you are looking for does not exist or has been moved. Let us
          guide you back to wellness.
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: 0,
          }}
        >
          <Link
            to="/"
            style={{
              padding: "12px 28px",
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
            Go Home
          </Link>
          <Link
            to="/appointment"
            style={{
              padding: "12px 28px",
              backgroundColor: "transparent",
              color: "#2D2D2D",
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid #E8DDD0",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2D2D2D";
              e.currentTarget.style.color = "#FDFAF5";
              e.currentTarget.style.borderColor = "#2D2D2D";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#2D2D2D";
              e.currentTarget.style.borderColor = "#E8DDD0";
            }}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </main>
  );
}
