import { FiInbox, FiCalendar, FiUserCheck, FiSearch } from "react-icons/fi";
import useResponsive from "../../hooks/useResponsive";

export default function EmptyState({
  title = "No Items Found",
  description = "There are no entries to display right now.",
  actionLabel,
  onAction,
  icon = "inbox", // 'inbox' | 'calendar' | 'doctor' | 'search' | custom JSX
}) {
  const { isMobile } = useResponsive();

  const renderIcon = () => {
    if (typeof icon !== "string") return icon;
    switch (icon) {
      case "calendar":
        return <FiCalendar size={28} />;
      case "doctor":
        return <FiUserCheck size={28} />;
      case "search":
        return <FiSearch size={28} />;
      case "inbox":
      default:
        return <FiInbox size={28} />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F5EFE6",
        border: "1px solid #E8DDD0",
        padding: isMobile ? "32px 20px" : "48px 32px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "560px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          backgroundColor: "#FDFAF5",
          border: "1px solid #E8DDD0",
          color: "#7D9B76",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        {renderIcon()}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: isMobile ? "22px" : "24px",
          fontWeight: "600",
          color: "#2D2D2D",
          marginBottom: "8px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: "#6B6B6B",
          lineHeight: 1.6,
          maxWidth: "400px",
          marginBottom: actionLabel && onAction ? "24px" : 0,
        }}
      >
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          style={{
            padding: "11px 22px",
            backgroundColor: "#7D9B76",
            border: "1px solid #7D9B76",
            color: "#FDFAF5",
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#6A8A63";
            e.currentTarget.style.borderColor = "#6A8A63";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#7D9B76";
            e.currentTarget.style.borderColor = "#7D9B76";
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
