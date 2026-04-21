import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useResponsive from "../../hooks/useResponsive";

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSignup() {
  const { isMobile } = useResponsive();
  const sectionRef = useRef(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 32 },
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
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      style={{
        backgroundColor: "#7D9B76",
        padding: isMobile ? "56px 24px" : "80px 48px",
      }}
    >
      <div
        ref={sectionRef}
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
          opacity: 0,
        }}
      >
        {/* Leaf */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 60 60"
          fill="none"
          style={{ marginBottom: "20px" }}
        >
          <path
            d="M30 5C30 5 8 18 8 35C8 46 18 55 30 55C42 55 52 46 52 35C52 18 30 5 30 5Z"
            fill="rgba(253,250,245,0.25)"
          />
          <path
            d="M30 55V20M30 20C30 20 38 26 42 34"
            stroke="rgba(253,250,245,0.6)"
            strokeWidth="2"
            strokeLinecap="square"
          />
        </svg>

        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: isMobile ? "32px" : "48px",
            fontWeight: "400",
            color: "#FDFAF5",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "14px",
          }}
        >
          Join Our <em style={{ fontStyle: "italic" }}>Wellness</em> Community
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            lineHeight: 1.8,
            color: "rgba(253,250,245,0.75)",
            fontWeight: "300",
            marginBottom: "36px",
            maxWidth: "480px",
            margin: "0 auto 36px",
          }}
        >
          Weekly health insights, seasonal wellness tips, and exclusive access
          to clinic events — delivered with care.
        </p>

        {submitted ? (
          <div
            style={{
              padding: "18px 32px",
              border: "1px solid rgba(253,250,245,0.4)",
              display: "inline-block",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "0.1em",
                color: "#FDFAF5",
              }}
            >
              Thank you — welcome to the community ✦
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "10px" : "0",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: "14px 18px",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "#2D2D2D",
                backgroundColor: "#FDFAF5",
                border: "none",
                outline: "none",
                width: isMobile ? "100%" : "auto",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "14px 28px",
                backgroundColor: "#2D2D2D",
                color: "#FDFAF5",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1a1a1a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#2D2D2D")
              }
            >
              Subscribe
            </button>
          </form>
        )}

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            color: "rgba(253,250,245,0.5)",
            marginTop: "16px",
            letterSpacing: "0.05em",
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
