import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useResponsive from "../../hooks/useResponsive";
import api from "../../services/api";

gsap.registerPlugin(ScrollTrigger);

export default function DoctorsPreview() {
  const { isMobile, isTablet } = useResponsive();
  const sectionRef = useRef(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api
      .get("/doctors")
      .then((res) => setDoctors((res?.data || []).slice(0, 4)))
      .catch(() => setDoctors([]));
  }, []);

  useEffect(() => {
    if (!sectionRef.current || doctors.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".doc-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [doctors]);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#FDFAF5",
        padding: isMobile ? "60px 24px" : "80px 48px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: isMobile ? "32px" : "44px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
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
              Our Specialists
            </div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile
                  ? "clamp(28px,8vw,40px)"
                  : "clamp(32px,4vw,52px)",
                fontWeight: "400",
                color: "#2D2D2D",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Meet Our{" "}
              <em style={{ fontStyle: "italic", color: "#7D9B76" }}>Doctors</em>
            </h2>
          </div>
          <Link
            to="/doctors"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#7D9B76",
              textDecoration: "none",
              padding: "10px 20px",
              border: "1px solid #7D9B76",
              transition: "all 0.3s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#7D9B76";
              e.currentTarget.style.color = "#FDFAF5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#7D9B76";
            }}
          >
            All Doctors
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="square"
              />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        {doctors.length === 0 ? (
          /* Skeleton loading */
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
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                style={{ backgroundColor: "#FDFAF5", padding: "32px 28px" }}
              >
                <div
                  style={{
                    width: "68px",
                    height: "68px",
                    backgroundColor: "#F5EFE6",
                    marginBottom: "18px",
                  }}
                />
                <div
                  style={{
                    height: "10px",
                    backgroundColor: "#F5EFE6",
                    marginBottom: "10px",
                    width: "60%",
                  }}
                />
                <div
                  style={{
                    height: "20px",
                    backgroundColor: "#F5EFE6",
                    marginBottom: "8px",
                    width: "80%",
                  }}
                />
                <div
                  style={{
                    height: "12px",
                    backgroundColor: "#F5EFE6",
                    width: "40%",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
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
            {doctors.map((doc) => {
              const initials = (doc.name || "")
                .split(" ")
                .filter((w) => w !== "Dr.")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              const isAvail = doc.is_available;

              return (
                <Link
                  key={doc.id}
                  to={`/doctors/${doc.id}`}
                  className="doc-card"
                  style={{
                    display: "block",
                    backgroundColor: "#FDFAF5",
                    padding: isMobile ? "24px" : "32px 28px",
                    textDecoration: "none",
                    transition: "background-color 0.3s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#F5EFE6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#FDFAF5")
                  }
                >
                  {/* Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      padding: "2px 7px",
                      backgroundColor: isAvail ? "#7D9B76" : "#E8DDD0",
                      fontFamily: "var(--font-body)",
                      fontSize: "8px",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: isAvail ? "#FDFAF5" : "#6B6B6B",
                    }}
                  >
                    {isAvail ? "Available" : "Busy"}
                  </div>

                  {/* Photo / Avatar */}
                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      backgroundColor: "#7D9B76",
                      marginBottom: "18px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {doc.photo_url ? (
                      <img
                        src={doc.photo_url}
                        alt={doc.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: doc.photo_url ? "none" : "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: doc.photo_url ? "absolute" : "relative",
                        top: 0,
                        left: 0,
                        backgroundColor: "#7D9B76",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "24px",
                          fontWeight: "600",
                          color: "#FDFAF5",
                        }}
                      >
                        {initials}
                      </span>
                    </div>
                  </div>

                  {/* Specialty */}
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "9px",
                      fontWeight: "600",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#C9896A",
                      marginBottom: "5px",
                    }}
                  >
                    {doc.specialty}
                  </div>

                  {/* Name */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "21px",
                      fontWeight: "500",
                      color: "#2D2D2D",
                      marginBottom: "4px",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                    }}
                  >
                    {doc.name}
                  </h3>

                  {/* Exp */}
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "#7D9B76",
                      marginBottom: "10px",
                    }}
                  >
                    {doc.experience_years} Years Experience
                  </div>

                  {/* Stars */}
                  <div
                    style={{
                      display: "flex",
                      gap: "2px",
                      marginBottom: "14px",
                      alignItems: "center",
                    }}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color:
                            i < Math.round(doc.rating || 5)
                              ? "#C9896A"
                              : "#E8DDD0",
                          fontSize: "12px",
                        }}
                      >
                        ★
                      </span>
                    ))}
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        color: "#6B6B6B",
                        marginLeft: "5px",
                      }}
                    >
                      {Number(doc.rating || 5).toFixed(1)}
                    </span>
                  </div>

                  {/* CTA */}
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
                    View Profile
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="#7D9B76"
                        strokeWidth="1.2"
                        strokeLinecap="square"
                      />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
