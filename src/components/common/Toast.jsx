import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

// ── Toast Item ──
function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Enter animation
    const t1 = setTimeout(() => setVisible(true), 10);
    // Auto remove
    const t2 = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => onRemove(toast.id), 350);
    }, toast.duration || 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const TYPES = {
    success: {
      icon: <FiCheckCircle size={18} />,
      accent: "#7D9B76",
      bg: "#F0F7F0",
      border: "#7D9B76",
      color: "#2D5C25",
    },
    error: {
      icon: <FiXCircle size={18} />,
      accent: "#B91C1C",
      bg: "#FEF2F2",
      border: "#B91C1C",
      color: "#7F1D1D",
    },
    info: {
      icon: <FiInfo size={18} />,
      accent: "#7D9B76",
      bg: "#F5EFE6",
      border: "#C9896A",
      color: "#2D2D2D",
    },
    warning: {
      icon: <FiAlertCircle size={18} />,
      accent: "#D97706",
      bg: "#FFFBEB",
      border: "#D97706",
      color: "#78350F",
    },
  };

  const t = TYPES[toast.type] || TYPES.info;

  const transform =
    visible && !leaving
      ? "translateX(0) scale(1)"
      : "translateX(110%) scale(0.95)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "14px 16px",
        backgroundColor: t.bg,
        border: `1px solid ${t.border}`,
        borderLeft: `3px solid ${t.accent}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        minWidth: "280px",
        maxWidth: "360px",
        width: "100%",
        transform,
        opacity: visible && !leaving ? 1 : 0,
        transition:
          "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease",
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Icon */}
      <span style={{ color: t.accent, flexShrink: 0, marginTop: "1px" }}>
        {t.icon}
      </span>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {toast.title && (
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: "600",
              color: t.color,
              marginBottom: toast.message ? "3px" : 0,
              letterSpacing: "0.01em",
            }}
          >
            {toast.title}
          </div>
        )}
        {toast.message && (
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: t.color,
              opacity: 0.85,
              lineHeight: 1.5,
            }}
          >
            {toast.message}
          </div>
        )}
      </div>

      {/* Close */}
      <button
        onClick={() => {
          setLeaving(true);
          setTimeout(() => onRemove(toast.id), 350);
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: t.accent,
          opacity: 0.6,
          padding: "0 0 0 4px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
      >
        <FiX size={14} />
      </button>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          backgroundColor: t.accent,
          opacity: 0.4,
          animation: `toastProgress ${toast.duration || 3500}ms linear forwards`,
        }}
      />

      <style>{`
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}

// ── Toast Container ──
export function ToastContainer({ toasts, removeToast }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "flex-end",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} style={{ pointerEvents: "auto" }}>
          <ToastItem toast={toast} onRemove={removeToast} />
        </div>
      ))}
    </div>,
    document.body,
  );
}

// ── Mobile responsive style ──
const mobileStyle = `
  @media (max-width: 480px) {
    .toast-wrap {
      bottom: 16px !important;
      right: 16px !important;
      left: 16px !important;
    }
    .toast-wrap > div > div {
      min-width: unset !important;
      max-width: 100% !important;
      width: 100% !important;
    }
  }
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = mobileStyle;
  document.head.appendChild(style);
}
