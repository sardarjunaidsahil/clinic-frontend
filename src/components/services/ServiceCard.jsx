import { useRef } from "react";
import useResponsive from "../../hooks/useResponsive";

export default function ServiceCard({ service, onClick }) {
  const { isMobile } = useResponsive();
  const accRef = useRef(null);

  return (
    <div
      onClick={() => onClick && onClick(service)}
      style={{
        backgroundColor: "#FDFAF5",
        padding: isMobile ? "28px 22px" : "40px 32px",
        cursor: "pointer",
        transition: "background-color 0.3s",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#F5EFE6";
        if (accRef.current) accRef.current.style.width = "100%";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#FDFAF5";
        if (accRef.current) accRef.current.style.width = "0%";
      }}
    >
      {/* Top accent slide */}
      <div
        ref={accRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "2px",
          width: "0%",
          backgroundColor: service.color || "#7D9B76",
          transition: "width 0.4s ease",
        }}
      />

      {/* Tag */}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "9px",
          fontWeight: "600",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#C9896A",
          marginBottom: "16px",
        }}
      >
        {service.tagline}
      </div>

      {/* Icon */}
      <div
        style={{ fontSize: isMobile ? "26px" : "32px", marginBottom: "14px" }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: isMobile ? "22px" : "26px",
          fontWeight: "500",
          color: "#2D2D2D",
          marginBottom: "10px",
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
        }}
      >
        {service.title}
      </h3>

      {/* Desc */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          lineHeight: 1.7,
          color: "#6B6B6B",
          fontWeight: "300",
          marginBottom: "20px",
          flex: 1,
        }}
      >
        {service.desc}
      </p>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "14px",
          borderTop: "1px solid #F5EFE6",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "#7D9B76",
            fontWeight: "500",
          }}
        >
          {service.price}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#7D9B76",
          }}
        >
          Learn More
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="#7D9B76"
              strokeWidth="1.2"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
