import { SERVICES_LIST } from "../../constants/services";
import useResponsive from "../../hooks/useResponsive";

export default function StepService({ selected, onSelect }) {
  const { isMobile } = useResponsive();

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
        Select a Service
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: "#6B6B6B",
          marginBottom: "24px",
        }}
      >
        Choose the wellness service you need
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: "1px",
          backgroundColor: "#E8DDD0",
          border: "1px solid #E8DDD0",
        }}
      >
        {SERVICES_LIST.map((svc) => {
          const isSelected = selected === svc.label;
          return (
            <div
              key={svc.slug}
              onClick={() => onSelect(svc.label)}
              style={{
                padding: "18px 22px",
                cursor: "pointer",
                backgroundColor: isSelected ? "#F5EFE6" : "#FDFAF5",
                borderLeft: isSelected
                  ? `3px solid ${svc.color}`
                  : "3px solid transparent",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
              onMouseEnter={(e) => {
                if (!isSelected)
                  e.currentTarget.style.backgroundColor = "#FAF7F4";
              }}
              onMouseLeave={(e) => {
                if (!isSelected)
                  e.currentTarget.style.backgroundColor = "#FDFAF5";
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span style={{ fontSize: "20px" }}>{svc.icon}</span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: isSelected ? "#2D2D2D" : "#4A4A4A",
                  }}
                >
                  {svc.label}
                </span>
              </div>
              {isSelected && (
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: svc.color,
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
