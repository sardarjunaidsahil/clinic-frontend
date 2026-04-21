import { motion, AnimatePresence } from "framer-motion";

export default function LogoutModal({ isOpen, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(45,45,45,0.5)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              position: "relative",
              zIndex: 1,
              backgroundColor: "#FDFAF5",
              border: "1px solid #E8DDD0",
              padding: "36px 32px",
              maxWidth: "380px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "56px",
                height: "56px",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 18px",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
                  stroke="#B91C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M16 17l5-5-5-5M21 12H9"
                  stroke="#B91C1C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "24px",
                fontWeight: "400",
                color: "#2D2D2D",
                marginBottom: "8px",
                letterSpacing: "-0.01em",
              }}
            >
              Sign Out?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "#6B6B6B",
                lineHeight: 1.65,
                marginBottom: "28px",
              }}
            >
              Are you sure you want to sign out of your Wellness Clinic account?
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <button
                onClick={onCancel}
                style={{
                  padding: "12px",
                  backgroundColor: "transparent",
                  border: "1px solid #E8DDD0",
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
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
                Stay
              </button>
              <button
                onClick={onConfirm}
                style={{
                  padding: "12px",
                  backgroundColor: "#B91C1C",
                  border: "1px solid #B91C1C",
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#FDFAF5",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#991B1B")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#B91C1C")
                }
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
