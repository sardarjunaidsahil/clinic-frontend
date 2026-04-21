import useResponsive from "../../hooks/useResponsive";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";

export default function AppointmentCard({ appointment, onCancel }) {
  const { isMobile } = useResponsive();
  const isUpcoming = appointment.status === "upcoming";

  return (
    <div
      style={{
        backgroundColor: "#FDFAF5",
        padding: isMobile ? "18px 20px" : "22px 28px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: "12px",
        transition: "background-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            backgroundColor: isUpcoming ? "#F5EFE6" : "#F5F5F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isUpcoming ? "#7D9B76" : "#6B6B6B",
            flexShrink: 0,
          }}
        >
          <FiCalendar size={18} />
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: "600",
              color: "#2D2D2D",
              marginBottom: "3px",
            }}
          >
            {appointment.service}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "#7D9B76",
              marginBottom: "3px",
            }}
          >
            <FiUser size={11} /> {appointment.doctor}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              color: "#6B6B6B",
            }}
          >
            <FiClock size={11} /> {appointment.date} · {appointment.time}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            padding: "3px 10px",
            backgroundColor: isUpcoming ? "#F5EFE6" : "#F5F5F5",
            border: `1px solid ${isUpcoming ? "#7D9B76" : "#E8DDD0"}`,
            fontFamily: "var(--font-body)",
            fontSize: "9px",
            fontWeight: "600",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: isUpcoming ? "#7D9B76" : "#6B6B6B",
          }}
        >
          {appointment.status}
        </span>
        {isUpcoming && onCancel && (
          <button
            onClick={() => onCancel(appointment.id)}
            style={{
              padding: "5px 14px",
              backgroundColor: "transparent",
              border: "1px solid #E8DDD0",
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: "600",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6B6B6B",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#B91C1C";
              e.currentTarget.style.color = "#B91C1C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E8DDD0";
              e.currentTarget.style.color = "#6B6B6B";
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
