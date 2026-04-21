import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";
import { useAppointmentStore } from "../store/appointmentStore";
import { useAuth } from "../context/AuthContext";
import { useToastContext } from "../context/ToastContext";
import StepService from "../components/appointment/StepService";
import StepDoctor from "../components/appointment/StepDoctor";
import StepDateTime from "../components/appointment/StepDateTime";
import StepInfo from "../components/appointment/StepInfo";
import StepConfirm from "../components/appointment/StepConfirm";
import api from "../services/api";

const STEPS = ["Service", "Doctor", "Schedule", "Details", "Confirm"];

export default function Appointment() {
  const { isMobile } = useResponsive();
  const { user } = useAuth();
  const toast = useToastContext();
  const location = useLocation();
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const {
    form,
    updateForm,
    step,
    nextStep,
    prevStep,
    setConfirmed,
    confirmed,
    confirmationCode,
    reset,
    canProceed,
  } = useAppointmentStore();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      sessionStorage.setItem("redirect_after_login", "/appointment");
      navigate("/login", {
        state: { message: "Please Sign in to Book an Appointment." },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (location.state?.service) {
      updateForm({ service: location.state.service });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pre-fill patient info if logged in
  useEffect(() => {
    if (user && !form.name) {
      updateForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.style.animation = "none";
    contentRef.current.offsetHeight; // reflow trigger
    contentRef.current.style.animation = "slideUp 0.3s ease-out both";
  }, [step]);

  if (!user) return null;

  // Book appointment via real API
  const handleConfirm = async () => {
    toast.info("Processing...", "Booking your Appointment...");
    try {
      // Get serviceId from services API
      const svcsRes = await api.get("/services");
      const services = svcsRes?.data || [];
      const matchedSvc = services.find(
        (s) =>
          s.name.toLowerCase() === form.service.toLowerCase() ||
          s.slug.replace(/-/g, " ") === form.service.toLowerCase(),
      );
      if (!matchedSvc) {
        toast.error(
          "Service Error",
          "Service not found. Please go back and reselect.",
        );
        return;
      }

      const dateStr =
        form.date instanceof Date
          ? form.date.toISOString().split("T")[0]
          : form.date;

      const payload = {
        doctorId: form.doctorId,
        serviceId: matchedSvc.id,
        date: dateStr,
        timeSlot: form.time,
        name: form.name,
        email: form.email,
        phone: form.phone,
        symptoms: form.symptoms || "",
      };

      const res = await api.post("/appointments/book", payload);
      const code = res?.data?.confirmationCode || res?.confirmationCode;

      setConfirmed(code);
      toast.success(
        "Appointment Booked!",
        `Confirmation Code: ${code}. Check your Email!`,
        6000,
      );
    } catch (err) {
      toast.error(
        "Booking Failed",
        err?.message || "Could not book appointment. Please try again.",
      );
    }
  };

  const formatDate = (d) => {
    if (!d) return "";
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toLocaleDateString("en-PK", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ── CONFIRMED VIEW ──
  if (confirmed) {
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
        <div style={{ textAlign: "center", maxWidth: "520px", width: "100%" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#7D9B76",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5L19 7"
                stroke="#FDFAF5"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isMobile ? "36px" : "52px",
              fontWeight: "400",
              color: "#2D2D2D",
              marginBottom: "10px",
              letterSpacing: "-0.02em",
            }}
          >
            Appointment{" "}
            <em style={{ fontStyle: "italic", color: "#7D9B76" }}>
              Confirmed!
            </em>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "#6B6B6B",
              marginBottom: "6px",
            }}
          >
            Confirmation sent to{" "}
            <strong style={{ color: "#2D2D2D" }}>{form.email}</strong>
          </p>

          <div
            style={{
              padding: "6px 16px",
              backgroundColor: "#F5EFE6",
              border: "1px solid #7D9B76",
              display: "inline-block",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.15em",
                color: "#7D9B76",
                textTransform: "uppercase",
              }}
            >
              Code: {confirmationCode}
            </span>
          </div>

          {/* Summary */}
          <div
            style={{
              backgroundColor: "#F5EFE6",
              border: "1px solid #E8DDD0",
              padding: isMobile ? "20px" : "24px 28px",
              marginBottom: "24px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                fontWeight: "700",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C9896A",
                marginBottom: "14px",
              }}
            >
              Appointment Summary
            </div>
            {[
              { l: "Service", v: form.service },
              { l: "Doctor", v: form.doctor },
              { l: "Date", v: formatDate(form.date) },
              { l: "Time", v: form.time },
              { l: "Patient", v: form.name },
            ].map((r) => (
              <div
                key={r.l}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid #E8DDD0",
                  flexWrap: "wrap",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#7D9B76",
                  }}
                >
                  {r.l}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#2D2D2D",
                  }}
                >
                  {r.v}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={reset}
              style={{
                padding: "12px 24px",
                backgroundColor: "transparent",
                color: "#2D2D2D",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                border: "1px solid #E8DDD0",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#2D2D2D")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E8DDD0")
              }
            >
              Book Another
            </button>
            <Link
              to={user ? "/dashboard" : "/register"}
              style={{
                padding: "12px 24px",
                backgroundColor: "#7D9B76",
                color: "#FDFAF5",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid #7D9B76",
                transition: "all 0.2s",
              }}
            >
              {user ? "My Dashboard" : "Create Account"}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── FORM VIEW ──
  return (
    <main style={{ backgroundColor: "#FDFAF5", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          backgroundColor: "#F5EFE6",
          padding: isMobile ? "44px 24px 32px" : "60px 48px 44px",
          borderBottom: "1px solid #E8DDD0",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
              animation: "slideUp 0.5s ease-out both",
            }}
          >
            <div
              style={{ width: "20px", height: "1px", background: "#C9896A" }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9896A",
              }}
            >
              Online Booking
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isMobile
                ? "clamp(32px,8vw,44px)"
                : "clamp(40px,5vw,56px)",
              fontWeight: "400",
              color: "#2D2D2D",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              animation: "slideUp 0.5s ease-out 0.08s both",
            }}
          >
            Book Your{" "}
            <em style={{ fontStyle: "italic", color: "#7D9B76" }}>
              Appointment
            </em>
          </h1>
        </div>
      </div>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: isMobile ? "28px 24px 48px" : "44px 48px 64px",
        }}
      >
        {/* Step indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
            overflowX: "auto",
            paddingBottom: "4px",
          }}
        >
          {STEPS.map((s, i) => (
            <div
              key={s}
              style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "28px" : "34px",
                    height: isMobile ? "28px" : "34px",
                    backgroundColor: i <= step ? "#7D9B76" : "#E8DDD0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.3s",
                  }}
                >
                  {i < step ? (
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8l4 4 6-7"
                        stroke="#FDFAF5"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  ) : (
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: i <= step ? "#FDFAF5" : "#6B6B6B",
                      }}
                    >
                      {i + 1}
                    </span>
                  )}
                </div>
                {!isMobile && (
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "10px",
                      fontWeight: "600",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: i === step ? "#7D9B76" : "#6B6B6B",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s}
                  </span>
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    width: isMobile ? "20px" : "52px",
                    height: "1px",
                    backgroundColor: i < step ? "#7D9B76" : "#E8DDD0",
                    margin: isMobile ? "0 5px 22px" : "0 8px 22px",
                    transition: "background-color 0.3s",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div ref={contentRef}>
          {step === 0 && (
            <StepService
              selected={form.service}
              onSelect={(svc) =>
                updateForm({
                  service: svc,
                  doctor: "",
                  doctorId: "",
                  date: null,
                  time: "",
                })
              }
            />
          )}
          {step === 1 && (
            <StepDoctor
              service={form.service}
              selected={form.doctorId}
              onSelect={(id, name) =>
                updateForm({ doctorId: id, doctor: name })
              }
            />
          )}
          {step === 2 && (
            <StepDateTime
              doctorId={form.doctorId}
              doctor={form.doctor}
              date={form.date}
              time={form.time}
              onDateSelect={(d) => updateForm({ date: d, time: "" })}
              onTimeSelect={(t) => updateForm({ time: t })}
            />
          )}
          {step === 3 && (
            <StepInfo
              form={form}
              onChange={(key, val) => updateForm({ [key]: val })}
            />
          )}
          {step === 4 && <StepConfirm form={form} onConfirm={handleConfirm} />}
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid #E8DDD0",
          }}
        >
          {step > 0 ? (
            <button
              onClick={prevStep}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 22px",
                backgroundColor: "transparent",
                color: "#2D2D2D",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1px solid #E8DDD0",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#2D2D2D")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E8DDD0")
              }
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 3L5 8l5 5"
                  stroke="#2D2D2D"
                  strokeWidth="1.2"
                  strokeLinecap="square"
                />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 && (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 28px",
                backgroundColor: canProceed() ? "#7D9B76" : "#E8DDD0",
                color: canProceed() ? "#FDFAF5" : "#6B6B6B",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                cursor: canProceed() ? "pointer" : "not-allowed",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (canProceed())
                  e.currentTarget.style.backgroundColor = "#5E7A58";
              }}
              onMouseLeave={(e) => {
                if (canProceed())
                  e.currentTarget.style.backgroundColor = "#7D9B76";
              }}
            >
              Continue
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 3l5 5-5 5"
                  stroke={canProceed() ? "#FDFAF5" : "#6B6B6B"}
                  strokeWidth="1.2"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
