import { FiFileText, FiDownload } from "react-icons/fi";
import useResponsive from "../../hooks/useResponsive";

export default function MedicalRecord({ record }) {
  const { isMobile } = useResponsive();

  return (
    <div
      style={{
        backgroundColor: "#FDFAF5",
        padding: isMobile ? "16px 20px" : "20px 28px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            backgroundColor: "#F5EFE6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7D9B76",
            flexShrink: 0,
          }}
        >
          <FiFileText size={18} />
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: "600",
              color: "#2D2D2D",
              marginBottom: "2px",
            }}
          >
            {record.title}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              color: "#6B6B6B",
            }}
          >
            {record.doctor} · {record.date}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            padding: "3px 10px",
            backgroundColor: "#F5EFE6",
            fontFamily: "var(--font-body)",
            fontSize: "9px",
            fontWeight: "600",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#C9896A",
          }}
        >
          {record.type}
        </span>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 14px",
            backgroundColor: "#7D9B76",
            color: "#FDFAF5",
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            fontWeight: "600",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#5E7A58")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#7D9B76")
          }
        >
          <FiDownload size={12} /> Download
        </button>
      </div>
    </div>
  );
}
