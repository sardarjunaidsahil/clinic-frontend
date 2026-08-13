export default function StatusBadge({ status, label, size = "md" }) {
  const normalized = (status || "").toString().toUpperCase();

  const getStyle = () => {
    switch (normalized) {
      case "CONFIRMED":
      case "COMPLETED":
      case "ACTIVE":
      case "AVAILABLE":
        return {
          bg: "#F0F5EF",
          border: "#D2E2CF",
          color: "#5E7A58",
          dot: "#7D9B76",
        };
      case "PENDING":
      case "IN_PROGRESS":
      case "SCHEDULED":
        return {
          bg: "#FAF2EB",
          border: "#F5DEC8",
          color: "#A86343",
          dot: "#C9896A",
        };
      case "CANCELLED":
      case "INACTIVE":
      case "REJECTED":
      case "UNAVAILABLE":
        return {
          bg: "#FEF2F2",
          border: "#FECACA",
          color: "#991B1B",
          dot: "#B91C1C",
        };
      default:
        return {
          bg: "#F5EFE6",
          border: "#E8DDD0",
          color: "#6B6B6B",
          dot: "#6B6B6B",
        };
    }
  };

  const style = getStyle();
  const displayLabel = label || normalized.replace("_", " ");

  const padding = size === "sm" ? "2px 8px" : "4px 10px";
  const fontSize = size === "sm" ? "9px" : "10px";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding,
        backgroundColor: style.bg,
        border: `1px solid ${style.border}`,
        color: style.color,
        fontFamily: "var(--font-body)",
        fontSize,
        fontWeight: "600",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        lineHeight: 1.4,
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          backgroundColor: style.dot,
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {displayLabel}
    </span>
  );
}
