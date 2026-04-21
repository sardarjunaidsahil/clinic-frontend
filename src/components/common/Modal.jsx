import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import useResponsive from "../../hooks/useResponsive";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  const { isMobile } = useResponsive();

  const maxWidths = { sm: "380px", md: "540px", lg: "720px", xl: "900px" };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            display: "flex",
            alignItems: isMobile ? "flex-end" : "center",
            justifyContent: "center",
            padding: isMobile ? 0 : "24px",
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(45,45,45,0.6)",
            }}
          />
          {/* Content */}
          <motion.div
            initial={{
              opacity: 0,
              y: isMobile ? 60 : 20,
              scale: isMobile ? 1 : 0.97,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: isMobile ? 60 : 20,
              scale: isMobile ? 1 : 0.97,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "relative",
              zIndex: 1,
              backgroundColor: "#FDFAF5",
              width: isMobile ? "100%" : "100%",
              maxWidth: isMobile ? "100%" : maxWidths[size],
              maxHeight: isMobile ? "90vh" : "85vh",
              overflowY: "auto",
              border: "1px solid #E8DDD0",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "1px solid #E8DDD0",
                position: "sticky",
                top: 0,
                backgroundColor: "#FDFAF5",
                zIndex: 1,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "22px",
                  fontWeight: "500",
                  color: "#2D2D2D",
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h3>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6B6B6B",
                  display: "flex",
                  alignItems: "center",
                  padding: "4px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2D2D2D")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B6B6B")}
              >
                <FiX size={20} />
              </button>
            </div>
            {/* Body */}
            <div style={{ padding: "24px" }}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
