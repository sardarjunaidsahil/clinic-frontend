import { useState } from "react";
import { Link, useNavigate , useLocation} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import useResponsive from "../hooks/useResponsive";
import { useToastContext } from "../context/ToastContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const { isMobile } = useResponsive();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setF] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const toast = useToastContext();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.email || !form.password) {
      setErr("Email and password required.");
      return;
    }
    setBusy(true);
    try {
      const res = await authService.login(form.email, form.password);
      const user = login(res.data);
      if (user?.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        const redirect = sessionStorage.getItem('redirect_after_login');
        sessionStorage.removeItem('redirect_after_login');
        navigate(redirect || '/dashboard', { replace: true });
      }
    } catch (e) {
     const msg = e?.message || "Invalid Credentials. Please try Again.";
     setErr(msg);
     toast.error("Login Failed", msg);
    } finally {
      setBusy(false);
    }
  };

  const inp = {
    width: "100%",
    padding: "13px 16px",
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
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "26px",
              fontWeight: "400",
              color: "#2D2D2D",
              marginBottom: "6px",
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "#6B6B6B",
              marginBottom: "22px",
            }}
          >
            Sign in to your account
          </p>

          {location?.state?.message && (
            <div
              style={{
                padding: "10px 14px",
                backgroundColor: "#F5EFE6",
                border: "1px solid #7D9B76",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "#7D9B76",
                marginBottom: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="#7D9B76"
                  strokeWidth="1.2"
                />
                <path
                  d="M8 5v4M8 11v0"
                  stroke="#7D9B76"
                  strokeWidth="1.2"
                  strokeLinecap="square"
                />
              </svg>
              {location.state.message}
            </div>
          )}
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
            <div style={{ marginBottom: "14px" }}>
              <label style={lbl}>Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setF({ ...form, email: e.target.value })}
                style={inp}
                onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                required
              />
            </div>

            <div style={{ marginBottom: "8px" }}>
              <label style={lbl}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={show ? "text" : "password"}
                  placeholder="Your password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setF({ ...form, password: e.target.value })}
                  style={{ ...inp, paddingRight: "44px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                  required
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

            <div style={{ textAlign: "right", marginBottom: "20px" }}>
              <Link
                to="/forgot-password"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "#7D9B76",
                }}
              >
                Forgot password?
              </Link>
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
                  Signing in...
                </>
              ) : (
                "Sign In"
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
          New patient?{" "}
          <Link to="/register" style={{ color: "#7D9B76", fontWeight: "600" }}>
            Create account
          </Link>
        </p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  );
}
