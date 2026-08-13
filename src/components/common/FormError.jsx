import { FiAlertCircle } from "react-icons/fi";

export default function FormError({ message, style = {} }) {
  if (!message) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 12px",
        backgroundColor: "#FEF2F2",
        border: "1px solid #FECACA",
        color: "#B91C1C",
        fontFamily: "var(--font-body)",
        fontSize: "12px",
        fontWeight: "500",
        lineHeight: 1.4,
        marginTop: "6px",
        ...style,
      }}
    >
      <FiAlertCircle size={14} style={{ flexShrink: 0 }} />
      <span>{message}</span>
    </div>
  );
}
