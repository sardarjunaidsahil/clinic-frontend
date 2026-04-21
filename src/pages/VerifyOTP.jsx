import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToastContext } from "../context/ToastContext";
import api from "../services/api";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const toast = useToastContext();

  const userId = location.state?.userId;
  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [busy, setBusy] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(600); // 10 min
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const refs = [ref0, ref1, ref2, ref3, ref4, ref5];

  // Redirect if no userId
  useEffect(() => {
    if (!userId) navigate("/register", { replace: true });
  }, [userId, navigate]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const t = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleChange = (idx, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) refs[idx + 1].current?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0)
      refs[idx - 1].current?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    text.split("").forEach((c, i) => {
      next[i] = c;
    });
    setOtp(next);
    refs[Math.min(text.length, 5)].current?.focus();
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      toast.error("Invalid OTP", "Please enter all 6 digits.");
      return;
    }
    setBusy(true);
    try {
      const res = await api.post("/auth/verify-otp", { userId, otp: code });
      login(res);
      toast.success("Email Verified! 🎉", "Welcome to Wellness Clinic!");
      const redirect = sessionStorage.getItem("redirect_after_login");
      sessionStorage.removeItem("redirect_after_login");
      navigate(redirect || "/dashboard", { replace: true });
    } catch (err) {
      toast.error("Verification Failed", err?.message || "Incorrect OTP.");
      setOtp(["", "", "", "", "", ""]);
      refs[0].current?.focus();
    } finally {
      setBusy(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await api.post("/auth/resend-otp", { userId });
      setTimer(600);
      setOtp(["", "", "", "", "", ""]);
      refs[0].current?.focus();
      toast.success("OTP Sent!", "New OTP sent to your email.");
    } catch (err) {
      toast.error("Failed", err?.message);
    } finally {
      setResending(false);
    }
  };

  // Auto-submit when all 6 digits entered
  useEffect(() => {
    if (otp.every((d) => d !== "")) handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  if (!userId) return null;

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
        {/* Logo */}
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
          {/* Icon */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                backgroundColor: "#7D9B76",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
                  stroke="#FDFAF5"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 8l10 7 10-7"
                  stroke="#FDFAF5"
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
                marginBottom: "8px",
                letterSpacing: "-0.01em",
              }}
            >
              Verify Your Email
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "#6B6B6B",
                lineHeight: 1.6,
              }}
            >
              We sent a 6-digit OTP to
              <br />
              <strong style={{ color: "#2D2D2D" }}>{email}</strong>
            </p>
          </div>

          {/* OTP inputs */}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={refs[idx]}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  maxLength={1}
                  style={{
                    width: "44px",
                    height: "52px",
                    textAlign: "center",
                    fontFamily: "var(--font-body)",
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#2D2D2D",
                    backgroundColor: digit ? "#FDFAF5" : "#FDFAF5",
                    border: digit ? "2px solid #7D9B76" : "1px solid #E8DDD0",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = digit ? "#7D9B76" : "#E8DDD0")
                  }
                />
              ))}
            </div>

            {/* Timer */}
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: timer > 0 ? "#7D9B76" : "#B91C1C",
                  fontWeight: "600",
                }}
              >
                {timer > 0 ? `Expires in ${formatTime(timer)}` : "OTP Expired"}
              </span>
            </div>

            <button
              type="submit"
              disabled={busy || otp.join("").length < 6}
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
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>

          {/* Resend */}
          <div style={{ textAlign: "center", marginTop: "18px" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "#6B6B6B",
              }}
            >
              Did not receive it?{" "}
            </span>
            <button
              onClick={handleResend}
              disabled={resending || timer > 540}
              style={{
                background: "none",
                border: "none",
                cursor: resending || timer > 540 ? "not-allowed" : "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: resending || timer > 540 ? "#C8C8C8" : "#7D9B76",
                fontWeight: "600",
                padding: 0,
              }}
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          </div>
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
          Wrong email?{" "}
          <Link to="/register" style={{ color: "#7D9B76", fontWeight: "600" }}>
            Go back
          </Link>
        </p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </main>
  );
}
