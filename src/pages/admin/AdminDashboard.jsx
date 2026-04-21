import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import useResponsive from "../../hooks/useResponsive";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { appointmentService } from "../../services/appointmentService";

export default function AdminDashboard() {
  const { isMobile } = useResponsive();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState(null);
  const [apts, setApts] = useState([]);
  const [busy, setBusy] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    Promise.all([
      api.get("/admin/stats"),
      api.get("/appointments/all?limit=10"),
    ])
      .then(([sRes, aRes]) => {
        setStats(sRes?.data || sRes);
        setApts(aRes?.data || []);
      })
      .catch((e) => console.error("Admin load:", e))
      .finally(() => setBusy(false));
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await appointmentService.updateStatus(id, status);
      setApts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    } catch (e) {
      alert(e?.message || "Failed");
    }
  };

  const STAT_CARDS = stats
    ? [
        {
          label: "Today's Appointments",
          value: stats.todayApts,
          color: "#7D9B76",
        },
        {
          label: "Total Patients",
          value: stats.totalPatients,
          color: "#C9896A",
        },
        { label: "Pending", value: stats.pendingApts, color: "#7D9B76" },
        { label: "Total Doctors", value: stats.totalDoctors, color: "#C9896A" },
      ]
    : [];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#F5EFE6",
      }}
    >
      {!isMobile && (
        <AdminSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          onLogout={handleLogout}
        />
      )}

      <div style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
        {/* Top bar */}
        <div
          style={{
            backgroundColor: "#FDFAF5",
            borderBottom: "1px solid #E8DDD0",
            padding: isMobile ? "14px 20px" : "14px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "20px",
                fontWeight: "500",
                color: "#2D2D2D",
              }}
            >
              Dashboard
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                color: "#6B6B6B",
              }}
            >
              {new Date().toLocaleDateString("en-PK", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link
              to="/"
              style={{
                padding: "7px 14px",
                border: "1px solid #E8DDD0",
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#6B6B6B",
                textDecoration: "none",
              }}
            >
              View Site
            </Link>
            {isMobile && (
              <button
                onClick={handleLogout}
                style={{
                  padding: "7px 14px",
                  backgroundColor: "#7D9B76",
                  color: "#FDFAF5",
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <div style={{ padding: isMobile ? "20px 16px" : "24px 28px" }}>
          {/* Mobile nav */}
          {isMobile && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              {[
                { l: "Appointments", p: "/admin/appointments" },
                { l: "Doctors", p: "/admin/doctors" },
                { l: "Patients", p: "/admin/patients" },
                { l: "View Site", p: "/" },
              ].map((n) => (
                <Link
                  key={n.p}
                  to={n.p}
                  style={{
                    display: "block",
                    padding: "12px",
                    backgroundColor: "#FDFAF5",
                    border: "1px solid #E8DDD0",
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#2D2D2D",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  {n.l}
                </Link>
              ))}
            </div>
          )}

          {/* Stats */}
          {busy ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2,1fr)"
                  : "repeat(4,1fr)",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#E8DDD0",
                    height: "80px",
                    border: "1px solid #E8DDD0",
                  }}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2,1fr)"
                  : "repeat(4,1fr)",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              {STAT_CARDS.map((c) => (
                <div
                  key={c.label}
                  style={{
                    backgroundColor: "#FDFAF5",
                    border: "1px solid #E8DDD0",
                    padding: isMobile ? "14px" : "18px 22px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "9px",
                      fontWeight: "700",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#6B6B6B",
                      marginBottom: "6px",
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: isMobile ? "26px" : "34px",
                      fontWeight: "600",
                      color: "#2D2D2D",
                      lineHeight: 1,
                    }}
                  >
                    {c.value ?? "—"}
                  </div>
                  <div
                    style={{
                      width: "20px",
                      height: "2px",
                      backgroundColor: c.color,
                      marginTop: "10px",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Recent Appointments */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "9px",
                  fontWeight: "700",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9896A",
                }}
              >
                Recent Appointments
              </div>
              <Link
                to="/admin/appointments"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  color: "#7D9B76",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                View All
              </Link>
            </div>
            <AppointmentsTableInline
              apts={apts}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentsTableInline({ apts, onStatusChange }) {
  const STATUS_COLORS = {
    PENDING: { bg: "#FFF8E1", color: "#F57F17", border: "#F57F17" },
    CONFIRMED: { bg: "#F5EFE6", color: "#7D9B76", border: "#7D9B76" },
    COMPLETED: { bg: "#F1F5F1", color: "#4A7A45", border: "#4A7A45" },
    CANCELLED: { bg: "#FEF2F2", color: "#B91C1C", border: "#B91C1C" },
  };
  if (!apts.length)
    return (
      <div
        style={{
          padding: "32px",
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: "#6B6B6B",
          border: "1px solid #E8DDD0",
          backgroundColor: "#FDFAF5",
        }}
      >
        No appointments yet
      </div>
    );
  return (
    <div style={{ overflowX: "auto", border: "1px solid #E8DDD0" }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#F5EFE6",
              borderBottom: "1px solid #E8DDD0",
            }}
          >
            {[
              "Patient",
              "Service",
              "Doctor",
              "Date & Time",
              "Status",
              "Actions",
            ].map((h) => (
              <th
                key={h}
                style={{
                  padding: "11px 14px",
                  fontFamily: "var(--font-body)",
                  fontSize: "9px",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#6B6B6B",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {apts.map((apt) => {
            const sc = STATUS_COLORS[apt.status] || STATUS_COLORS.PENDING;
            return (
              <tr
                key={apt.id}
                style={{
                  borderBottom: "1px solid #F5EFE6",
                  backgroundColor: "#FDFAF5",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#F9F6F2")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#FDFAF5")
                }
              >
                <td
                  style={{
                    padding: "13px 14px",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#2D2D2D",
                  }}
                >
                  {apt.patient_name || "—"}
                </td>
                <td
                  style={{
                    padding: "13px 14px",
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "#6B6B6B",
                  }}
                >
                  {apt.service_name || "—"}
                </td>
                <td
                  style={{
                    padding: "13px 14px",
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "#7D9B76",
                  }}
                >
                  {apt.doctor_name || "—"}
                </td>
                <td
                  style={{
                    padding: "13px 14px",
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "#6B6B6B",
                    whiteSpace: "nowrap",
                  }}
                >
                  {apt.date
                    ? new Date(apt.date).toLocaleDateString("en-PK", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}{" "}
                  · {apt.time_slot || "—"}
                </td>
                <td style={{ padding: "13px 14px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      backgroundColor: sc.bg,
                      border: `1px solid ${sc.border}`,
                      fontFamily: "var(--font-body)",
                      fontSize: "9px",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: sc.color,
                    }}
                  >
                    {apt.status}
                  </span>
                </td>
                <td style={{ padding: "13px 14px" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {apt.status === "PENDING" && (
                      <button
                        onClick={() => onStatusChange(apt.id, "CONFIRMED")}
                        style={{
                          padding: "4px 10px",
                          backgroundColor: "#7D9B76",
                          color: "#FDFAF5",
                          fontFamily: "var(--font-body)",
                          fontSize: "9px",
                          fontWeight: "600",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Confirm
                      </button>
                    )}
                    {apt.status === "CONFIRMED" && (
                      <button
                        onClick={() => onStatusChange(apt.id, "COMPLETED")}
                        style={{
                          padding: "4px 10px",
                          backgroundColor: "#2D2D2D",
                          color: "#FDFAF5",
                          fontFamily: "var(--font-body)",
                          fontSize: "9px",
                          fontWeight: "600",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Complete
                      </button>
                    )}
                    {!["CANCELLED", "COMPLETED"].includes(apt.status) && (
                      <button
                        onClick={() => onStatusChange(apt.id, "CANCELLED")}
                        style={{
                          padding: "4px 10px",
                          backgroundColor: "transparent",
                          border: "1px solid #E8DDD0",
                          fontFamily: "var(--font-body)",
                          fontSize: "9px",
                          fontWeight: "600",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#6B6B6B",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
