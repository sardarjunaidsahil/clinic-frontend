import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiInfo, FiCheckCircle, FiX } from "react-icons/fi";
import useResponsive from "../../hooks/useResponsive";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger", // 'danger' | 'info' | 'success' | 'warning'
  isAlert = false,
  onConfirm,
  onCancel,
}) {
  const { isMobile } = useResponsive();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onCancel();
      } else if (e.key === "Enter") {
        onConfirm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onConfirm, onCancel]);

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          iconBg: "#FEF2F2",
          iconBorder: "#FECACA",
          iconColor: "#B91C1C",
          icon: <FiAlertTriangle size={24} />,
          btnBg: "#B91C1C",
          btnHoverBg: "#991B1B",
          btnBorder: "#B91C1C",
        };
      case "success":
        return {
          iconBg: "#F0F7F0",
          iconBorder: "#C3E2C2",
          iconColor: "#7D9B76",
          icon: <FiCheckCircle size={24} />,
          btnBg: "#7D9B76",
          btnHoverBg: "#6A8A63",
          btnBorder: "#7D9B76",
        };
      case "warning":
        return {
          iconBg: "#FFFBEB",
          iconBorder: "#FDE68A",
          iconColor: "#D97706",
          icon: <FiAlertTriangle size={24} />,
          btnBg: "#7D9B76",
          btnHoverBg: "#6A8A63",
          btnBorder: "#7D9B76",
        };
      case "info":
      default:
        return {
          iconBg: "#F5EFE6",
          iconBorder: "#E8DDD0",
          iconColor: "#7D9B76",
          icon: <FiInfo size={24} />,
          btnBg: "#7D9B76",
          btnHoverBg: "#6A8A63",
          btnBorder: "#7D9B76",
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "16px" : "24px",
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCancel}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(45, 45, 45, 0.55)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              position: "relative",
              zIndex: 1,
              backgroundColor: "#F5EFE6",
              border: "1px solid #E8DDD0",
              padding: isMobile ? "28px 20px" : "36px 32px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 20px 48px rgba(45, 45, 45, 0.15)",
            }}
          >
            {/* Close X Button */}
            <button
              onClick={onCancel}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#6B6B6B",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2D2D2D")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B6B")}
              aria-label="Close dialog"
            >
              <FiX size={18} />
            </button>

            {/* Icon Header */}
            <div
              style={{
                width: "52px",
                height: "52px",
                backgroundColor: vStyles.iconBg,
                border: `1px solid ${vStyles.iconBorder}`,
                color: vStyles.iconColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              {vStyles.icon}
            </div>

            {/* Title */}
            {title && (
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: isMobile ? "22px" : "24px",
                  fontWeight: "600",
                  color: "#2D2D2D",
                  textAlign: "center",
                  marginBottom: "10px",
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h3>
            )}

            {/* Message */}
            {message && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "#6B6B6B",
                  lineHeight: 1.6,
                  textAlign: "center",
                  marginBottom: "28px",
                }}
              >
                {message}
              </p>
            )}

            {/* Actions */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isAlert ? "1fr" : "1fr 1fr",
                gap: "12px",
              }}
            >
              {!isAlert && (
                <button
                  type="button"
                  onClick={onCancel}
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "transparent",
                    border: "1px solid #E8DDD0",
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#6B6B6B",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#2D2D2D";
                    e.currentTarget.style.color = "#2D2D2D";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E8DDD0";
                    e.currentTarget.style.color = "#6B6B6B";
                  }}
                >
                  {cancelText}
                </button>
              )}

              <button
                type="button"
                onClick={onConfirm}
                style={{
                  padding: "12px 16px",
                  backgroundColor: vStyles.btnBg,
                  border: `1px solid ${vStyles.btnBorder}`,
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#FDFAF5",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = vStyles.btnHoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = vStyles.btnBg)
                }
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
