import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import { useToastContext } from "../context/ToastContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import FormError from "../components/common/FormError";

export default function Login() {
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
      if (user?.role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        const redirect = sessionStorage.getItem("redirect_after_login");
        sessionStorage.removeItem("redirect_after_login");
        navigate(redirect || "/dashboard", { replace: true });
      }
    } catch (e) {
      const msg = e?.message || "Invalid credentials. Please try again.";
      setErr(msg);
      toast.error("Login Failed", msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-wrap">
        <div className="login-logo">
          <Link to="/">
            <div className="login-logo-title">Wellness</div>
            <div className="login-logo-sub">Clinic</div>
          </Link>
        </div>

        <div className="login-card">
          <h1 className="login-heading">Welcome Back</h1>
          <p className="login-subtext">Sign in to your account</p>

          {location?.state?.message && (
            <div className="login-alert login-alert-info">
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
          {err && <FormError message={err} style={{ marginBottom: '14px' }} />}

          <form onSubmit={submit}>
            <div className="login-field">
              <label className="login-label">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setF({ ...form, email: e.target.value })}
                className="login-input"
                required
              />
            </div>

            <div className="login-field" style={{ marginBottom: "8px" }}>
              <label className="login-label">Password</label>
              <div className="login-pw-wrap">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setF({ ...form, password: e.target.value })}
                  className="login-input login-input-pw"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="login-eye-btn"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            <div className="login-forgot-row">
              <Link to="/forgot-password" className="login-forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={busy} className="login-submit-btn">
              {busy ? (
                <>
                  <div className="login-spinner" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="login-footer-text">
          New patient?{" "}
          <Link to="/register" className="login-footer-link">
            Create account
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        .login-page {
          background-color: #FDFAF5;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          box-sizing: border-box;
        }

        .login-wrap {
          width: 100%;
          max-width: 420px;
        }

        .login-logo {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-logo a {
          text-decoration: none;
        }

        .login-logo-title {
          font-family: var(--font-heading);
          font-size: 28px;
          font-weight: 600;
          color: #2D2D2D;
        }

        .login-logo-sub {
          font-family: var(--font-body);
          font-size: 9px;
          letter-spacing: 0.3em;
          color: #7D9B76;
          text-transform: uppercase;
        }

        .login-card {
          background-color: #F5EFE6;
          border: 1px solid #E8DDD0;
          border-radius: 6px;
          padding: 36px 32px;
          box-sizing: border-box;
        }

        .login-heading {
          font-family: var(--font-heading);
          font-size: 26px;
          font-weight: 400;
          color: #2D2D2D;
          margin: 0 0 6px 0;
        }

        .login-subtext {
          font-family: var(--font-body);
          font-size: 13px;
          color: #6B6B6B;
          margin: 0 0 22px 0;
        }

        .login-alert {
          padding: 10px 14px;
          font-family: var(--font-body);
          font-size: 12px;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 4px;
          box-sizing: border-box;
        }

        .login-alert-info {
          background-color: #F5EFE6;
          border: 1px solid #7D9B76;
          color: #7D9B76;
        }

        .login-alert-error {
          background-color: #FEF2F2;
          border: 1px solid #FECACA;
          color: #B91C1C;
        }

        .login-field {
          margin-bottom: 14px;
        }

        .login-label {
          display: block;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7D9B76;
          margin-bottom: 6px;
        }

        .login-input {
          width: 100%;
          padding: 13px 16px;
          font-family: var(--font-body);
          font-size: 13px;
          color: #2D2D2D;
          background-color: #FDFAF5;
          border: 1px solid #E8DDD0;
          outline: none;
          border-radius: 4px;
          box-sizing: border-box;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .login-input:focus {
          border-color: #7D9B76;
          box-shadow: 0 0 0 3px rgba(125, 155, 118, 0.15);
        }

        .login-input-pw {
          padding-right: 44px;
        }

        .login-pw-wrap {
          position: relative;
        }

        .login-eye-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #6B6B6B;
          display: flex;
          padding: 4px;
          border-radius: 50%;
          transition: color 0.2s ease, background-color 0.2s ease;
        }

        .login-eye-btn:hover {
          color: #7D9B76;
          background-color: rgba(125, 155, 118, 0.12);
        }

        .login-forgot-row {
          text-align: right;
          margin-bottom: 20px;
        }

        .login-forgot-link {
          font-family: var(--font-body);
          font-size: 12px;
          color: #7D9B76;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .login-forgot-link:hover {
          color: #5f7d59;
          text-decoration: underline;
        }

        .login-submit-btn {
          width: 100%;
          padding: 14px;
          background-color: #7D9B76;
          color: #FDFAF5;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
        }

        .login-submit-btn:hover:not(:disabled) {
          background-color: #6a8a63;
          box-shadow: 0 4px 12px rgba(125, 155, 118, 0.35);
          transform: translateY(-1px);
        }

        .login-submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-submit-btn:disabled {
          background-color: #A8C1A2;
          cursor: not-allowed;
        }

        .login-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #FDFAF5;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .login-footer-text {
          text-align: center;
          font-family: var(--font-body);
          font-size: 13px;
          color: #6B6B6B;
          margin-top: 16px;
        }

        .login-footer-link {
          color: #7D9B76;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .login-footer-link:hover {
          color: #5f7d59;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-page {
            padding: 24px 16px;
          }
          .login-card {
            padding: 24px 20px;
          }
          .login-logo-title {
            font-size: 24px;
          }
          .login-heading {
            font-size: 22px;
          }
        }

        @media (max-width: 360px) {
          .login-card {
            padding: 20px 16px;
          }
        }
      `}</style>
    </main>
  );
}
