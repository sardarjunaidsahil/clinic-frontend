import { Link } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiLinkedin,
} from "react-icons/fi";

const COLS = {
  Services: [
    { label: "General Wellness", path: "/services/general-wellness" },
    { label: "Mental Health", path: "/services/mental-health" },
    { label: "Nutrition & Diet", path: "/services/nutrition" },
    { label: "Physical Therapy", path: "/services/physical-therapy" },
    { label: "Skin & Aesthetics", path: "/services/skin-aesthetics" },
  ],
  Company: [
    { label: "Our Story", path: "/about" },
    { label: "Our Doctors", path: "/doctors" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ],
  Help: [
    { label: "Book Appointment", path: "/appointment" },
    { label: "Patient Login", path: "/login" },
    { label: "Register", path: "/register" },
    { label: "Privacy Policy", path: "/privacy" },
  ],
};

export default function Footer() {
  const { isMobile, isTablet } = useResponsive();

  return (
    <footer style={{ backgroundColor: "#2D2D2D", marginTop: "auto" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile
            ? "40px 24px 28px"
            : isTablet
              ? "48px 40px 32px"
              : "60px 48px 36px",
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
              ? "1fr 1fr"
              : "1.5fr 1fr 1fr 1fr",
          gap: isMobile ? "32px" : "36px",
        }}
      >
        {/* Brand */}
        <div>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 2C14 2 4 8 4 16C4 21.5 8.5 26 14 26C19.5 26 24 21.5 24 16C24 8 14 2 14 2Z"
                fill="#7D9B76"
                opacity="0.35"
              />
              <path
                d="M14 2C14 2 4 8 4 16C4 21.5 8.5 26 14 26"
                stroke="#7D9B76"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M14 26V10M14 10C14 10 18 13 20 17"
                stroke="#7D9B76"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#FDFAF5",
                  lineHeight: 1,
                }}
              >
                Wellness
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "7px",
                  letterSpacing: "0.24em",
                  color: "#7D9B76",
                  textTransform: "uppercase",
                  marginTop: "1px",
                }}
              >
                Clinic
              </div>
            </div>
          </Link>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              lineHeight: 1.7,
              color: "rgba(253,250,245,0.4)",
              fontWeight: "300",
              maxWidth: "220px",
              marginBottom: "16px",
            }}
          >
            A sanctuary of holistic healing where modern medicine meets the
            wisdom of nature.
          </p>

          {[
            { icon: <FiPhone size={10} />, text: "+92 300 123 4567" },
            { icon: <FiMail size={10} />, text: "hello@wellnessclinic.com" },
            { icon: <FiMapPin size={10} />, text: "F-7 Markaz, Islamabad" },
          ].map((item) => (
            <div
              key={item.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                marginBottom: "6px",
              }}
            >
              <span style={{ color: "#7D9B76", flexShrink: 0 }}>
                {item.icon}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  color: "rgba(253,250,245,0.4)",
                }}
              >
                {item.text}
              </span>
            </div>
          ))}

          <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
            {[
              <FiInstagram size={13} />,
              <FiFacebook size={13} />,
              <FiLinkedin size={13} />,
            ].map((icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  width: "30px",
                  height: "30px",
                  border: "1px solid rgba(253,250,245,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(253,250,245,0.4)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#7D9B76";
                  e.currentTarget.style.color = "#7D9B76";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(253,250,245,0.1)";
                  e.currentTarget.style.color = "rgba(253,250,245,0.4)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link cols */}
        {Object.entries(COLS).map(([title, links]) => (
          <div key={title}>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                fontWeight: "700",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7D9B76",
                marginBottom: "14px",
              }}
            >
              {title}
            </div>
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "rgba(253,250,245,0.4)",
                  marginBottom: "8px",
                  fontWeight: "300",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FDFAF5")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(253,250,245,0.4)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div
        style={{
          borderTop: "1px solid rgba(253,250,245,0.06)",
          padding: isMobile ? "12px 24px" : "14px 48px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "6px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              color: "rgba(253,250,245,0.22)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Wellness Clinic. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "14px" }}>
            {[
              { l: "Privacy", p: "/privacy" },
              { l: "Terms", p: "/terms" },
            ].map((x) => (
              <Link
                key={x.l}
                to={x.p}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "10px",
                  color: "rgba(253,250,245,0.22)",
                  transition: "color 0.2s",
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#7D9B76")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(253,250,245,0.22)")
                }
              >
                {x.l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
