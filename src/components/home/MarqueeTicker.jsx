import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const items = [
  "General Wellness",
  "Mental Health",
  "Nutrition & Diet",
  "Physical Therapy",
  "Skin & Aesthetics",
  "Holistic Healing",
  "Premium Care",
  "Expert Doctors",
  "Your Health First",
];

export default function MarqueeTicker() {
  const track1 = useRef(null);
  const track2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(track1.current, {
        x: "-50%",
        duration: 22,
        ease: "none",
        repeat: -1,
      });
      gsap.to(track2.current, {
        x: "-50%",
        duration: 18,
        ease: "none",
        repeat: -1,
        direction: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const renderItems = (color) =>
    [...items, ...items].map((item, i) => (
      <span
        key={i}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "16px",
          padding: "0 24px",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          fontWeight: "500",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color,
        }}
      >
        {item}
        <span
          style={{
            width: "4px",
            height: "4px",
            background: color === "#FDFAF5" ? "#C9896A" : "#7D9B76",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
      </span>
    ));

  return (
    <div style={{ overflow: "hidden" }}>
      {/* Row 1 — sage bg */}
      <div
        style={{
          backgroundColor: "#7D9B76",
          padding: "14px 0",
          overflow: "hidden",
        }}
      >
        <div
          ref={track1}
          style={{ display: "inline-flex", willChange: "transform" }}
        >
          {renderItems("#FDFAF5")}
        </div>
      </div>

      {/* Row 2 — beige bg */}
      <div
        style={{
          backgroundColor: "#F5EFE6",
          padding: "12px 0",
          overflow: "hidden",
          borderTop: "1px solid #E8DDD0",
          borderBottom: "1px solid #E8DDD0",
        }}
      >
        <div
          ref={track2}
          style={{ display: "inline-flex", willChange: "transform" }}
        >
          {renderItems("#7D9B76")}
        </div>
      </div>
    </div>
  );
}
