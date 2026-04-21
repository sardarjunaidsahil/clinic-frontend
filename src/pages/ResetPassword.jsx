import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToastContext } from "../context/ToastContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import api from "../services/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToastContext();

  // Get token from navigation state (OTP flow) OR URL params (old link flow)
  const stateToken = location.state?.resetToken;
  const searchParams = new URLSearchParams(location.search);
  const urlToken = searchParams.get("token");
  const token = stateToken || urlToken;

  const [form, setForm] = useState({ password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!token) {
      toast.error(
        "Invalid Access",
        "Please use Forgot Password to get a reset OTP.",
      );
      navigate("/forgot-password", { replace: true });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (form.password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setErr("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      await api.post("/auth/reset-password", {
        token,
        password: form.password,
      });
      setDone(true);
      toast.success(
        "Password Reset! 🎉",
        "You can now log in with your new password.",
      );
      setTimeout(() => navigate("/login", { replace: true }), 3000);
    } catch (e) {
      setErr(e?.message || "Reset failed. Please start over.");
    } finally {
      setBusy(false);
    }
  };

  if (!token) return null;

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
            padding: "36px 32px",
          }}
        >
          {done ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  backgroundColor: "#7D9B76",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
                  fontSize: "26px",
                  fontWeight: "400",
                  color: "#2D2D2D",
                  marginBottom: "10px",
                }}
              >
                Password Reset!
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "#6B6B6B",
                  marginBottom: "20px",
                  lineHeight: 1.6,
                }}
              >
                Your password has been reset successfully. Redirecting to
                login...
              </p>
              <Link
                to="/login"
                style={{
                  display: "inline-block",
                  padding: "11px 28px",
                  backgroundColor: "#7D9B76",
                  color: "#FDFAF5",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Sign In Now
              </Link>
            </div>
          ) : (
            <>
              <div style={{ textAlign: "center", marginBottom: "22px" }}>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    backgroundColor: "#F5EFE6",
                    border: "1px solid #E8DDD0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      stroke="#7D9B76"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 11V7a5 5 0 0110 0v4"
                      stroke="#7D9B76"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h1
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "26px",
                    fontWeight: "400",
                    color: "#2D2D2D",
                    marginBottom: "6px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  New Password
                </h1>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#6B6B6B",
                  }}
                >
                  Choose a strong password
                </p>
              </div>

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

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "13px" }}>
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
                    New Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={show ? "text" : "password"}
                      placeholder="Min 6 characters"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      required
                      style={{
                        width: "100%",
                        padding: "13px 44px 13px 16px",
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
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#6B6B6B",
                        display: "flex",
                      }}
                    >
                      {show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: "22px" }}>
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
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Repeat new password"
                    value={form.confirm}
                    onChange={(e) =>
                      setForm({ ...form, confirm: e.target.value })
                    }
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
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                    onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                  />
                </div>

                {/* Strength indicator */}
                {form.password && (
                  <div style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        marginBottom: "4px",
                      }}
                    >
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: "3px",
                            backgroundColor:
                              form.password.length >= i * 3
                                ? form.password.length >= 10
                                  ? "#7D9B76"
                                  : form.password.length >= 6
                                    ? "#C9896A"
                                    : "#E8DDD0"
                                : "#E8DDD0",
                            transition: "background-color 0.3s",
                          }}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "10px",
                        color:
                          form.password.length >= 10
                            ? "#7D9B76"
                            : form.password.length >= 6
                              ? "#C9896A"
                              : "#B91C1C",
                      }}
                    >
                      {form.password.length < 6
                        ? "Too short"
                        : form.password.length < 10
                          ? "Fair"
                          : "Strong"}
                    </div>
                  </div>
                )}

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
                      Resetting...
                    </>
                  ) : (
                    "Set New Password"
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
