import { useRef, useEffect, useState } from "react";
import useResponsive from "../hooks/useResponsive";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";

export default function Contact() {
  const { isMobile, isTablet } = useResponsive();
  const heroRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return
    Array.from(heroRef.current.children).forEach((el, i) => {
      el.style.animation = `slideUp 0.5s ease-out ${i * 0.08}s both`
    })
  }, [])

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await import('../services/api').then(({ default: api }) =>
        api.post('/contact', form)
      )
      setSubmitted(true)
    } catch (err) {
      alert(err?.message || 'Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    fontFamily: "var(--font-body)",
    fontSize: "13px",
    color: "#2D2D2D",
    backgroundColor: "#FDFAF5",
    border: "1px solid #E8DDD0",
    outline: "none",
    transition: "border-color 0.2s",
    display: "block",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "10px",
    fontWeight: "600",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#7D9B76",
    marginBottom: "6px",
  };

  const contactItems = [
    {
      icon: <FiPhone size={16} />,
      label: "Phone",
      value: "+92 300 123 4567",
      sub: "Mon–Sat, 9am–6pm",
    },
    {
      icon: <FiMail size={16} />,
      label: "Email",
      value: "hello@wellnessclinic.com",
      sub: "We reply within 24hrs",
    },
    {
      icon: <FiMapPin size={16} />,
      label: "Address",
      value: "F-7 Markaz, Islamabad",
      sub: "Pakistan",
    },
    {
      icon: <FiClock size={16} />,
      label: "Hours",
      value: "Mon–Sat: 9am – 6pm",
      sub: "Sunday: Closed",
    },
  ];

  return (
    <main style={{ backgroundColor: "#FDFAF5", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        ref={heroRef}
        style={{
          backgroundColor: "#F5EFE6",
          padding: isMobile ? "60px 24px 48px" : "80px 48px 64px",
          borderBottom: "1px solid #E8DDD0",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{ width: "22px", height: "1px", background: "#C9896A" }}
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
              Get In Touch
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isMobile ? "40px" : "clamp(40px, 5vw, 68px)",
              fontWeight: "400",
              color: "#2D2D2D",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            We Are Here to{" "}
            <em style={{ fontStyle: "italic", color: "#7D9B76" }}>Help</em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#6B6B6B",
              fontWeight: "300",
              maxWidth: "480px",
            }}
          >
            Whether you have a question, need guidance, or are ready to begin
            your wellness journey — we would love to hear from you.
          </p>
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile
            ? "48px 24px"
            : isTablet
              ? "64px 40px"
              : "80px 48px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr",
            gap: isMobile ? "48px" : "64px",
            alignItems: "start",
          }}
        >
          {/* Left — Info */}
          <div>
            <div style={{ marginBottom: "40px" }}>
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    marginBottom: "28px",
                    paddingBottom: "28px",
                    borderBottom: "1px solid #F5EFE6",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#F5EFE6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#7D9B76",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "10px",
                        fontWeight: "600",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#C9896A",
                        marginBottom: "4px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#2D2D2D",
                        marginBottom: "2px",
                      }}
                    >
                      {item.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        color: "#6B6B6B",
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div id="faq">
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C9896A",
                  marginBottom: "20px",
                }}
              >
                Quick FAQ
              </div>
              {[
                {
                  q: "How do I book an appointment?",
                  a: "Use our online booking system or call us directly. Same-day appointments are often available.",
                },
                {
                  q: "Do you accept insurance?",
                  a: "We work with most major Pakistani insurance providers. Contact us to confirm your coverage.",
                },
                {
                  q: "Is parking available?",
                  a: "Yes, free parking is available at our F-7 Markaz location.",
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  style={{
                    marginBottom: "16px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid #F5EFE6",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#2D2D2D",
                      marginBottom: "6px",
                    }}
                  >
                    {faq.q}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      lineHeight: 1.7,
                      color: "#6B6B6B",
                      fontWeight: "300",
                    }}
                  >
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div
            style={{
              backgroundColor: "#F5EFE6",
              border: "1px solid #E8DDD0",
              padding: isMobile ? "28px 24px" : "44px 40px",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "40px",
                    color: "#7D9B76",
                    marginBottom: "14px",
                  }}
                >
                  Thank You
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "#6B6B6B",
                    lineHeight: 1.7,
                  }}
                >
                  Your message has been received. We will get back to you within
                  24 hours.
                </p>
              </div>
            ) : (
              <>
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: isMobile ? "28px" : "34px",
                    fontWeight: "400",
                    color: "#2D2D2D",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    marginBottom: "28px",
                  }}
                >
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                      gap: "14px",
                      marginBottom: "14px",
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#7D9B76")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                        required
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        style={inputStyle}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#7D9B76")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      placeholder="+92 300 000 0000"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                      onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                    />
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={labelStyle}>Subject</label>
                    <input
                      type="text"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                      onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      placeholder="Tell us about your concern or question..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "120px",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
                      onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      opacity: submitting ? 0.7 : 1,
                      padding: "15px",
                      backgroundColor: "#7D9B76",
                      color: "#FDFAF5",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: "600",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      border: "1px solid #7D9B76",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#7D9B76";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#7D9B76";
                      e.currentTarget.style.color = "#FDFAF5";
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
