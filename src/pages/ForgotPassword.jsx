import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import useResponsive from "../hooks/useResponsive";

export default function ForgotPassword() {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const res = await authService.forgotPassword(email);
      const userId = res?.data?.data?.userId || res?.data?.userId;
      if (!userId) {
        setErr("No account found with this email.");
        return;
      }
      navigate("/verify-reset-otp", {
        state: { userId, email },
      });
    } catch (e) {
      setErr(e?.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
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
      <div style={{ width: "100%", maxWidth: "420px" }}>
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
          {sent ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#7D9B76",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12l5 5L19 7"
                    stroke="#FDFAF5"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "24px",
                  fontWeight: "400",
                  color: "#2D2D2D",
                  marginBottom: "10px",
                }}
              >
                Check Your Email
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "#6B6B6B",
                  marginBottom: "20px",
                }}
              >
                If an account exists for <strong>{email}</strong>, a password
                reset link has been sent.
              </p>
              <Link
                to="/login"
                style={{
                  display: "inline-block",
                  padding: "11px 24px",
                  border: "1px solid #2D2D2D",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#2D2D2D",
                }}
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "26px",
                  fontWeight: "400",
                  color: "#2D2D2D",
                  marginBottom: "8px",
                }}
              >
                Forgot Password?
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "#6B6B6B",
                  marginBottom: "22px",
                }}
              >
                Enter your email to receive a reset link.
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
                <div style={{ marginBottom: "18px" }}>
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
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "13px 16px",
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
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          )}
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
          <Link to="/login" style={{ color: "#7D9B76", fontWeight: "600" }}>
            Back to Login
          </Link>
        </p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  );
}
