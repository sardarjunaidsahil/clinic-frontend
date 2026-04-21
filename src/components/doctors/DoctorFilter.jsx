import { SPECIALTY_FILTERS } from "../../constants/services";
import useResponsive from "../../hooks/useResponsive";

export default function DoctorFilter({ active, onChange }) {
  const { isMobile } = useResponsive();

  return (
    <div
      style={{
        backgroundColor: "#FDFAF5",
        borderBottom: "1px solid #E8DDD0",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        style={{
          display: "flex",
          minWidth: "max-content",
          padding: isMobile ? "0 24px" : "0 48px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {SPECIALTY_FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            style={{
              padding: "14px 18px",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              backgroundColor: "transparent",
              color: active === filter ? "#7D9B76" : "#6B6B6B",
              borderBottom:
                active === filter
                  ? "2px solid #7D9B76"
                  : "2px solid transparent",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
