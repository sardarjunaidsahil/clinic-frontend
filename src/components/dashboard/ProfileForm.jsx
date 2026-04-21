import { useState } from "react";
import useResponsive from "../../hooks/useResponsive";

export default function ProfileForm({ initialData, onSave }) {
  const { isMobile } = useResponsive();
  const [profile, setProfile] = useState(
    initialData || {
      name: "",
      email: "",
      phone: "",
      dob: "",
      blood: "",
      allergies: "",
      emergencyContact: "",
    },
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (onSave) onSave(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields = [
    {
      label: "Full Name",
      key: "name",
      type: "text",
      placeholder: "Your full name",
    },
    {
      label: "Email",
      key: "email",
      type: "email",
      placeholder: "your@email.com",
    },
    {
      label: "Phone",
      key: "phone",
      type: "tel",
      placeholder: "+92 300 000 0000",
    },
    { label: "Date of Birth", key: "dob", type: "date", placeholder: "" },
    {
      label: "Blood Group",
      key: "blood",
      type: "text",
      placeholder: "e.g. B+",
    },
    {
      label: "Allergies",
      key: "allergies",
      type: "text",
      placeholder: "e.g. None / Penicillin",
    },
    {
      label: "Emergency Contact",
      key: "emergencyContact",
      type: "tel",
      placeholder: "+92 300 000 0000",
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        {fields.map((f) => (
          <div
            key={f.key}
            style={{
              gridColumn:
                f.key === "allergies" || f.key === "emergencyContact"
                  ? isMobile
                    ? "1"
                    : "1 / -1"
                  : "auto",
            }}
          >
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#7D9B76",
                marginBottom: "6px",
              }}
            >
              {f.label}
            </label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={profile[f.key] || ""}
              onChange={(e) =>
                setProfile((p) => ({ ...p, [f.key]: e.target.value }))
              }
              style={{
                width: "100%",
                padding: "12px 14px",
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
        ))}
      </div>
      <button
        onClick={handleSave}
        style={{
          padding: "12px 32px",
          backgroundColor: saved ? "#5E7A58" : "#7D9B76",
          color: "#FDFAF5",
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          fontWeight: "600",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s",
        }}
      >
        {saved ? "✓ Saved" : "Save Changes"}
      </button>
    </div>
  );
}
