import { useState, useEffect } from "react";
import api from "../../services/api";
import useResponsive from "../../hooks/useResponsive";

export default function StepDoctor({ service, selected, onSelect }) {
  const { isMobile } = useResponsive();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!service) return;
    setLoading(true);
    api
      .get(`/doctors?specialty=${encodeURIComponent(service)}`)
      .then((res) => setDoctors(res?.data || []))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, [service]);

  if (loading)
    return (
      <div
        style={{
          padding: "48px",
          textAlign: "center",
          fontFamily: "var(--font-body)",
          color: "#6B6B6B",
        }}
      >
        Loading doctors...
      </div>
    );

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: isMobile ? "28px" : "36px",
          fontWeight: "400",
          color: "#2D2D2D",
          marginBottom: "6px",
          letterSpacing: "-0.01em",
        }}
      >
        Choose Your Doctor
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: "#6B6B6B",
          marginBottom: "24px",
        }}
      >
        Available specialists for{" "}
        <strong style={{ color: "#7D9B76" }}>{service}</strong>
      </p>

      {doctors.length === 0 ? (
        <div
          style={{
            padding: "40px 24px",
            textAlign: "center",
            border: "1px solid #E8DDD0",
            backgroundColor: "#F5EFE6",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "22px",
              color: "#2D2D2D",
              marginBottom: "8px",
            }}
          >
            No doctors available
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "#6B6B6B",
            }}
          >
            No doctors currently available for {service}. Please try another
            service.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)",
            gap: "12px",
          }}
        >
          {doctors.map((doc) => {
            const isSelected = selected === doc.id;
            const initials = (doc.name || "")
              .split(" ")
              .filter((w) => w !== "Dr.")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={doc.id}
                onClick={() => onSelect(doc.id, doc.name, doc)}
                style={{
                  padding: "20px 22px",
                  cursor: "pointer",
                  backgroundColor: isSelected ? "#F5EFE6" : "#FDFAF5",
                  border: isSelected
                    ? "1px solid #7D9B76"
                    : "1px solid #E8DDD0",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = "#FAF7F4";
                    e.currentTarget.style.borderColor = "#C8D8C5";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = "#FDFAF5";
                    e.currentTarget.style.borderColor = "#E8DDD0";
                  }
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      backgroundColor: isSelected ? "#7D9B76" : "#E8DDD0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background-color 0.2s",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "17px",
                        fontWeight: "600",
                        color: isSelected ? "#FDFAF5" : "#7D9B76",
                      }}
                    >
                      {initials}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#2D2D2D",
                        marginBottom: "3px",
                      }}
                    >
                      {doc.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        color: "#7D9B76",
                        marginBottom: "3px",
                      }}
                    >
                      {doc.specialty}
                    </div>
                    <div
                      style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "11px",
                          color: "#6B6B6B",
                        }}
                      >
                        {doc.experience_years} yrs exp
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#2D2D2D",
                        }}
                      >
                        PKR {Number(doc.consultation_fee).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#7D9B76",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>

                {/* Rating */}
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    marginTop: "10px",
                    paddingTop: "10px",
                    borderTop: "1px solid #F5EFE6",
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
                      marginLeft: "6px",
                    }}
                  >
                    {Number(doc.rating || 5).toFixed(1)} (
                    {doc.total_reviews || 0} reviews)
                  </span>
                  {!doc.is_available && (
                    <span
                      style={{
                        marginLeft: "auto",
                        fontFamily: "var(--font-body)",
                        fontSize: "9px",
                        fontWeight: "600",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#B91C1C",
                        backgroundColor: "#FEF2F2",
                        padding: "2px 7px",
                        border: "1px solid #FECACA",
                      }}
                    >
                      Busy
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
