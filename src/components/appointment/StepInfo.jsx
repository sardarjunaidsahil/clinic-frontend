import useResponsive from "../../hooks/useResponsive";

export default function StepInfo({ form, onChange }) {
  const { isMobile } = useResponsive();

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    fontFamily: "var(--font-body)",
    fontSize: "13px",
    color: "#2D2D2D",
    backgroundColor: "#FDFAF5",
    border: "1px solid #E8DDD0",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const fields = [
    {
      label: "Full Name",
      key: "name",
      type: "text",
      placeholder: "Your full name",
      required: true,
      col: 1,
    },
    {
      label: "Email Address",
      key: "email",
      type: "email",
      placeholder: "your@email.com",
      required: true,
      col: 1,
    },
    {
      label: "Phone Number",
      key: "phone",
      type: "tel",
      placeholder: "+92 300 000 0000",
      required: true,
      col: 1,
    },
    {
      label: "Age",
      key: "age",
      type: "number",
      placeholder: "Your age",
      required: false,
      col: 1,
    },
  ];

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: isMobile ? "28px" : "36px",
          fontWeight: "400",
          color: "#2D2D2D",
          marginBottom: "6px",
          letterSpacing: "-0.01em",
        }}
      >
        Your Details
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "13px",
          color: "#6B6B6B",
          marginBottom: "24px",
        }}
      >
        We need a few details to confirm your appointment
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: "14px",
        }}
      >
        {fields.map((f) => (
          <div key={f.key}>
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
              {f.label}{" "}
              {f.required && <span style={{ color: "#C9896A" }}>*</span>}
            </label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.key] || ""}
              onChange={(e) => onChange(f.key, e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
              onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
              required={f.required}
            />
          </div>
        ))}

        <div style={{ gridColumn: isMobile ? "1" : "1 / -1" }}>
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
            Symptoms / Concerns{" "}
            <span
              style={{
                color: "#6B6B6B",
                fontWeight: "400",
                textTransform: "none",
                letterSpacing: 0,
                fontSize: "11px",
              }}
            >
              (optional)
            </span>
          </label>
          <textarea
            placeholder="Briefly describe your symptoms or reason for visit..."
            value={form.symptoms || ""}
            onChange={(e) => onChange("symptoms", e.target.value)}
            rows={4}
            style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
            onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
            onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
          />
        </div>
      </div>
    </div>
  );
}
