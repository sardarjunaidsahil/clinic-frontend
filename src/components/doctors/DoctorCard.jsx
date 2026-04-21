import { Link } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";

export default function DoctorCard({ doctor, compact = false }) {
  const { isMobile } = useResponsive();

  const initials = (doctor.name || "")
    .split(" ")
    .filter((w) => w !== "Dr.")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isAvailable = doctor.is_available ?? doctor.available ?? true;
  const fee = doctor.consultation_fee || doctor.fee;
  const exp = doctor.experience_years
    ? `${doctor.experience_years} Years`
    : doctor.experience || "";

  return (
    <Link
      to={`/doctors/${doctor.id}`}
      style={{
        display: "block",
        backgroundColor: "#FDFAF5",
        textDecoration: "none",
        transition: "background-color 0.3s",
        position: "relative",
        padding: compact ? "20px" : isMobile ? "24px" : "32px 28px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5EFE6")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FDFAF5")}
    >
      {/* Available badge */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          padding: "2px 8px",
          backgroundColor: isAvailable ? "#7D9B76" : "#E8DDD0",
          fontFamily: "var(--font-body)",
          fontSize: "8px",
          fontWeight: "600",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: isAvailable ? "#FDFAF5" : "#6B6B6B",
        }}
      >
        {isAvailable ? "Available" : "Busy"}
      </div>

      {/* Avatar / Photo */}
      <div
        style={{
          width: compact ? "52px" : "68px",
          height: compact ? "52px" : "68px",
          backgroundColor: doctor.color || "#7D9B76",
          marginBottom: compact ? "12px" : "18px",
          overflow: "hidden",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {doctor.photo_url ? (
          <img
            src={doctor.photo_url}
            alt={doctor.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
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
            display: doctor.photo_url ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: doctor.color || "#7D9B76",
            position: doctor.photo_url ? "absolute" : "relative",
            top: 0,
            left: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: compact ? "16px" : "24px",
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
        {doctor.specialty}
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: compact ? "18px" : "21px",
          fontWeight: "500",
          color: "#2D2D2D",
          marginBottom: "4px",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}
      >
        {doctor.name}
      </h3>

      {/* Experience */}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "#7D9B76",
          marginBottom: "10px",
        }}
      >
        {exp} Experience
      </div>

      {/* Stars */}
      <div
        style={{
          display: "flex",
          gap: "2px",
          marginBottom: compact ? "0" : "12px",
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            style={{
              color: i < Math.round(doctor.rating || 5) ? "#C9896A" : "#E8DDD0",
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
          {Number(doctor.rating || 5).toFixed(1)}
        </span>
      </div>

      {!compact && (
        <>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "#6B6B6B",
              marginBottom: "16px",
            }}
          >
            Fee:{" "}
            <strong style={{ color: "#2D2D2D" }}>
              {fee ? `PKR ${Number(fee).toLocaleString()}` : "Contact for fee"}
            </strong>
          </div>

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
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="#7D9B76"
                strokeWidth="1.2"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </>
      )}
    </Link>
  );
}
