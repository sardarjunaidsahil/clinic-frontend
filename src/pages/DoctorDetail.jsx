import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";
import api from "../services/api";

export default function DoctorDetail() {
  const { id } = useParams();
  const { isMobile, isTablet } = useResponsive();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    api
      .get(`/doctors/${id}`)
      .then((res) => setDoctor(res?.data || null))
      .catch((e) => setError(e?.message || "Doctor not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <main
        style={{
          backgroundColor: "#FDFAF5",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "2px solid #E8DDD0",
              borderTopColor: "#7D9B76",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 14px",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "#6B6B6B",
            }}
          >
            Loading doctor profile...
          </p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </main>
    );

  if (error || !doctor)
    return (
      <main
        style={{
          backgroundColor: "#FDFAF5",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "48px",
            color: "#7D9B76",
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "28px",
            color: "#2D2D2D",
            fontWeight: "400",
          }}
        >
          Doctor not found
        </h1>
        <Link
          to="/doctors"
          style={{
            padding: "12px 28px",
            backgroundColor: "#7D9B76",
            color: "#FDFAF5",
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          All Doctors
        </Link>
      </main>
    );

  const initials = (doctor.name || "")
    .split(" ")
    .filter((w) => w !== "Dr.")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const isAvail = doctor.is_available;
  const schedules = doctor.schedules || [];
  const reviews = doctor.reviews || [];

  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <main style={{ backgroundColor: "#FDFAF5", minHeight: "100vh" }}>
      {/* ── HERO STRIP ── */}
      <div
        style={{
          backgroundColor: "#F5EFE6",
          borderBottom: "1px solid #E8DDD0",
          padding: isMobile ? "32px 24px 24px" : "44px 48px 32px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <button
            onClick={() => navigate("/doctors")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "#7D9B76",
              padding: 0,
              marginBottom: "20px",
              letterSpacing: "0.04em",
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
            Back to Doctors
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: isMobile ? "16px" : "28px",
              flexWrap: "wrap",
            }}
          >
            {/* Photo */}
            <div
              style={{
                width: isMobile ? "80px" : "110px",
                height: isMobile ? "80px" : "110px",
                backgroundColor: "#7D9B76",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {doctor.photo_url ? (
                <img
                  src={doctor.photo_url}
                  alt={doctor.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                  display: doctor.photo_url ? "none" : "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#7D9B76",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: isMobile ? "28px" : "40px",
                    fontWeight: "600",
                    color: "#FDFAF5",
                  }}
                >
                  {initials}
                </span>
              </div>
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9896A",
                  marginBottom: "6px",
                }}
              >
                {doctor.specialty}
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: isMobile ? "28px" : "clamp(28px,3.5vw,44px)",
                  fontWeight: "400",
                  color: "#2D2D2D",
                  letterSpacing: "-0.01em",
                  marginBottom: "8px",
                  lineHeight: 1.1,
                }}
              >
                {doctor.name}
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginBottom: "12px",
                }}
              >
                {/* Stars */}
                <div
                  style={{ display: "flex", gap: "2px", alignItems: "center" }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color:
                          i < Math.round(doctor.rating || 5)
                            ? "#C9896A"
                            : "#E8DDD0",
                        fontSize: "14px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "#6B6B6B",
                      marginLeft: "6px",
                    }}
                  >
                    {Number(doctor.rating || 5).toFixed(1)} (
                    {doctor.total_reviews || 0} reviews)
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#6B6B6B",
                  }}
                >
                  {doctor.experience_years} Years Experience
                </span>
                <span
                  style={{
                    padding: "2px 9px",
                    backgroundColor: isAvail ? "#F5EFE6" : "#F5F5F5",
                    border: `1px solid ${isAvail ? "#7D9B76" : "#E8DDD0"}`,
                    fontFamily: "var(--font-body)",
                    fontSize: "9px",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: isAvail ? "#7D9B76" : "#6B6B6B",
                  }}
                >
                  {isAvail ? "Available" : "Currently Busy"}
                </span>
              </div>

              {doctor.qualification && (
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#6B6B6B",
                  }}
                >
                  {doctor.qualification}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "32px 24px" : "48px 48px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 340px",
          gap: isMobile ? "36px" : "48px",
          alignItems: "start",
        }}
      >
        {/* LEFT */}
        <div>
          {/* Bio */}
          {doctor.bio && (
            <div style={{ marginBottom: "36px" }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9896A",
                  marginBottom: "12px",
                }}
              >
                About
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  lineHeight: 1.85,
                  color: "#4A4A4A",
                  fontWeight: "300",
                }}
              >
                {doctor.bio}
              </p>
            </div>
          )}

          {/* Schedule */}
          {schedules.length > 0 && (
            <div style={{ marginBottom: "36px" }}>
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
                Weekly Schedule
              </div>
              <div
                style={{
                  border: "1px solid #E8DDD0",
                  backgroundColor: "#E8DDD0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                }}
              >
                {DAYS.map((day, idx) => {
                  const sch = schedules.find(
                    (s) => +s.day === idx || +s.day_of_week === idx,
                  );
                  return (
                    <div
                      key={day}
                      style={{
                        backgroundColor: "#FDFAF5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "11px 16px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          fontWeight: "600",
                          color:
                            sch?.available || sch?.is_available
                              ? "#2D2D2D"
                              : "#BDBDBD",
                        }}
                      >
                        {day}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "12px",
                          color:
                            sch?.available || sch?.is_available
                              ? "#7D9B76"
                              : "#BDBDBD",
                        }}
                      >
                        {sch?.available || sch?.is_available
                          ? `${sch.start || sch.start_time} – ${sch.end || sch.end_time}`
                          : "Closed"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div>
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
              Patient Reviews {reviews.length > 0 && `(${reviews.length})`}
            </div>

            {reviews.length === 0 ? (
              <div
                style={{
                  padding: "28px",
                  textAlign: "center",
                  border: "1px solid #E8DDD0",
                  backgroundColor: "#F5EFE6",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#6B6B6B",
                  }}
                >
                  No reviews yet. Be the first to review!
                </p>
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid #E8DDD0",
                  backgroundColor: "#E8DDD0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                }}
              >
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    style={{ backgroundColor: "#FDFAF5", padding: "18px 20px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "8px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "2px" }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            style={{
                              color: i < rev.rating ? "#C9896A" : "#E8DDD0",
                              fontSize: "12px",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#7D9B76",
                        }}
                      >
                        {rev.patient_name || "Anonymous"}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "11px",
                          color: "#6B6B6B",
                          marginLeft: "auto",
                        }}
                      >
                        {rev.created_at
                          ? new Date(rev.created_at).toLocaleDateString(
                              "en-PK",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : ""}
                      </span>
                    </div>
                    {rev.comment && (
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          lineHeight: 1.65,
                          color: "#4A4A4A",
                          fontWeight: "300",
                          fontStyle: "italic",
                        }}
                      >
                        "{rev.comment}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Booking Card */}
        <div style={{ position: isMobile ? "static" : "sticky", top: "120px" }}>
          {/* Fee card */}
          <div
            style={{
              backgroundColor: "#F5EFE6",
              border: "1px solid #E8DDD0",
              padding: "24px",
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
              Book Appointment
            </div>

            <div
              style={{
                marginBottom: "12px",
                paddingBottom: "12px",
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
                Consultation Fee
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "28px",
                  fontWeight: "500",
                  color: "#2D2D2D",
                }}
              >
                PKR{" "}
                {doctor.consultation_fee
                  ? Number(doctor.consultation_fee).toLocaleString()
                  : "—"}
              </div>
            </div>

            <div
              style={{
                marginBottom: "20px",
                paddingBottom: "16px",
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
                Specialty
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "#2D2D2D",
                }}
              >
                {doctor.specialty}
              </div>
            </div>

            <Link
              to={`/appointment`}
              state={{
                service: doctor.specialty,
                doctorId: doctor.id,
                doctorName: doctor.name,
              }}
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
                marginBottom: "8px",
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
              Book Now
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
              View All Doctors
            </Link>
          </div>

          {/* Note */}
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
              <circle cx="8" cy="8" r="6" stroke="#7D9B76" strokeWidth="1.2" />
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
              Most insurance providers accepted. Please arrive 10 minutes early
              for your first appointment.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
