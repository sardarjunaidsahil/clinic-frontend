import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authService } from "../services/authService";
import useResponsive from "../hooks/useResponsive";
import { useToastContext } from "../context/ToastContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const [form, setF] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const toast = useToastContext();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.name || !form.email || !form.password) {
      setErr("Please fill required fields.");
      return;
    }
    if (form.password.length < 6) {
      setErr("Password min 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setErr("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const res = await authService.register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      toast.info(
        "OTP Sent!",
        `Check ${form.email} for your verification code.`,
        5000,
      );
      navigate("/verify-otp", {
        state: { userId: res?.data?.userId, email: form.email },
        replace: true,
      });
    } catch (e) {
      setErr(e?.message || "Registration failed. Try again.");
      toast.error(
        "Registration Failed",
        e?.message || "Registration failed. Try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const inp = {
    width: "100%",
    padding: "12px 14px",
    fontFamily: "var(--font-body)",
    fontSize: "13px",
    color: "#2D2D2D",
    backgroundColor: "#FDFAF5",
    border: "1px solid #E8DDD0",
    outline: "none",
  };
  const lbl = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "10px",
    fontWeight: "600",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#7D9B76",
    marginBottom: "6px",
  };

  return (
    <main
      style={{
        backgroundColor: "#FDFAF5",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "460px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link to="/">
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "28px",
                fontWeight: "600",
                color: "#2D2D2D",
              }}
            >
              Wellness
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "#7D9B76",
                textTransform: "uppercase",
              }}
            >
              Clinic
            </div>
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "#F5EFE6",
            border: "1px solid #E8DDD0",
            padding: isMobile ? "24px" : "36px 32px",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "26px",
              fontWeight: "400",
              color: "#2D2D2D",
              marginBottom: "6px",
            }}
          >
            Create Account
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "#6B6B6B",
              marginBottom: "22px",
            }}
          >
            Join our Wellness Community
          </p>

          {err && (
            <div
              style={{
                padding: "10px 14px",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "#B91C1C",
                marginBottom: "14px",
              }}
            >
              {err}
            </div>
          )}

          <form onSubmit={submit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "12px",
                marginBottom: "12px",
              }}
            >
              <div>
                <label style={lbl}>Full Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setF({ ...form, name: e.target.value })}
                  style={inp}
                  onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                  required
                />
              </div>
              <div>
                <label style={lbl}>Phone</label>
                <input
                  type="tel"
                  placeholder="+92 300 000 0000"
                  value={form.phone}
                  onChange={(e) => setF({ ...form, phone: e.target.value })}
                  style={inp}
                  onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={lbl}>Email Address *</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setF({ ...form, email: e.target.value })}
                style={inp}
                onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                required
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label style={lbl}>Password *</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Min 6 chars"
                    value={form.password}
                    onChange={(e) =>
                      setF({ ...form, password: e.target.value })
                    }
                    style={{ ...inp, paddingRight: "40px" }}
                    onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                    onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#6B6B6B",
                      display: "flex",
                    }}
                  >
                    {show ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label style={lbl}>Confirm *</label>
                <input
                  type="password"
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={(e) => setF({ ...form, confirm: e.target.value })}
                  style={inp}
                  onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: busy ? "#A8C1A2" : "#7D9B76",
                color: "#FDFAF5",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "none",
                cursor: busy ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {busy ? (
                <>
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#FDFAF5",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "#6B6B6B",
            marginTop: "16px",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#7D9B76", fontWeight: "600" }}>
            Sign in
          </Link>
        </p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  );
}
