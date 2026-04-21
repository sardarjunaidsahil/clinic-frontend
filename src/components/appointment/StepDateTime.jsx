import { useState, useEffect } from "react";
import CalendarPicker from "./CalendarPicker";
import useResponsive from "../../hooks/useResponsive";
import api from "../../services/api";

export default function StepDateTime({
  doctorId,
  doctor,
  date,
  time,
  onDateSelect,
  onTimeSelect,
}) {
  const { isMobile } = useResponsive();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!doctorId || !date) {
      setSlots([]);
      return;
    }
    setLoading(true);
    const dateStr =
      date instanceof Date ? date.toISOString().split("T")[0] : date;
    api
      .get(`/appointments/slots?doctorId=${doctorId}&date=${dateStr}`)
      .then((res) => setSlots(res?.data || []))
      .catch(() => setSlots([]))
      .finally(() => setLoading(false));
  }, [doctorId, date]);

  const formatDate = (d) => {
    if (!d) return "";
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toLocaleDateString("en-PK", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

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
        Pick a Date & Time
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: "#6B6B6B",
          marginBottom: "24px",
        }}
      >
        With <strong style={{ color: "#7D9B76" }}>{doctor}</strong>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Calendar */}
        <CalendarPicker selected={date} onSelect={onDateSelect} />

        {/* Time slots */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: "600",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#7D9B76",
              marginBottom: "12px",
            }}
          >
            {date
              ? `Available slots — ${formatDate(date)}`
              : "Select a date first"}
          </div>

          {!date ? (
            <div
              style={{
                padding: "32px 20px",
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
                Please select a date to see available slots
              </p>
            </div>
          ) : loading ? (
            <div
              style={{
                padding: "32px 20px",
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
                Loading slots...
              </p>
            </div>
          ) : slots.length === 0 ? (
            <div
              style={{
                padding: "32px 20px",
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
                No slots available for this date. Try another date.
              </p>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "6px",
                }}
              >
                {slots.map(({ time: t, available }) => {
                  const isSelected = time === t;
                  return (
                    <button
                      key={t}
                      onClick={() => available && onTimeSelect(t)}
                      disabled={!available}
                      style={{
                        padding: "10px 4px",
                        backgroundColor: isSelected
                          ? "#7D9B76"
                          : !available
                            ? "#F5F5F5"
                            : "#FDFAF5",
                        border: isSelected
                          ? "1px solid #7D9B76"
                          : "1px solid #E8DDD0",
                        color: isSelected
                          ? "#FDFAF5"
                          : !available
                            ? "#C8C8C8"
                            : "#2D2D2D",
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        cursor: !available ? "not-allowed" : "pointer",
                        transition: "all 0.15s",
                        textDecoration: !available ? "line-through" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (available && !isSelected)
                          e.currentTarget.style.backgroundColor = "#F5EFE6";
                      }}
                      onMouseLeave={(e) => {
                        if (available && !isSelected)
                          e.currentTarget.style.backgroundColor = "#FDFAF5";
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              {time && date && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "10px 14px",
                    backgroundColor: "#F5EFE6",
                    border: "1px solid #7D9B76",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: "#7D9B76",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "#7D9B76",
                      fontWeight: "600",
                    }}
                  >
                    {formatDate(date)} at {time} ✓
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
