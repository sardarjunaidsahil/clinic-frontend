import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import useResponsive from "../../hooks/useResponsive";
import { useAuth } from "../../context/AuthContext";
import { useToastContext } from "../../context/ToastContext";
import api from "../../services/api";

export default function AdminPatients() {
  const { isMobile } = useResponsive();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToastContext();

  const [collapsed, setCollapsed] = useState(false);
  const [patients, setPatients] = useState([]);
  const [busy, setBusy] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [patientApts, setPatientApts] = useState([]);
  const [aptsLoading, setAptsLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openPatient = async (p) => {
    setSelected(p);
    setPatientApts([]);
    setAptsLoading(true);
    try {
      const res = await api.get(`/appointments/all?limit=50`);
      const all = res?.data || [];
      const mine = all.filter((a) => a.patient_email === p.email);
      setPatientApts(mine);
    } catch {
      setPatientApts([]);
    } finally {
      setAptsLoading(false);
    }
  };

  const load = async (q = "") => {
    setBusy(true);
    try {
      const res = await api.get(`/admin/patients${q ? `?search=${q}` : ""}`);
      setPatients(res?.data?.patients || res?.data || []);
    } catch (e) {
      toast.error("Load Failed", e?.message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => load(search), 400);
    return () => clearTimeout(t);
  }, [search]);

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
            Patients
          </div>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "#6B6B6B",
            }}
          >
            {patients.length} total
          </span>
        </div>

        <div style={{ padding: isMobile ? "20px 16px" : "24px 28px" }}>
          {/* Search */}
          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                maxWidth: "320px",
                padding: "9px 13px",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "#2D2D2D",
                backgroundColor: "#FDFAF5",
                border: "1px solid #E8DDD0",
                outline: "none",
                transition: "border-color 0.2s",
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
              Loading patients...
            </div>
          ) : (
            <div style={{ overflowX: "auto", border: "1px solid #E8DDD0" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "560px",
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
                      "Email",
                      "Phone",
                      "Blood",
                      "Joined",
                      "Action",
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
                  {patients.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          padding: "32px",
                          textAlign: "center",
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          color: "#6B6B6B",
                        }}
                      >
                        No patients found
                      </td>
                    </tr>
                  ) : (
                    patients.map((p) => (
                      <tr
                        key={p.id}
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
                        <td style={{ padding: "13px 14px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "32px",
                                height: "32px",
                                backgroundColor: "#7D9B76",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  color: "#FDFAF5",
                                }}
                              >
                                {p.name
                                  ?.split(" ")
                                  .map((w) => w[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </span>
                            </div>
                            <span
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#2D2D2D",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {p.name}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "13px 14px",
                            fontFamily: "var(--font-body)",
                            fontSize: "12px",
                            color: "#7D9B76",
                          }}
                        >
                          {p.email}
                        </td>
                        <td
                          style={{
                            padding: "13px 14px",
                            fontFamily: "var(--font-body)",
                            fontSize: "12px",
                            color: "#6B6B6B",
                          }}
                        >
                          {p.phone || "—"}
                        </td>
                        <td
                          style={{
                            padding: "13px 14px",
                            fontFamily: "var(--font-body)",
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#C9896A",
                          }}
                        >
                          {p.blood_group || "—"}
                        </td>
                        <td
                          style={{
                            padding: "13px 14px",
                            fontFamily: "var(--font-body)",
                            fontSize: "11px",
                            color: "#6B6B6B",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.created_at
                            ? new Date(p.created_at).toLocaleDateString(
                                "en-PK",
                                { month: "short", year: "numeric" },
                              )
                            : "—"}
                        </td>
                        <td style={{ padding: "13px 14px" }}>
                          <button
                            onClick={() => openPatient(p)}
                            style={{
                              padding: "5px 14px",
                              backgroundColor: "transparent",
                              border: "1px solid #7D9B76",
                              fontFamily: "var(--font-body)",
                              fontSize: "9px",
                              fontWeight: "600",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: "#7D9B76",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#7D9B76";
                              e.currentTarget.style.color = "#FDFAF5";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.color = "#7D9B76";
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* PATIENT DETAIL MODAL */}
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
              maxWidth: "480px",
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
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#2D2D2D",
                }}
              >
                Patient Details
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "#6B6B6B",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: "24px" }}>
              {/* Avatar + name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "24px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid #F5EFE6",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    backgroundColor: "#7D9B76",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#FDFAF5",
                    }}
                  >
                    {selected.name
                      ?.split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "22px",
                      fontWeight: "500",
                      color: "#2D2D2D",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {selected.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "#7D9B76",
                    }}
                  >
                    Patient
                  </div>
                </div>
              </div>

              {/* Info rows */}
              {[
                { label: "Email", value: selected.email },
                { label: "Phone", value: selected.phone || "—" },
                { label: "Blood Group", value: selected.blood_group || "—" },
                {
                  label: "Date of Birth",
                  value: selected.date_of_birth
                    ? new Date(selected.date_of_birth).toLocaleDateString(
                        "en-PK",
                        { year: "numeric", month: "long", day: "numeric" },
                      )
                    : "—",
                },
                { label: "Allergies", value: selected.allergies || "—" },
                {
                  label: "Emergency Contact",
                  value: selected.emergency_contact || "—",
                },
                {
                  label: "Member Since",
                  value: selected.created_at
                    ? new Date(selected.created_at).toLocaleDateString(
                        "en-PK",
                        { year: "numeric", month: "long", day: "numeric" },
                      )
                    : "—",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid #F5EFE6",
                    gap: "4px",
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
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "#2D2D2D",
                      textAlign: isMobile ? "left" : "right",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}

              {/* Appointment History — sirf ek baar */}
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: "700",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#C9896A",
                    marginBottom: "10px",
                  }}
                >
                  Appointment History
                </div>
                {aptsLoading ? (
                  <div
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "#6B6B6B",
                    }}
                  >
                    Loading...
                  </div>
                ) : patientApts.length === 0 ? (
                  <div
                    style={{
                      padding: "14px",
                      backgroundColor: "#F5EFE6",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "#6B6B6B",
                      textAlign: "center",
                    }}
                  >
                    No appointments found
                  </div>
                ) : (
                  <div
                    style={{
                      border: "1px solid #E8DDD0",
                      backgroundColor: "#E8DDD0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {patientApts.map((apt) => {
                      const STATUS = {
                        PENDING: "#F57F17",
                        CONFIRMED: "#7D9B76",
                        COMPLETED: "#4A7A45",
                        CANCELLED: "#B91C1C",
                      };
                      return (
                        <div
                          key={apt.id}
                          style={{
                            backgroundColor: "#FDFAF5",
                            padding: "10px 14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#2D2D2D",
                              }}
                            >
                              {apt.service_name}
                            </div>
                            <div
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "11px",
                                color: "#6B6B6B",
                              }}
                            >
                              {apt.doctor_name} ·{" "}
                              {apt.date
                                ? new Date(apt.date).toLocaleDateString(
                                    "en-PK",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    },
                                  )
                                : ""}{" "}
                              {apt.time_slot}
                            </div>
                          </div>
                          <span
                            style={{
                              padding: "2px 8px",
                              fontFamily: "var(--font-body)",
                              fontSize: "9px",
                              fontWeight: "600",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: STATUS[apt.status] || "#6B6B6B",
                              border: `1px solid ${STATUS[apt.status] || "#E8DDD0"}`,
                              backgroundColor: "#FDFAF5",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {apt.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelected(null)}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "12px",
                  backgroundColor: "#7D9B76",
                  color: "#FDFAF5",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  border: "none",
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
