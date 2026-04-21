import { Link } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import { formatDateLong } from "../../utils/formatDate";

export default function StepConfirm({ form, onConfirm }) {
  const { isMobile } = useResponsive();

  const rows = [
    { label: "Service", value: form.service },
    { label: "Doctor", value: form.doctor },
    { label: "Date", value: form.date ? formatDateLong(form.date) : "" },
    { label: "Time", value: form.time },
    { label: "Patient Name", value: form.name },
    { label: "Email", value: form.email },
    { label: "Phone", value: form.phone },
    ...(form.age ? [{ label: "Age", value: form.age }] : []),
  ];

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
        Review & Confirm
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: "#6B6B6B",
          marginBottom: "24px",
        }}
      >
        Please review your appointment details below
      </p>

      {/* Summary */}
      <div
        style={{
          backgroundColor: "#F5EFE6",
          border: "1px solid #E8DDD0",
          padding: isMobile ? "20px" : "28px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            fontWeight: "600",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C9896A",
            marginBottom: "16px",
          }}
        >
          Appointment Summary
        </div>
        {rows.map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              padding: "10px 0",
              borderBottom: "1px solid #E8DDD0",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#7D9B76",
                flexShrink: 0,
                minWidth: "120px",
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "#2D2D2D",
                fontWeight: "500",
                textAlign: isMobile ? "left" : "right",
              }}
            >
              {row.value}
            </span>
          </div>
        ))}

        {form.symptoms && (
          <div style={{ paddingTop: "12px" }}>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#7D9B76",
                marginBottom: "6px",
              }}
            >
              Symptoms
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "#2D2D2D",
                lineHeight: 1.6,
              }}
            >
              {form.symptoms}
            </span>
          </div>
        )}
      </div>

      {/* Notice */}
      <div
        style={{
          padding: "12px 16px",
          backgroundColor: "#FDFAF5",
          border: "1px solid #E8DDD0",
          marginBottom: "20px",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <svg
          width="16"
          height="16"
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
            fontSize: "12px",
            lineHeight: 1.6,
            color: "#6B6B6B",
            fontWeight: "300",
          }}
        >
          A confirmation email will be sent to{" "}
          <strong style={{ color: "#2D2D2D" }}>{form.email}</strong> once your
          appointment is confirmed by our team.
        </p>
      </div>

      {/* Confirm button */}
      <button
        onClick={onConfirm}
        style={{
          width: "100%",
          padding: "16px",
          backgroundColor: "#7D9B76",
          color: "#FDFAF5",
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          fontWeight: "600",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          border: "1px solid #7D9B76",
          cursor: "pointer",
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
        Confirm Appointment
      </button>
    </div>
  );
}
