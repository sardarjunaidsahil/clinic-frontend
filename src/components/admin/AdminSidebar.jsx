import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiCalendar,
  FiUsers,
  FiUserCheck,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const NAV = [
  { label: "Dashboard", path: "/admin", icon: <FiGrid size={15} /> },
  {
    label: "Appointments",
    path: "/admin/appointments",
    icon: <FiCalendar size={15} />,
  },
  { label: "Doctors", path: "/admin/doctors", icon: <FiUserCheck size={15} /> },
  { label: "Patients", path: "/admin/patients", icon: <FiUsers size={15} /> },
];

export default function AdminSidebar({ collapsed, onToggle, onLogout }) {
  const { pathname } = useLocation();
  const w = collapsed ? "56px" : "200px";

  return (
    <div
      style={{
        width: w,
        minHeight: "100vh",
        backgroundColor: "#2D2D2D",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transition: "width 0.25s ease",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? "18px 16px" : "18px 20px",
          borderBottom: "1px solid rgba(253,250,245,0.07)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          minHeight: "60px",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 28 28"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M14 2C14 2 4 8 4 16C4 21.5 8.5 26 14 26C19.5 26 24 21.5 24 16C24 8 14 2 14 2Z"
            fill="#7D9B76"
            opacity="0.4"
          />
          <path
            d="M14 26V10M14 10C14 10 18 13 20 17"
            stroke="#7D9B76"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
        {!collapsed && (
          <div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "15px",
                fontWeight: "600",
                color: "#FDFAF5",
                lineHeight: 1,
              }}
            >
              Wellness
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "7px",
                letterSpacing: "0.2em",
                color: "#7D9B76",
                textTransform: "uppercase",
                marginTop: "1px",
              }}
            >
              Admin
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 0" }}>
        {NAV.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: collapsed ? "11px 18px" : "11px 18px",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.05em",
                textDecoration: "none",
                color: isActive ? "#7D9B76" : "rgba(253,250,245,0.5)",
                backgroundColor: isActive
                  ? "rgba(125,155,118,0.1)"
                  : "transparent",
                borderLeft: isActive
                  ? "2px solid #7D9B76"
                  : "2px solid transparent",
                transition: "all 0.18s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#FDFAF5";
                  e.currentTarget.style.backgroundColor =
                    "rgba(253,250,245,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "rgba(253,250,245,0.5)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div
        style={{
          padding: "8px 0",
          borderTop: "1px solid rgba(253,250,245,0.07)",
        }}
      >
        <button
          onClick={onToggle}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "10px 18px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(253,250,245,0.35)",
            whiteSpace: "nowrap",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(253,250,245,0.7)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(253,250,245,0.35)")
          }
        >
          <span style={{ flexShrink: 0 }}>
            {collapsed ? (
              <FiChevronRight size={14} />
            ) : (
              <FiChevronLeft size={14} />
            )}
          </span>
          {!collapsed && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.05em",
              }}
            >
              Collapse
            </span>
          )}
        </button>
        <button
          onClick={onLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "10px 18px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(253,250,245,0.35)",
            whiteSpace: "nowrap",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9896A")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(253,250,245,0.35)")
          }
        >
          <FiLogOut size={14} style={{ flexShrink: 0 }} />
          {!collapsed && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.05em",
              }}
            >
              Sign Out
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
