import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";
import { useAuth } from "../context/AuthContext";
import LogoutModal from "../components/common/LogoutModal";
import { appointmentService } from "../services/appointmentService";
import { useToastContext } from "../context/ToastContext";
import { authService } from "../services/authService";
import {
  FiCalendar,
  FiFileText,
  FiUser,
  FiHeart,
  FiLogOut,
  FiClock,
  FiDownload,
  FiActivity,
} from "react-icons/fi";

const TABS = [
  { id: "appointments", label: "Appointments", icon: <FiCalendar size={15} /> },
  { id: "records", label: "Medical Records", icon: <FiFileText size={15} /> },
  { id: "profile", label: "My Profile", icon: <FiUser size={15} /> },
];

const STATUS_STYLE = {
  PENDING: { bg: "#FFF8E1", border: "#F57F17", color: "#F57F17" },
  CONFIRMED: { bg: "#F5EFE6", border: "#7D9B76", color: "#7D9B76" },
  COMPLETED: { bg: "#F1F5F1", border: "#4A7A45", color: "#4A7A45" },
  CANCELLED: { bg: "#FEF2F2", border: "#B91C1C", color: "#B91C1C" },
};

export default function Dashboard() {
  const { isMobile } = useResponsive();
  const toast = useToastContext();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState("appointments");
  const [apts, setApts] = useState([]);
  const [records, setRecords] = useState([]);
  const [busy, setBusy] = useState(true);
  const [recBusy, setRecBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProf] = useState({
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    blood_group: "",
    allergies: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setProf({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      date_of_birth: user.date_of_birth || "",
      blood_group: user.blood_group || "",
      allergies: user.allergies || "",
    });
    appointmentService
      .getMyAppointments()
      .then((res) => setApts(res?.data || []))
      .catch(() => setApts([]))
      .finally(() => setBusy(false));
  }, [user, navigate]);

  // Load records when tab changes to records
  useEffect(() => {
    if (tab !== "records" || records.length > 0) return;
    setRecBusy(true);
    appointmentService
      .getMyRecords()
      .then((res) => setRecords(res?.data || []))
      .catch(() => setRecords([]))
      .finally(() => setRecBusy(false));
  }, [tab, records.length]);

  if (!user) return null;

  const upcoming = apts.filter((a) =>
    ["PENDING", "CONFIRMED"].includes(a.status),
  );
  const past = apts.filter((a) =>
    ["COMPLETED", "CANCELLED"].includes(a.status),
  );

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to Cancel this Appointment?"))
      return;
    try {
      await appointmentService.cancel(id);
      setApts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "CANCELLED" } : a)),
      );
      toast.success(
        "Appointment Cancelled",
        "Your appointment has been Cancelled Successfully.",
      );
    } catch (e) {
      toast.error(
        "Cancel Failed",
        e?.message || "Could not cancel. Please try again.",
      );
    }
  };

  const handleSave = async () => {
    if (!profile.name?.trim()) {
      toast.error("Validation Error", "Name is required.");
      return;
    }
    setSaving(true);
    try {
      const res = await authService.updateProfile({
        name: profile.name,
        phone: profile.phone || null,
        date_of_birth: profile.date_of_birth || null,
        blood_group: profile.blood_group || null,
        allergies: profile.allergies || null,
      });
      updateUser(res?.data || profile);
      setSaved(true);
      toast.success(
        "Profile Updated",
        "Your Profile has been Saved Successfully.",
      );
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      toast.error(
        "Save Failed",
        e?.message || "Could not save Profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main style={{ backgroundColor: "#FDFAF5", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: "#F5EFE6",
          borderBottom: "1px solid #E8DDD0",
          padding: isMobile ? "18px 24px" : "20px 48px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "22px",
              fontWeight: "500",
              color: "#2D2D2D",
            }}
          >
            Patient Dashboard
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              color: "#6B6B6B",
              marginTop: "2px",
            }}
          >
            Welcome back, {user.name?.split(" ")[0]}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "20px 24px" : "32px 48px",
        }}
      >
        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
            gap: "10px",
            marginBottom: "24px",
          }}
        >
          {[
            {
              label: "Upcoming",
              value: upcoming.length,
              icon: <FiCalendar size={16} />,
              color: "#7D9B76",
            },
            {
              label: "Completed",
              value: past.filter((a) => a.status === "COMPLETED").length,
              icon: <FiClock size={16} />,
              color: "#C9896A",
            },
            {
              label: "Records",
              value: records.length,
              icon: <FiFileText size={16} />,
              color: "#7D9B76",
            },
            {
              label: "Total",
              value: apts.length,
              icon: <FiActivity size={16} />,
              color: "#C9896A",
            },
          ].map((c) => (
            <div
              key={c.label}
              style={{
                backgroundColor: "#F5EFE6",
                border: "1px solid #E8DDD0",
                padding: isMobile ? "14px" : "18px 20px",
              }}
            >
              <div style={{ color: c.color, marginBottom: "7px" }}>
                {c.icon}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: isMobile ? "26px" : "32px",
                  fontWeight: "600",
                  color: "#2D2D2D",
                  lineHeight: 1,
                }}
              >
                {c.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "9px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6B6B6B",
                  marginTop: "3px",
                }}
              >
                {c.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #E8DDD0",
            marginBottom: "22px",
            overflowX: "auto",
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "11px 18px",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: tab === t.id ? "#7D9B76" : "#6B6B6B",
                borderBottom:
                  tab === t.id ? "2px solid #7D9B76" : "2px solid transparent",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {t.icon} {!isMobile && t.label}
            </button>
          ))}
        </div>

        {/* ── APPOINTMENTS TAB ── */}
        {tab === "appointments" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "14px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "22px",
                  fontWeight: "400",
                  color: "#2D2D2D",
                }}
              >
                My Appointments
              </h2>
              <Link
                to="/appointment"
                style={{
                  padding: "9px 18px",
                  backgroundColor: "#7D9B76",
                  color: "#FDFAF5",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  border: "1px solid #7D9B76",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#7D9B76";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#7D9B76";
                  e.currentTarget.style.color = "#FDFAF5";
                }}
              >
                + Book New
              </Link>
            </div>

            {busy ? (
              <div
                style={{
                  padding: "48px",
                  textAlign: "center",
                  fontFamily: "var(--font-body)",
                  color: "#6B6B6B",
                }}
              >
                Loading appointments...
              </div>
            ) : apts.length === 0 ? (
              <div
                style={{
                  padding: "48px 24px",
                  textAlign: "center",
                  border: "1px solid #E8DDD0",
                  backgroundColor: "#F5EFE6",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "24px",
                    color: "#2D2D2D",
                    marginBottom: "8px",
                  }}
                >
                  No appointments yet
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#6B6B6B",
                    marginBottom: "16px",
                  }}
                >
                  Book your first appointment today
                </p>
                <Link
                  to="/appointment"
                  style={{
                    padding: "10px 22px",
                    backgroundColor: "#7D9B76",
                    color: "#FDFAF5",
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  Book Now
                </Link>
              </div>
            ) : (
              <>
                {[
                  { title: "Upcoming", list: upcoming },
                  { title: "Past", list: past },
                ].map(
                  (grp) =>
                    grp.list.length > 0 && (
                      <div key={grp.title} style={{ marginBottom: "24px" }}>
                        <div
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "9px",
                            fontWeight: "700",
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "#C9896A",
                            marginBottom: "8px",
                          }}
                        >
                          {grp.title}
                        </div>
                        <div
                          style={{
                            border: "1px solid #E8DDD0",
                            backgroundColor: "#E8DDD0",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1px",
                          }}
                        >
                          {grp.list.map((apt) => {
                            const sc =
                              STATUS_STYLE[apt.status] || STATUS_STYLE.PENDING;
                            return (
                              <div
                                key={apt.id}
                                style={{
                                  backgroundColor: "#FDFAF5",
                                  padding: isMobile ? "14px 16px" : "16px 22px",
                                  display: "flex",
                                  flexDirection: isMobile ? "column" : "row",
                                  alignItems: isMobile
                                    ? "flex-start"
                                    : "center",
                                  justifyContent: "space-between",
                                  gap: "10px",
                                }}
                              >
                                <div>
                                  <div
                                    style={{
                                      fontFamily: "var(--font-body)",
                                      fontSize: "13px",
                                      fontWeight: "600",
                                      color: "#2D2D2D",
                                      marginBottom: "2px",
                                    }}
                                  >
                                    {apt.service_name}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: "var(--font-body)",
                                      fontSize: "12px",
                                      color: "#7D9B76",
                                      marginBottom: "2px",
                                    }}
                                  >
                                    {apt.doctor_name} — {apt.specialty}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: "var(--font-body)",
                                      fontSize: "11px",
                                      color: "#6B6B6B",
                                    }}
                                  >
                                    {apt.date
                                      ? new Date(apt.date).toLocaleDateString(
                                          "en-PK",
                                          {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                          },
                                        )
                                      : ""}{" "}
                                    · {apt.time_slot}
                                  </div>
                                  {apt.confirmation_code && (
                                    <div
                                      style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: "10px",
                                        color: "#6B6B6B",
                                        marginTop: "3px",
                                      }}
                                    >
                                      Code:{" "}
                                      <strong style={{ color: "#7D9B76" }}>
                                        {apt.confirmation_code}
                                      </strong>
                                    </div>
                                  )}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flexShrink: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      padding: "2px 9px",
                                      backgroundColor: sc.bg,
                                      border: `1px solid ${sc.border}`,
                                      fontFamily: "var(--font-body)",
                                      fontSize: "9px",
                                      fontWeight: "600",
                                      letterSpacing: "0.08em",
                                      textTransform: "uppercase",
                                      color: sc.color,
                                    }}
                                  >
                                    {apt.status}
                                  </span>
                                  {["PENDING", "CONFIRMED"].includes(
                                    apt.status,
                                  ) && (
                                    <button
                                      onClick={() => handleCancel(apt.id)}
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
                                        transition: "all 0.2s",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor =
                                          "#B91C1C";
                                        e.currentTarget.style.color = "#B91C1C";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor =
                                          "#E8DDD0";
                                        e.currentTarget.style.color = "#6B6B6B";
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ),
                )}
              </>
            )}
          </div>
        )}

        {/* ── RECORDS TAB ── */}
        {tab === "records" && (
          <div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "22px",
                fontWeight: "400",
                color: "#2D2D2D",
                marginBottom: "14px",
              }}
            >
              Medical Records
            </h2>

            {recBusy ? (
              <div
                style={{
                  padding: "48px",
                  textAlign: "center",
                  fontFamily: "var(--font-body)",
                  color: "#6B6B6B",
                }}
              >
                Loading records...
              </div>
            ) : records.length === 0 ? (
              <div
                style={{
                  padding: "48px 24px",
                  textAlign: "center",
                  border: "1px solid #E8DDD0",
                  backgroundColor: "#F5EFE6",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "24px",
                    color: "#2D2D2D",
                    marginBottom: "8px",
                  }}
                >
                  No Records Yet
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#6B6B6B",
                  }}
                >
                  Your medical records will appear here after completed
                  appointments.
                </p>
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid #E8DDD0",
                  backgroundColor: "#E8DDD0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                }}
              >
                {records.map((rec) => (
                  <div
                    key={rec.id}
                    style={{
                      backgroundColor: "#FDFAF5",
                      padding: isMobile ? "16px" : "20px 24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: isMobile ? "flex-start" : "center",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      {/* Left */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "14px",
                        }}
                      >
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            backgroundColor: "#F5EFE6",
                            border: "1px solid #E8DDD0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            color: "#7D9B76",
                          }}
                        >
                          <FiFileText size={18} />
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#2D2D2D",
                              marginBottom: "3px",
                            }}
                          >
                            {rec.service_name} — Consultation
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "12px",
                              color: "#7D9B76",
                              marginBottom: "3px",
                            }}
                          >
                            {rec.doctor_name} · {rec.specialty}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "11px",
                              color: "#6B6B6B",
                              marginBottom: rec.symptoms ? "6px" : 0,
                            }}
                          >
                            {rec.date
                              ? new Date(rec.date).toLocaleDateString("en-PK", {
                                  weekday: "short",
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : ""}{" "}
                            · {rec.time_slot}
                          </div>
                          {rec.symptoms && (
                            <div
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "11px",
                                color: "#6B6B6B",
                                padding: "6px 10px",
                                backgroundColor: "#F5EFE6",
                                border: "1px solid #E8DDD0",
                                marginTop: "4px",
                              }}
                            >
                              <strong style={{ color: "#7D9B76" }}>
                                Symptoms:{" "}
                              </strong>
                              {rec.symptoms}
                            </div>
                          )}
                          {rec.notes && (
                            <div
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "11px",
                                color: "#6B6B6B",
                                padding: "6px 10px",
                                backgroundColor: "#F0F7F0",
                                border: "1px solid #C8D8C5",
                                marginTop: "4px",
                              }}
                            >
                              <strong style={{ color: "#4A7A45" }}>
                                Doctor Notes:{" "}
                              </strong>
                              {rec.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            padding: "3px 10px",
                            backgroundColor: "#F1F5F1",
                            border: "1px solid #4A7A45",
                            fontFamily: "var(--font-body)",
                            fontSize: "9px",
                            fontWeight: "600",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "#4A7A45",
                          }}
                        >
                          Completed
                        </span>
                        <div
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "10px",
                            color: "#7D9B76",
                            fontWeight: "600",
                          }}
                        >
                          {rec.confirmation_code}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PROFILE TAB ── */}
        {tab === "profile" && (
          <div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "22px",
                fontWeight: "400",
                color: "#2D2D2D",
                marginBottom: "18px",
              }}
            >
              My Profile
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)",
                gap: "12px",
                marginBottom: "18px",
              }}
            >
              {[
                {
                  label: "Full Name",
                  key: "name",
                  type: "text",
                  disabled: false,
                },
                { label: "Email", key: "email", type: "email", disabled: true },
                { label: "Phone", key: "phone", type: "tel", disabled: false },
                {
                  label: "Date of Birth",
                  key: "date_of_birth",
                  type: "date",
                  disabled: false,
                },
                {
                  label: "Blood Group",
                  key: "blood_group",
                  type: "text",
                  disabled: false,
                },
                {
                  label: "Allergies",
                  key: "allergies",
                  type: "text",
                  disabled: false,
                },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "9px",
                      fontWeight: "600",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#7D9B76",
                      marginBottom: "5px",
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    value={profile[f.key] || ""}
                    disabled={f.disabled}
                    onChange={(e) =>
                      setProf((p) => ({ ...p, [f.key]: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "11px 13px",
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "#2D2D2D",
                      backgroundColor: f.disabled ? "#F0F0F0" : "#FDFAF5",
                      border: "1px solid #E8DDD0",
                      outline: "none",
                      transition: "border-color 0.2s",
                      cursor: f.disabled ? "not-allowed" : "text",
                    }}
                    onFocus={(e) => {
                      if (!f.disabled) e.target.style.borderColor = "#7D9B76";
                    }}
                    onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: "12px 28px",
                  backgroundColor: saved ? "#5E7A58" : "#7D9B76",
                  color: "#FDFAF5",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: saving ? "not-allowed" : "pointer",
                  transition: "background-color 0.3s",
                }}
              >
                {saving ? "Saving..." : saved ? "✓ Saved" : "Save Changes"}
              </button>
              {saved && (
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "#5E7A58",
                  }}
                >
                  Profile updated successfully!
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
