import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import useResponsive from "../../hooks/useResponsive";
import { useAuth } from "../../context/AuthContext";
import { useToastContext } from "../../context/ToastContext";
import api from "../../services/api";

const SPECIALTIES = [
  "General Wellness",
  "Mental Health",
  "Nutrition",
  "Physical Therapy",
  "Skin & Aesthetics",
  "Cardiology",
];

const inp = {
  width: "100%",
  padding: "10px 12px",
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  color: "#2D2D2D",
  backgroundColor: "#FDFAF5",
  border: "1px solid #E8DDD0",
  outline: "none",
  boxSizing: "border-box",
};
const lbl = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: "9px",
  fontWeight: "600",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#7D9B76",
  marginBottom: "5px",
};

export default function AdminDoctors() {
  const { isMobile } = useResponsive();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToastContext();

  const [collapsed, setCollapsed] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [busy, setBusy] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [editDoc, setEditDoc] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editSaving, setEditSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialty: "",
    qualification: "",
    experience_years: "",
    consultation_fee: "",
    bio: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const loadDoctors = async () => {
    setBusy(true);
    try {
      const res = await api.get("/doctors");
      setDoctors(res?.data || []);
    } catch (e) {
      toast.error("Load Failed", e?.message || "Could not load doctors");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = () => setOpenMenu(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.specialty) {
      toast.error(
        "Validation Error",
        "Name, email and specialty are required.",
      );
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v || ""));
      if (!form.password) formData.set("password", "doctor123");
      if (photoFile) formData.append("photo", photoFile);
      await api.post("/doctors", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(
        "Doctor Added!",
        `${form.name} has been added successfully.`,
      );
      setShowModal(false);
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        specialty: "",
        qualification: "",
        experience_years: "",
        consultation_fee: "",
        bio: "",
      });
      setPhotoFile(null);
      setPhotoPreview(null);
      loadDoctors();
    } catch (e) {
      toast.error(
        "Add Failed",
        e?.response?.data?.message || e?.message || "Could not add doctor.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (doc) => {
    try {
      await api.put(`/doctors/${doc.id}`, { is_available: !doc.is_available });
      toast.success(
        "Updated",
        `${doc.name} is now ${!doc.is_available ? "Available" : "Inactive"}`,
      );
      loadDoctors();
    } catch (e) {
      toast.error("Update Failed", e?.message);
    }
  };

  const handleDelete = async (doc) => {
    if (!window.confirm(`Delete ${doc.name}? This cannot be undone.`)) return;
    try {
      await api.delete(`/doctors/${doc.id}`);
      toast.success("Deleted", `${doc.name} has been removed.`);
      loadDoctors();
    } catch (e) {
      toast.error("Delete Failed", e?.message);
    }
  };

  const handleEditOpen = (doc) => {
    setEditDoc(doc);
    setEditForm({
      name: doc.name || "",
      phone: doc.phone || "",
      specialty: doc.specialty || "",
      qualification: doc.qualification || "",
      experience_years: doc.experience_years || "",
      consultation_fee: doc.consultation_fee || "",
      bio: doc.bio || "",
    });
  };

  const handleEditSave = async () => {
    setEditSaving(true);
    try {
      await api.put(`/doctors/${editDoc.id}`, editForm);
      toast.success("Updated", `${editForm.name} updated successfully.`);
      setEditDoc(null);
      loadDoctors();
    } catch (e) {
      toast.error("Update Failed", e?.message);
    } finally {
      setEditSaving(false);
    }
  };

  const initials = (name) =>
    name
      ?.split(" ")
      .filter((w) => w !== "Dr.")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

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
            padding: isMobile ? "14px 16px" : "14px 28px",
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
              fontSize: isMobile ? "17px" : "20px",
              fontWeight: "500",
              color: "#2D2D2D",
            }}
          >
            Manage Doctors
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: isMobile ? "8px 14px" : "9px 18px",
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
            + Add Doctor
          </button>
        </div>

        <div style={{ padding: isMobile ? "16px" : "24px 28px" }}>
          {busy ? (
            <div
              style={{
                padding: "48px",
                textAlign: "center",
                fontFamily: "var(--font-body)",
                color: "#6B6B6B",
              }}
            >
              Loading doctors...
            </div>
          ) : isMobile ? (
            /* ── MOBILE CARD VIEW ── */
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {doctors.length === 0 ? (
                <div
                  style={{
                    padding: "48px 24px",
                    textAlign: "center",
                    border: "1px solid #E8DDD0",
                    backgroundColor: "#FDFAF5",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#6B6B6B",
                  }}
                >
                  No doctors found. Add your first doctor.
                </div>
              ) : (
                doctors.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      backgroundColor: "#FDFAF5",
                      border: "1px solid #E8DDD0",
                      padding: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
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
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "#FDFAF5",
                            }}
                          >
                            {initials(doc.name)}
                          </span>
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#2D2D2D",
                            }}
                          >
                            {doc.name}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "11px",
                              color: "#7D9B76",
                            }}
                          >
                            {doc.specialty}
                          </div>
                        </div>
                      </div>
                      {/* More button */}
                      <div style={{ position: "relative" }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenu(openMenu === doc.id ? null : doc.id);
                          }}
                          style={{
                            background: "none",
                            border: "1px solid #E8DDD0",
                            padding: "5px 10px",
                            cursor: "pointer",
                            fontFamily: "var(--font-body)",
                            fontSize: "16px",
                            color: "#6B6B6B",
                            lineHeight: 1,
                          }}
                        >
                          ···
                        </button>
                        {openMenu === doc.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              position: "absolute",
                              right: 0,
                              top: "calc(100% + 4px)",
                              zIndex: 100,
                              backgroundColor: "#FDFAF5",
                              border: "1px solid #E8DDD0",
                              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                              minWidth: "150px",
                            }}
                          >
                            {[
                              {
                                label: doc.is_available
                                  ? "Deactivate"
                                  : "Activate",
                                color: doc.is_available ? "#6B6B6B" : "#7D9B76",
                                action: () => {
                                  handleToggle(doc);
                                  setOpenMenu(null);
                                },
                              },
                              {
                                label: "Edit",
                                color: "#C9896A",
                                action: () => {
                                  handleEditOpen(doc);
                                  setOpenMenu(null);
                                },
                              },
                              {
                                label: "Delete",
                                color: "#B91C1C",
                                action: () => {
                                  handleDelete(doc);
                                  setOpenMenu(null);
                                },
                              },
                            ].map((item) => (
                              <button
                                key={item.label}
                                onClick={item.action}
                                style={{
                                  display: "block",
                                  width: "100%",
                                  padding: "10px 14px",
                                  background: "none",
                                  border: "none",
                                  borderBottom: "1px solid #F5EFE6",
                                  textAlign: "left",
                                  fontFamily: "var(--font-body)",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  color: item.color,
                                  cursor: "pointer",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    "#F5EFE6")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    "transparent")
                                }
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "10px",
                          color: "#6B6B6B",
                        }}
                      >
                        {doc.experience_years} yrs exp
                      </span>
                      <span style={{ color: "#E8DDD0" }}>·</span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "10px",
                          fontWeight: "600",
                          color: "#7D9B76",
                        }}
                      >
                        PKR {Number(doc.consultation_fee).toLocaleString()}
                      </span>
                      <span style={{ color: "#E8DDD0" }}>·</span>
                      <span
                        style={{
                          padding: "1px 7px",
                          fontSize: "9px",
                          fontWeight: "600",
                          fontFamily: "var(--font-body)",
                          backgroundColor: doc.is_available
                            ? "#F5EFE6"
                            : "#F5F5F5",
                          border: `1px solid ${doc.is_available ? "#7D9B76" : "#E8DDD0"}`,
                          color: doc.is_available ? "#7D9B76" : "#6B6B6B",
                        }}
                      >
                        {doc.is_available ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* ── DESKTOP TABLE VIEW ── */
            <div style={{ overflowX: "auto", border: "1px solid #E8DDD0" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "640px",
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
                      "Doctor",
                      "Specialty",
                      "Experience",
                      "Fee",
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
                  {doctors.length === 0 ? (
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
                        No doctors found. Add your first doctor.
                      </td>
                    </tr>
                  ) : (
                    doctors.map((doc) => (
                      <tr
                        key={doc.id}
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
                                width: "34px",
                                height: "34px",
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
                                {initials(doc.name)}
                              </span>
                            </div>
                            <div>
                              <div
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  color: "#2D2D2D",
                                }}
                              >
                                {doc.name}
                              </div>
                              <div
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "11px",
                                  color: "#6B6B6B",
                                }}
                              >
                                {doc.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "13px 14px",
                            fontFamily: "var(--font-body)",
                            fontSize: "12px",
                            color: "#6B6B6B",
                          }}
                        >
                          {doc.specialty}
                        </td>
                        <td
                          style={{
                            padding: "13px 14px",
                            fontFamily: "var(--font-body)",
                            fontSize: "12px",
                            color: "#6B6B6B",
                          }}
                        >
                          {doc.experience_years} yrs
                        </td>
                        <td
                          style={{
                            padding: "13px 14px",
                            fontFamily: "var(--font-body)",
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#7D9B76",
                          }}
                        >
                          PKR {Number(doc.consultation_fee).toLocaleString()}
                        </td>
                        <td style={{ padding: "13px 14px" }}>
                          <span
                            style={{
                              padding: "3px 8px",
                              backgroundColor: doc.is_available
                                ? "#F5EFE6"
                                : "#F5F5F5",
                              border: `1px solid ${doc.is_available ? "#7D9B76" : "#E8DDD0"}`,
                              fontFamily: "var(--font-body)",
                              fontSize: "9px",
                              fontWeight: "600",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: doc.is_available ? "#7D9B76" : "#6B6B6B",
                            }}
                          >
                            {doc.is_available ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td style={{ padding: "13px 14px" }}>
                          {/* More dropdown */}
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenu(
                                  openMenu === doc.id ? null : doc.id,
                                );
                              }}
                              style={{
                                padding: "5px 14px",
                                backgroundColor: "transparent",
                                border: "1px solid #E8DDD0",
                                fontFamily: "var(--font-body)",
                                fontSize: "11px",
                                fontWeight: "600",
                                color: "#6B6B6B",
                                cursor: "pointer",
                                letterSpacing: "0.05em",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.borderColor = "#2D2D2D")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.borderColor = "#E8DDD0")
                              }
                            >
                              Actions ▾
                            </button>
                            {openMenu === doc.id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: "calc(100% + 4px)",
                                  zIndex: 100,
                                  backgroundColor: "#FDFAF5",
                                  border: "1px solid #E8DDD0",
                                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                                  minWidth: "160px",
                                }}
                              >
                                {[
                                  {
                                    label: doc.is_available
                                      ? "Deactivate"
                                      : "Activate",
                                    color: doc.is_available
                                      ? "#6B6B6B"
                                      : "#7D9B76",
                                    action: () => {
                                      handleToggle(doc);
                                      setOpenMenu(null);
                                    },
                                  },
                                  {
                                    label: "Edit Doctor",
                                    color: "#C9896A",
                                    action: () => {
                                      handleEditOpen(doc);
                                      setOpenMenu(null);
                                    },
                                  },
                                  {
                                    label: "Delete Doctor",
                                    color: "#B91C1C",
                                    action: () => {
                                      handleDelete(doc);
                                      setOpenMenu(null);
                                    },
                                  },
                                ].map((item) => (
                                  <button
                                    key={item.label}
                                    onClick={item.action}
                                    style={{
                                      display: "block",
                                      width: "100%",
                                      padding: "10px 14px",
                                      background: "none",
                                      border: "none",
                                      borderBottom: "1px solid #F5EFE6",
                                      textAlign: "left",
                                      fontFamily: "var(--font-body)",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                      color: item.color,
                                      cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) =>
                                      (e.currentTarget.style.backgroundColor =
                                        "#F5EFE6")
                                    }
                                    onMouseLeave={(e) =>
                                      (e.currentTarget.style.backgroundColor =
                                        "transparent")
                                    }
                                  >
                                    {item.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
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

      {/* ── ADD DOCTOR MODAL ── */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            onClick={() => setShowModal(false)}
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
              maxWidth: "580px",
              maxHeight: "92vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid #E8DDD0",
                backgroundColor: "#F5EFE6",
                position: "sticky",
                top: 0,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#2D2D2D",
                }}
              >
                Add New Doctor
              </div>
              <button
                onClick={() => setShowModal(false)}
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
            <form onSubmit={handleAdd} style={{ padding: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                {[
                  {
                    label: "Full Name *",
                    key: "name",
                    type: "text",
                    placeholder: "Dr. Full Name",
                    required: true,
                  },
                  {
                    label: "Email *",
                    key: "email",
                    type: "email",
                    placeholder: "doctor@email.com",
                    required: true,
                  },
                  {
                    label: "Password",
                    key: "password",
                    type: "password",
                    placeholder: "default: doctor123",
                  },
                  {
                    label: "Phone",
                    key: "phone",
                    type: "tel",
                    placeholder: "+92 300 000 0000",
                  },
                  {
                    label: "Qualification",
                    key: "qualification",
                    type: "text",
                    placeholder: "MBBS, FCPS",
                  },
                  {
                    label: "Experience (Years)",
                    key: "experience_years",
                    type: "number",
                    placeholder: "8",
                  },
                  {
                    label: "Consultation Fee (PKR)",
                    key: "consultation_fee",
                    type: "number",
                    placeholder: "3000",
                  },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={lbl}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key] || ""}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                      style={inp}
                      required={f.required}
                      onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                      onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                    />
                  </div>
                ))}
                <div>
                  <label style={lbl}>Specialty *</label>
                  <select
                    value={form.specialty}
                    onChange={(e) =>
                      setForm({ ...form, specialty: e.target.value })
                    }
                    style={{ ...inp, cursor: "pointer" }}
                    required
                  >
                    <option value="">Select specialty</option>
                    {SPECIALTIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div style={{ marginBottom: "14px" }}>
                <label style={lbl}>Bio</label>
                <textarea
                  placeholder="Brief professional bio..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  style={{ ...inp, resize: "vertical", minHeight: "80px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                />
              </div>

              {/* Photo */}
              <div style={{ marginBottom: "20px" }}>
                <label style={lbl}>Profile Photo (optional)</label>
                <div
                  style={{
                    border: "1px solid #E8DDD0",
                    backgroundColor: "#FDFAF5",
                    padding: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      backgroundColor: "#F5EFE6",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "1px solid #E8DDD0",
                    }}
                  >
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="8"
                            r="4"
                            stroke="#C8C8C8"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                            stroke="#C8C8C8"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      type="file"
                      accept="image/*"
                      id="photo-upload"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setPhotoFile(file);
                        setPhotoPreview(URL.createObjectURL(file));
                      }}
                    />
                    <label
                      htmlFor="photo-upload"
                      style={{
                        display: "inline-block",
                        padding: "7px 14px",
                        backgroundColor: "transparent",
                        border: "1px solid #7D9B76",
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        fontWeight: "600",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#7D9B76",
                        cursor: "pointer",
                      }}
                    >
                      {photoFile ? "Change Photo" : "Upload Photo"}
                    </label>
                    {photoFile && (
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "11px",
                          color: "#6B6B6B",
                          marginTop: "5px",
                        }}
                      >
                        {photoFile.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: "12px",
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
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    flex: 2,
                    padding: "12px",
                    backgroundColor: saving ? "#A8C1A2" : "#7D9B76",
                    color: "#FDFAF5",
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: saving ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {saving ? (
                    <>
                      <div
                        style={{
                          width: "13px",
                          height: "13px",
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "#FDFAF5",
                          borderRadius: "50%",
                          animation: "spin 0.7s linear infinite",
                        }}
                      />
                      Adding...
                    </>
                  ) : (
                    "Add Doctor"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── EDIT DOCTOR MODAL ── */}
      {editDoc && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            onClick={() => setEditDoc(null)}
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
              maxWidth: "580px",
              maxHeight: "92vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid #E8DDD0",
                backgroundColor: "#F5EFE6",
                position: "sticky",
                top: 0,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#2D2D2D",
                }}
              >
                Edit Doctor
              </div>
              <button
                onClick={() => setEditDoc(null)}
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
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                {[
                  {
                    label: "Full Name",
                    key: "name",
                    type: "text",
                    placeholder: "Dr. Full Name",
                  },
                  {
                    label: "Phone",
                    key: "phone",
                    type: "tel",
                    placeholder: "+92 300 000 0000",
                  },
                  {
                    label: "Qualification",
                    key: "qualification",
                    type: "text",
                    placeholder: "MBBS, FCPS",
                  },
                  {
                    label: "Experience (Years)",
                    key: "experience_years",
                    type: "number",
                    placeholder: "8",
                  },
                  {
                    label: "Consultation Fee (PKR)",
                    key: "consultation_fee",
                    type: "number",
                    placeholder: "3000",
                  },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={lbl}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={editForm[f.key] || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, [f.key]: e.target.value })
                      }
                      style={inp}
                      onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                      onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                    />
                  </div>
                ))}
                <div>
                  <label style={lbl}>Specialty</label>
                  <select
                    value={editForm.specialty || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, specialty: e.target.value })
                    }
                    style={{ ...inp, cursor: "pointer" }}
                  >
                    {SPECIALTIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={lbl}>Bio</label>
                <textarea
                  placeholder="Brief professional bio..."
                  value={editForm.bio || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  rows={3}
                  style={{ ...inp, resize: "vertical", minHeight: "80px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                />
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => setEditDoc(null)}
                  style={{
                    flex: 1,
                    padding: "12px",
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
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  disabled={editSaving}
                  style={{
                    flex: 2,
                    padding: "12px",
                    backgroundColor: editSaving ? "#A8C1A2" : "#7D9B76",
                    color: "#FDFAF5",
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: editSaving ? "not-allowed" : "pointer",
                  }}
                >
                  {editSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
