import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authService } from "../services/authService";
import { useToastContext } from "../context/ToastContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import FormError from "../components/common/FormError";

export default function Register() {
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

  return (
    <main className="register-page">
      <div className="register-wrap">
        <div className="register-logo">
          <Link to="/">
            <div className="register-logo-title">Wellness</div>
            <div className="register-logo-sub">Clinic</div>
          </Link>
        </div>

        <div className="register-card">
          <h1 className="register-heading">Create Account</h1>
          <p className="register-subtext">Join our Wellness Community</p>

          {err && <FormError message={err} style={{ marginBottom: '14px' }} />}

          <form onSubmit={submit}>
            <div className="register-row-2">
              <div className="register-field">
                <label className="register-label">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setF({ ...form, name: e.target.value })}
                  className="register-input"
                  required
                />
              </div>
              <div className="register-field">
                <label className="register-label">Phone</label>
                <input
                  type="tel"
                  placeholder="+92 3XX XXXXXXX"
                  value={form.phone}
                  onChange={(e) => setF({ ...form, phone: e.target.value })}
                  className="register-input"
                />
              </div>
            </div>

            <div className="register-field register-field-full">
              <label className="register-label">Email Address *</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setF({ ...form, email: e.target.value })}
                className="register-input"
                required
              />
            </div>

            <div className="register-row-2 register-row-last">
              <div className="register-field">
                <label className="register-label">Password *</label>
                <div className="register-pw-wrap">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Minimum 6 characters"
                    value={form.password}
                    onChange={(e) =>
                      setF({ ...form, password: e.target.value })
                    }
                    className="register-input register-input-pw"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="register-eye-btn"
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
              </div>
              <div className="register-field">
                <label className="register-label">Confirm Password *</label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={form.confirm}
                  onChange={(e) => setF({ ...form, confirm: e.target.value })}
                  className="register-input"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="register-submit-btn"
            >
              {busy ? (
                <>
                  <div className="register-spinner" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        <p className="register-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="register-footer-link">
            Sign in
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        .register-page {
          background-color: #FDFAF5;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          box-sizing: border-box;
        }

        .register-wrap {
          width: 100%;
          max-width: 460px;
        }

        .register-logo {
          text-align: center;
          margin-bottom: 32px;
        }

        .register-logo a {
          text-decoration: none;
        }

        .register-logo-title {
          font-family: var(--font-heading);
          font-size: 28px;
          font-weight: 600;
          color: #2D2D2D;
        }

        .register-logo-sub {
          font-family: var(--font-body);
          font-size: 9px;
          letter-spacing: 0.3em;
          color: #7D9B76;
          text-transform: uppercase;
        }

        .register-card {
          background-color: #F5EFE6;
          border: 1px solid #E8DDD0;
          border-radius: 6px;
          padding: 36px 32px;
          box-sizing: border-box;
        }

        .register-heading {
          font-family: var(--font-heading);
          font-size: 26px;
          font-weight: 400;
          color: #2D2D2D;
          margin: 0 0 6px 0;
        }

        .register-subtext {
          font-family: var(--font-body);
          font-size: 13px;
          color: #6B6B6B;
          margin: 0 0 22px 0;
        }

        .register-alert-error {
          padding: 10px 14px;
          background-color: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 4px;
          font-family: var(--font-body);
          font-size: 12px;
          color: #B91C1C;
          margin-bottom: 14px;
          box-sizing: border-box;
        }

        .register-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }

        .register-row-last {
          margin-bottom: 20px;
        }

        .register-field {
          width: 100%;
          box-sizing: border-box;
          min-width: 0;
        }

        .register-field-full {
          margin-bottom: 12px;
        }

        .register-label {
          display: block;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7D9B76;
          margin-bottom: 6px;
        }

        .register-input {
          width: 100%;
          padding: 12px 14px;
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

        .register-input:focus {
          border-color: #7D9B76;
          box-shadow: 0 0 0 3px rgba(125, 155, 118, 0.15);
        }

        .register-input-pw {
          padding-right: 40px;
        }

        .register-pw-wrap {
          position: relative;
        }

        .register-eye-btn {
          position: absolute;
          right: 10px;
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

        .register-eye-btn:hover {
          color: #7D9B76;
          background-color: rgba(125, 155, 118, 0.12);
        }

        .register-submit-btn {
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

        .register-submit-btn:hover:not(:disabled) {
          background-color: #6a8a63;
          box-shadow: 0 4px 12px rgba(125, 155, 118, 0.35);
          transform: translateY(-1px);
        }

        .register-submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .register-submit-btn:disabled {
          background-color: #A8C1A2;
          cursor: not-allowed;
        }

        .register-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #FDFAF5;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .register-footer-text {
          text-align: center;
          font-family: var(--font-body);
          font-size: 13px;
          color: #6B6B6B;
          margin-top: 16px;
        }

        .register-footer-link {
          color: #7D9B76;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .register-footer-link:hover {
          color: #5f7d59;
          text-decoration: underline;
        }

        @media (max-width: 560px) {
          .register-row-2 {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .register-page {
            padding: 24px 16px;
          }
          .register-card {
            padding: 24px 20px;
          }
          .register-logo-title {
            font-size: 24px;
          }
          .register-heading {
            font-size: 22px;
          }
        }

        @media (max-width: 360px) {
          .register-card {
            padding: 20px 16px;
          }
        }
      `}</style>
    </main>
  );
}
