import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import useResponsive from "../../hooks/useResponsive";
import { useAuth } from "../../context/AuthContext";
import { useToastContext } from "../../context/ToastContext";
import api from "../../services/api";

const STATUS_COLORS = {
  PENDING: { bg: "#FFF8E1", color: "#F57F17", border: "#F57F17" },
  CONFIRMED: { bg: "#F5EFE6", color: "#7D9B76", border: "#7D9B76" },
  COMPLETED: { bg: "#F1F5F1", color: "#4A7A45", border: "#4A7A45" },
  CANCELLED: { bg: "#FEF2F2", color: "#B91C1C", border: "#B91C1C" },
  RESCHEDULED: { bg: "#F0F0FF", color: "#5B5BD6", border: "#5B5BD6" },
};

export default function AdminAppointments() {
  const { isMobile } = useResponsive();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToastContext();

  const [collapsed, setCollapsed] = useState(false);
  const [apts, setApts] = useState([]);
  const [busy, setBusy] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null); // detail modal
  const [notes, setNotes] = useState(""); // notes for status update

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const load = useCallback(async (status, q) => {
    setBusy(true);
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (status && status !== "ALL") params.set("status", status);
      if (q) params.set("search", q);
      const res = await api.get(`/appointments/all?${params}`);
      setApts(res?.data || []);
    } catch (e) {
      toast.error("Load Failed", e?.message);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    load(filter, search);
  }, [filter]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => load(filter, search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const handleStatus = async (id, status, notesText = "") => {
    try {
      await api.put(`/appointments/${id}/status`, {
        status,
        notes: notesText || undefined,
      });
      toast.success(
        "Updated!",
        `Appointment marked as ${status.toLowerCase()}`,
      );
      setApts((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status, notes: notesText || a.notes } : a,
        ),
      );
      if (selected?.id === id)
        setSelected((prev) => ({
          ...prev,
          status,
          notes: notesText || prev.notes,
        }));
    } catch (e) {
      toast.error("Update Failed", e?.message);
    }
  };

  const openDetail = (apt) => {
    setSelected(apt);
    setNotes(apt.notes || "");
  };

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
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "20px",
              fontWeight: "500",
              color: "#2D2D2D",
            }}
          >
            Appointments
          </div>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "#6B6B6B",
            }}
          >
            {apts.length} records
          </span>
        </div>

        <div style={{ padding: isMobile ? "20px 16px" : "24px 28px" }}>
          {/* Filter tabs */}
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              borderBottom: "1px solid #E8DDD0",
              marginBottom: "16px",
            }}
          >
            {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "10px 16px",
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: "600",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: filter === f ? "#7D9B76" : "#6B6B6B",
                    borderBottom:
                      filter === f
                        ? "2px solid #7D9B76"
                        : "2px solid transparent",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                  }}
                >
                  {f}
                </button>
              ),
            )}
          </div>

          {/* Search */}
          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="Search patient, doctor, service, code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                maxWidth: "380px",
                padding: "9px 13px",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "#2D2D2D",
                backgroundColor: "#FDFAF5",
                border: "1px solid #E8DDD0",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
              onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
            />
          </div>

          {/* Table */}
          {busy ? (
            <div
              style={{
                padding: "48px",
                textAlign: "center",
                fontFamily: "var(--font-body)",
                color: "#6B6B6B",
              }}
            >
              Loading...
            </div>
          ) : (
            <div style={{ overflowX: "auto", border: "1px solid #E8DDD0" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "700px",
                }}
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
                      "Code",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "11px 12px",
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
                  {apts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        style={{
                          padding: "32px",
                          textAlign: "center",
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          color: "#6B6B6B",
                        }}
                      >
                        No appointments found
                      </td>
                    </tr>
                  ) : (
                    apts.map((apt) => {
                      const sc =
                        STATUS_COLORS[apt.status] || STATUS_COLORS.PENDING;
                      return (
                        <tr
                          key={apt.id}
                          style={{
                            borderBottom: "1px solid #F5EFE6",
                            backgroundColor: "#FDFAF5",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#F9F6F2")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#FDFAF5")
                          }
                        >
                          <td style={{ padding: "12px" }}>
                            <div
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#2D2D2D",
                              }}
                            >
                              {apt.patient_name}
                            </div>
                            <div
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "11px",
                                color: "#6B6B6B",
                              }}
                            >
                              {apt.patient_email}
                            </div>
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              fontFamily: "var(--font-body)",
                              fontSize: "12px",
                              color: "#6B6B6B",
                            }}
                          >
                            {apt.service_name}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              fontFamily: "var(--font-body)",
                              fontSize: "12px",
                              color: "#7D9B76",
                            }}
                          >
                            {apt.doctor_name}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              fontFamily: "var(--font-body)",
                              fontSize: "11px",
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
                              : "—"}
                            <br />
                            {apt.time_slot}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              fontFamily: "var(--font-body)",
                              fontSize: "10px",
                              fontWeight: "600",
                              color: "#7D9B76",
                              letterSpacing: "0.05em",
                            }}
                          >
                            {apt.confirmation_code}
                          </td>
                          <td style={{ padding: "12px" }}>
                            <span
                              style={{
                                padding: "3px 8px",
                                backgroundColor: sc.bg,
                                border: `1px solid ${sc.border}`,
                                fontFamily: "var(--font-body)",
                                fontSize: "9px",
                                fontWeight: "600",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: sc.color,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {apt.status}
                            </span>
                          </td>
                          <td style={{ padding: "12px" }}>
                            <div
                              style={{
                                display: "flex",
                                gap: "5px",
                                flexWrap: "wrap",
                              }}
                            >
                              <button
                                onClick={() => openDetail(apt)}
                                style={{
                                  padding: "4px 10px",
                                  backgroundColor: "transparent",
                                  border: "1px solid #7D9B76",
                                  fontFamily: "var(--font-body)",
                                  fontSize: "9px",
                                  fontWeight: "600",
                                  letterSpacing: "0.06em",
                                  textTransform: "uppercase",
                                  color: "#7D9B76",
                                  cursor: "pointer",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                View
                              </button>
                              {apt.status === "PENDING" && (
                                <button
                                  onClick={() =>
                                    handleStatus(apt.id, "CONFIRMED")
                                  }
                                  style={{
                                    padding: "4px 10px",
                                    backgroundColor: "#7D9B76",
                                    color: "#FDFAF5",
                                    fontFamily: "var(--font-body)",
                                    fontSize: "9px",
                                    fontWeight: "600",
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    border: "none",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Confirm
                                </button>
                              )}
                              {apt.status === "CONFIRMED" && (
                                <button
                                  onClick={() => openDetail(apt)}
                                  style={{
                                    padding: "4px 10px",
                                    backgroundColor: "#2D2D2D",
                                    color: "#FDFAF5",
                                    fontFamily: "var(--font-body)",
                                    fontSize: "9px",
                                    fontWeight: "600",
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    border: "none",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Complete
                                </button>
                              )}
                              {!["CANCELLED", "COMPLETED"].includes(
                                apt.status,
                              ) && (
                                <button
                                  onClick={() =>
                                    handleStatus(apt.id, "CANCELLED")
                                  }
                                  style={{
                                    padding: "4px 10px",
                                    backgroundColor: "transparent",
                                    border: "1px solid #FECACA",
                                    fontFamily: "var(--font-body)",
                                    fontSize: "9px",
                                    fontWeight: "600",
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    color: "#B91C1C",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={() => setSelected(null)}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(45,45,45,0.55)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              backgroundColor: "#FDFAF5",
              border: "1px solid #E8DDD0",
              width: "100%",
              maxWidth: "520px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 22px",
                borderBottom: "1px solid #E8DDD0",
                backgroundColor: "#F5EFE6",
                position: "sticky",
                top: 0,
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
                  Appointment Detail
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    color: "#7D9B76",
                  }}
                >
                  #{selected.confirmation_code}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "22px",
                  color: "#6B6B6B",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: "22px" }}>
              {/* Status badge */}
              <div style={{ marginBottom: "18px" }}>
                {(() => {
                  const sc =
                    STATUS_COLORS[selected.status] || STATUS_COLORS.PENDING;
                  return (
                    <span
                      style={{
                        padding: "4px 14px",
                        backgroundColor: sc.bg,
                        border: `1px solid ${sc.border}`,
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        fontWeight: "600",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: sc.color,
                      }}
                    >
                      {selected.status}
                    </span>
                  );
                })()}
              </div>

              {/* Info rows */}
              {[
                { label: "Patient", value: selected.patient_name },
                { label: "Email", value: selected.patient_email },
                { label: "Phone", value: selected.patient_phone || "—" },
                { label: "Service", value: selected.service_name },
                { label: "Doctor", value: selected.doctor_name },
                { label: "Specialty", value: selected.specialty },
                {
                  label: "Date",
                  value: selected.date
                    ? new Date(selected.date).toLocaleDateString("en-PK", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "—",
                },
                { label: "Time", value: selected.time_slot },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "9px 0",
                    borderBottom: "1px solid #F5EFE6",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: "600",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#7D9B76",
                      flexShrink: 0,
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "#2D2D2D",
                      textAlign: "right",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}

              {selected.symptoms && (
                <div
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "#F5EFE6",
                    border: "1px solid #E8DDD0",
                    marginTop: "12px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "9px",
                      fontWeight: "700",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#C9896A",
                      marginBottom: "5px",
                    }}
                  >
                    Patient Symptoms
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "#2D2D2D",
                      lineHeight: 1.6,
                    }}
                  >
                    {selected.symptoms}
                  </div>
                </div>
              )}

              {/* Doctor notes */}
              <div style={{ marginTop: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontSize: "9px",
                    fontWeight: "700",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#7D9B76",
                    marginBottom: "6px",
                  }}
                >
                  Doctor Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add doctor notes, treatment summary, next steps..."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#2D2D2D",
                    backgroundColor: "#FDFAF5",
                    border: "1px solid #E8DDD0",
                    outline: "none",
                    resize: "vertical",
                    minHeight: "80px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                />
              </div>

              {/* Action buttons */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                  gap: "8px",
                  marginTop: "16px",
                }}
              >
                {selected.status === "PENDING" && (
                  <button
                    onClick={() =>
                      handleStatus(selected.id, "CONFIRMED", notes)
                    }
                    style={{
                      padding: "11px",
                      backgroundColor: "#7D9B76",
                      color: "#FDFAF5",
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ✓ Confirm
                  </button>
                )}
                {selected.status === "CONFIRMED" && (
                  <button
                    onClick={() =>
                      handleStatus(selected.id, "COMPLETED", notes)
                    }
                    style={{
                      padding: "11px",
                      backgroundColor: "#4A7A45",
                      color: "#FDFAF5",
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ✓ Mark Complete
                  </button>
                )}
                {!["CANCELLED", "COMPLETED"].includes(selected.status) && (
                  <button
                    onClick={() =>
                      handleStatus(selected.id, "CANCELLED", notes)
                    }
                    style={{
                      padding: "11px",
                      backgroundColor: "transparent",
                      color: "#B91C1C",
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      border: "1px solid #FECACA",
                      cursor: "pointer",
                    }}
                  >
                    ✗ Cancel
                  </button>
                )}
                {notes !== (selected.notes || "") && (
                  <button
                    onClick={() =>
                      handleStatus(selected.id, selected.status, notes)
                    }
                    style={{
                      padding: "11px",
                      backgroundColor: "#2D2D2D",
                      color: "#FDFAF5",
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Save Notes
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelected(null)}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "transparent",
                  border: "1px solid #E8DDD0",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6B6B6B",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
