import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiPhone } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import useResponsive from "../../hooks/useResponsive";
import LogoutModal from "./LogoutModal";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  {
    label: "Services",
    path: "/services",
    dropdown: [
      { label: "General Wellness", path: "/services/general-wellness" },
      { label: "Mental Health", path: "/services/mental-health" },
      { label: "Nutrition & Diet", path: "/services/nutrition" },
      { label: "Physical Therapy", path: "/services/physical-therapy" },
      { label: "Skin & Aesthetics", path: "/services/skin-aesthetics" },
      { label: "Cardiology", path: "/services/cardiology" },
    ],
  },
  {
    label: "Our Doctors",
    path: "/doctors",
    dropdown: [
      { label: "All Doctors", path: "/doctors" },
      { label: "Specialists", path: "/doctors/specialists" },
      { label: "Book Consultation", path: "/appointment" },
    ],
  },
  {
    label: "About",
    path: "/about",
    dropdown: [
      { label: "Our Story", path: "/about" },
      { label: "Our Mission", path: "/about#mission" },
      { label: "Certifications", path: "/about#certifications" },
    ],
  },
  {
    label: "Blog",
    path: "/blog",
    dropdown: [
      { label: "Health Tips", path: "/blog/health-tips" },
      { label: "Wellness Stories", path: "/blog/wellness-stories" },
      { label: "Nutrition", path: "/blog/nutrition" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const { isMobile, isTablet } = useResponsive();
  const isSmall = isMobile || isTablet;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

const { user, logout } = useAuth();
const navigate = useNavigate();
const [showLogout, setShowLogout] = useState(false);

  const topBarH = isSmall ? 0 : 34;
  const navH = isSmall ? 58 : 70;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!isSmall) setMenuOpen(false);
  }, [isSmall]);

  useEffect(() => {
    const updateVar = () => {
      const w = window.innerWidth;
      const isSmall = w < 1024;
      document.documentElement.style.setProperty(
        "--nav-total-height",
        isSmall ? "58px" : "104px",
      );
    };
    updateVar();
    window.addEventListener("resize", updateVar);
    return () => window.removeEventListener("resize", updateVar);
  }, []);
 const handleLogout = () => setShowLogout(true);

 const confirmLogout = () => {
   logout();
   setShowLogout(false);
   setMenuOpen(false);
   navigate("/");
 };
  const userInitials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "";

  return (
    <>
      {/* ── TOP BAR (desktop only, fixed) ── */}
      {!isSmall && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: `${topBarH}px`,
            backgroundColor: "#7D9B76",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 48px",
            zIndex: 1001,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "#FDFAF5",
            }}
          >
            Calm · Natural · Premium Care
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <a
              href="tel:+923001234567"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#FDFAF5",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                textDecoration: "none",
              }}
            >
              <FiPhone size={11} /> +92 300 123 4567
            </a>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                color: "rgba(253,250,245,0.7)",
              }}
            >
              Mon–Sat: 9am – 6pm
            </span>
          </div>
        </div>
      )}

      {/* ── MAIN NAV (fixed) ── */}
      <nav
        style={{
          position: "fixed",
          top: `${topBarH}px`,
          left: 0,
          right: 0,
          height: `${navH}px`,
          zIndex: 1000,
          backgroundColor: scrolled ? "rgba(253,250,245,0.97)" : "#FDFAF5",
          borderBottom: `1px solid ${scrolled ? "#E8DDD0" : "transparent"}`,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition:
            "background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: isSmall ? "0 20px" : "0 48px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "9px",
              flexShrink: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 2C14 2 4 8 4 16C4 21.5 8.5 26 14 26C19.5 26 24 21.5 24 16C24 8 14 2 14 2Z"
                fill="#7D9B76"
                opacity="0.3"
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
                  fontSize: isSmall ? "17px" : "20px",
                  fontWeight: "600",
                  color: "#2D2D2D",
                  lineHeight: 1,
                  letterSpacing: "0.01em",
                }}
              >
                Wellness
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "8px",
                  letterSpacing: "0.24em",
                  color: "#7D9B76",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                Clinic
              </div>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          {!isSmall && (
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                listStyle: "none",
                margin: 0,
                padding: 0,
                gap: 0,
              }}
            >
              {NAV_LINKS.map((link) => (
                <li
                  key={link.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <NavLink
                    to={link.path}
                    style={({ isActive }) => ({
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      padding: "8px 12px",
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      fontWeight: "500",
                      letterSpacing: "0.03em",
                      color: isActive ? "#7D9B76" : "#2D2D2D",
                      textDecoration: "none",
                      position: "relative",
                      whiteSpace: "nowrap",
                      transition: "color 0.2s",
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {link.dropdown && (
                          <FiChevronDown
                            size={11}
                            style={{
                              transition: "transform 0.2s",
                              transform:
                                activeDropdown === link.label
                                  ? "rotate(180deg)"
                                  : "rotate(0)",
                              flexShrink: 0,
                            }}
                          />
                        )}
                        <span
                          style={{
                            position: "absolute",
                            bottom: "2px",
                            left: "12px",
                            right: "12px",
                            height: "1px",
                            background: "#7D9B76",
                            transformOrigin: "left",
                            transform:
                              isActive || activeDropdown === link.label
                                ? "scaleX(1)"
                                : "scaleX(0)",
                            transition: "transform 0.28s ease",
                          }}
                        />
                      </>
                    )}
                  </NavLink>

                  {/* DROPDOWN */}
                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.16 }}
                        style={{
                          position: "absolute",
                          top: "calc(100% + 4px)",
                          left: 0,
                          minWidth: "210px",
                          backgroundColor: "#FDFAF5",
                          border: "1px solid #E8DDD0",
                          boxShadow: "0 16px 48px rgba(45,45,45,0.1)",
                          zIndex: 1100,
                        }}
                      >
                        <div style={{ height: "2px", background: "#7D9B76" }} />
                        <ul
                          style={{
                            listStyle: "none",
                            padding: "6px 0",
                            margin: 0,
                          }}
                        >
                          {link.dropdown.map((item) => (
                            <li key={item.label}>
                              <Link
                                to={item.path}
                                onClick={() => setActiveDropdown(null)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  padding: "9px 18px",
                                  fontFamily: "var(--font-body)",
                                  fontSize: "12px",
                                  color: "#2D2D2D",
                                  textDecoration: "none",
                                  borderLeft: "2px solid transparent",
                                  transition: "all 0.18s",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "#F5EFE6";
                                  e.currentTarget.style.color = "#7D9B76";
                                  e.currentTarget.style.borderLeftColor =
                                    "#7D9B76";
                                  e.currentTarget.style.paddingLeft = "22px";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                  e.currentTarget.style.color = "#2D2D2D";
                                  e.currentTarget.style.borderLeftColor =
                                    "transparent";
                                  e.currentTarget.style.paddingLeft = "18px";
                                }}
                              >
                                <span
                                  style={{
                                    width: "3px",
                                    height: "3px",
                                    background: "#C9896A",
                                    display: "inline-block",
                                    flexShrink: 0,
                                  }}
                                />
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div
                          style={{
                            padding: "6px 18px 8px",
                            borderTop: "1px solid #F5EFE6",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              height: "1px",
                              background: "#E8DDD0",
                            }}
                          />
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8 2C8 2 3 5 3 9C3 11.8 5.2 14 8 14C10.8 14 13 11.8 13 9C13 5 8 2 8 2Z"
                              fill="#7D9B76"
                              opacity="0.4"
                            />
                            <path
                              d="M8 14V6"
                              stroke="#7D9B76"
                              strokeWidth="1"
                              strokeLinecap="square"
                            />
                          </svg>
                          <div
                            style={{
                              flex: 1,
                              height: "1px",
                              background: "#E8DDD0",
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          )}

          {/* RIGHT SIDE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            {!isSmall &&
              (user ? (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Link
                    to={user.role === "admin" ? "/admin" : "/dashboard"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#7D9B76",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#FDFAF5",
                        }}
                      >
                        {userInitials}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#2D2D2D",
                      }}
                    >
                      {user.name?.split(" ")[0]}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      padding: "7px 16px",
                      backgroundColor: "transparent",
                      color: "#6B6B6B",
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      border: "1px solid #E8DDD0",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#2D2D2D";
                      e.currentTarget.style.color = "#2D2D2D";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#E8DDD0";
                      e.currentTarget.style.color = "#6B6B6B";
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Link
                    to="/login"
                    style={{
                      padding: "8px 18px",
                      backgroundColor: "transparent",
                      color: "#2D2D2D",
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      border: "1px solid #E8DDD0",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "#2D2D2D")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "#E8DDD0")
                    }
                  >
                    Login
                  </Link>
                  <Link
                    to="/appointment"
                    style={{
                      padding: "9px 22px",
                      backgroundColor: "#7D9B76",
                      color: "#FDFAF5",
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      border: "1px solid #7D9B76",
                      transition: "all 0.3s",
                      whiteSpace: "nowrap",
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
                    Book Now
                  </Link>
                </div>
              ))}

            {isSmall && (
              <button
                onClick={() => setMenuOpen((v) => !v)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px",
                  color: "#2D2D2D",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            )}
          </div>
        </div>
      </nav>

      <LogoutModal
        isOpen={showLogout}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogout(false)}
      />

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && isSmall && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1002,
              backgroundColor: "#FDFAF5",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Mobile header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderBottom: "1px solid #F5EFE6",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#2D2D2D",
                }}
              >
                Wellness Clinic
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#2D2D2D",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Mobile links */}
            <div style={{ flex: 1, padding: "8px 24px" }}>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  style={{ borderBottom: "1px solid #F5EFE6" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 0",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (link.dropdown)
                        setMobileExpanded((v) =>
                          v === link.label ? null : link.label,
                        );
                      else {
                        navigate(link.path);
                        setMenuOpen(false);
                      }
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "26px",
                        fontWeight: "500",
                        color: "#2D2D2D",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {link.label}
                    </span>
                    {link.dropdown && (
                      <FiChevronDown
                        size={16}
                        style={{
                          transition: "transform 0.2s",
                          transform:
                            mobileExpanded === link.label
                              ? "rotate(180deg)"
                              : "rotate(0)",
                          color: "#7D9B76",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </div>

                  <AnimatePresence>
                    {link.dropdown && mobileExpanded === link.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        style={{ overflow: "hidden", paddingBottom: "8px" }}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            style={{
                              display: "block",
                              padding: "7px 0 7px 16px",
                              fontFamily: "var(--font-body)",
                              fontSize: "13px",
                              color: "#7D9B76",
                              textDecoration: "none",
                              borderLeft: "2px solid #7D9B76",
                              marginBottom: "4px",
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Mobile bottom */}
            <div
              style={{
                padding: "20px 24px 36px",
                borderTop: "1px solid #F5EFE6",
                flexShrink: 0,
              }}
            >
              {user ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Link
                    to={user.role === "admin" ? "/admin" : "/dashboard"}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "14px",
                      backgroundColor: "#7D9B76",
                      color: "#FDFAF5",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: "600",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      padding: "12px",
                      backgroundColor: "transparent",
                      border: "1px solid #E8DDD0",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#6B6B6B",
                      cursor: "pointer",
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Link
                    to="/appointment"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "14px",
                      backgroundColor: "#7D9B76",
                      color: "#FDFAF5",
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: "600",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    Book Appointment
                  </Link>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                    }}
                  >
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: "block",
                        textAlign: "center",
                        padding: "11px",
                        backgroundColor: "transparent",
                        border: "1px solid #E8DDD0",
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        fontWeight: "600",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#2D2D2D",
                        textDecoration: "none",
                      }}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: "block",
                        textAlign: "center",
                        padding: "11px",
                        backgroundColor: "#F5EFE6",
                        border: "1px solid #E8DDD0",
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        fontWeight: "600",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#7D9B76",
                        textDecoration: "none",
                      }}
                    >
                      Register
                    </Link>
                  </div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  marginTop: "14px",
                }}
              >
                <FiPhone size={12} style={{ color: "#7D9B76" }} />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "#7D9B76",
                  }}
                >
                  +92 300 123 4567
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
