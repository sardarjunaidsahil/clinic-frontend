import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { gsap } from "gsap";
import useResponsive from "../hooks/useResponsive";

const CATEGORIES = [
  "All",
  "Nutrition",
  "Mental Health",
  "Wellness",
  "Physical Health",
  "Skincare",
];

// Map URL slugs to display labels
const SLUG_TO_CAT = {
  "health-tips": "Wellness",
  "wellness-stories": "Wellness",
  nutrition: "Nutrition",
  "mental-health": "Mental Health",
  "physical-health": "Physical Health",
  skincare: "Skincare",
};

const POSTS = [
  {
    slug: "immune-boosting-foods",
    tag: "Nutrition",
    title: "7 Foods That Naturally Boost Your Immune System",
    excerpt:
      "Discover the power of whole foods in building a resilient immune system.",
    date: "April 8, 2026",
    readTime: "5 min",
    featured: true,
  },
  {
    slug: "mindfulness-science",
    tag: "Mental Health",
    title: "The Science of Mindfulness: Why It Actually Works",
    excerpt:
      "Backed by decades of research, mindfulness transforms brain chemistry.",
    date: "April 4, 2026",
    readTime: "7 min",
    featured: false,
  },
  {
    slug: "healing-rhythms",
    tag: "Wellness",
    title: "Understanding Your Body's Natural Healing Rhythms",
    excerpt: "Your body follows innate cycles of repair and renewal.",
    date: "March 28, 2026",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "gut-health-guide",
    tag: "Nutrition",
    title: "The Complete Guide to Gut Health in 2026",
    excerpt: "The gut-brain connection is more powerful than we ever imagined.",
    date: "March 20, 2026",
    readTime: "9 min",
    featured: false,
  },
  {
    slug: "sleep-optimization",
    tag: "Wellness",
    title: "Sleep Optimization: The Secret Nobody Talks About",
    excerpt: "Quality sleep is the foundation of every health goal.",
    date: "March 14, 2026",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "skin-hydration",
    tag: "Skincare",
    title: "Hydration From Within: Skin Care That Works",
    excerpt: "True skin health begins from the inside.",
    date: "March 8, 2026",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "posture-pain",
    tag: "Physical Health",
    title: "How Poor Posture Silently Affects Your Health",
    excerpt: "Modern lifestyles have created a posture crisis.",
    date: "March 1, 2026",
    readTime: "7 min",
    featured: false,
  },
  {
    slug: "stress-management",
    tag: "Mental Health",
    title: "10 Evidence-Based Stress Management Techniques",
    excerpt: "Chronic stress is the silent driver of most modern disease.",
    date: "Feb 22, 2026",
    readTime: "8 min",
    featured: false,
  },
];

export default function Blog() {
  const { isMobile, isTablet } = useResponsive();
  const { category: catSlug } = useParams();
  const heroRef = useRef(null);

  // Derive initial category from URL slug
  const initialCat = catSlug ? SLUG_TO_CAT[catSlug] || "All" : "All";
  const [activeCategory, setActiveCategory] = useState(initialCat);

  // Sync when URL changes
  useEffect(() => {
    setActiveCategory(catSlug ? SLUG_TO_CAT[catSlug] || "All" : "All");
  }, [catSlug]);

  useEffect(() => {
    if (!heroRef.current) return
    Array.from(heroRef.current.children).forEach((el, i) => {
      el.style.animation = `slideUp 0.5s ease-out ${i * 0.08}s both`
    })
  }, [])

  const filtered =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.tag === activeCategory);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main style={{ backgroundColor: "#FDFAF5", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        ref={heroRef}
        style={{
          backgroundColor: "#F5EFE6",
          padding: isMobile ? "56px 24px 40px" : "76px 48px 56px",
          borderBottom: "1px solid #E8DDD0",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "14px",
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
              Wellness Journal
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isMobile ? "38px" : "clamp(38px, 5vw, 64px)",
              fontWeight: "400",
              color: "#2D2D2D",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "14px",
            }}
          >
            Health{" "}
            <em style={{ fontStyle: "italic", color: "#7D9B76" }}>Insights</em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              lineHeight: 1.8,
              color: "#6B6B6B",
              fontWeight: "300",
              maxWidth: "460px",
            }}
          >
            Evidence-based wellness insights from our specialists — to help you
            live with intention and vitality.
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div
        style={{
          backgroundColor: "#FDFAF5",
          borderBottom: "1px solid #E8DDD0",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: isMobile ? "0 24px" : "0 48px",
            display: "flex",
            minWidth: "max-content",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "15px 18px",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: activeCategory === cat ? "#7D9B76" : "#6B6B6B",
                borderBottom:
                  activeCategory === cat
                    ? "2px solid #7D9B76"
                    : "2px solid transparent",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile
            ? "36px 24px"
            : isTablet
              ? "48px 40px"
              : "56px 48px",
        }}
      >
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "28px",
                color: "#E8DDD0",
                marginBottom: "10px",
              }}
            >
              No articles found
            </div>
            <button
              onClick={() => setActiveCategory("All")}
              style={{
                padding: "10px 22px",
                backgroundColor: "#7D9B76",
                color: "#FDFAF5",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
              }}
            >
              Show All Articles
            </button>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <Link
                to={`/blog/${featured.slug}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
                  border: "1px solid #E8DDD0",
                  textDecoration: "none",
                  marginBottom: isMobile ? "20px" : "1px",
                  transition: "border-color 0.3s",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#7D9B76")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#E8DDD0")
                }
              >
                <div
                  style={{
                    backgroundColor: "#F5EFE6",
                    padding: isMobile ? "32px 24px" : "52px 44px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "14px",
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 9px",
                        backgroundColor: "#7D9B76",
                        fontFamily: "var(--font-body)",
                        fontSize: "9px",
                        fontWeight: "600",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#FDFAF5",
                      }}
                    >
                      Featured
                    </span>
                    <span
                      style={{
                        padding: "2px 9px",
                        backgroundColor: "#FDFAF5",
                        border: "1px solid #E8DDD0",
                        fontFamily: "var(--font-body)",
                        fontSize: "9px",
                        fontWeight: "600",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#C9896A",
                      }}
                    >
                      {featured.tag}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: isMobile ? "24px" : "34px",
                      fontWeight: "500",
                      color: "#2D2D2D",
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      marginBottom: "12px",
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      lineHeight: 1.7,
                      color: "#6B6B6B",
                      fontWeight: "300",
                      marginBottom: "16px",
                    }}
                  >
                    {featured.excerpt}
                  </p>
                  <div style={{ display: "flex", gap: "14px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        color: "#7D9B76",
                      }}
                    >
                      {featured.date}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        color: "#6B6B6B",
                      }}
                    >
                      {featured.readTime} read
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#E8DDD0",
                    minHeight: isMobile ? "180px" : "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 60 60" fill="none">
                    <path
                      d="M30 5C30 5 8 18 8 35C8 46 18 55 30 55C42 55 52 46 52 35C52 18 30 5 30 5Z"
                      fill="#7D9B76"
                      opacity="0.3"
                    />
                    <path
                      d="M30 55V20M30 20C30 20 38 26 42 34"
                      stroke="#7D9B76"
                      strokeWidth="2"
                      strokeLinecap="square"
                    />
                  </svg>
                </div>
              </Link>
            )}

            {/* Rest grid */}
            {rest.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : isTablet
                      ? "repeat(2, 1fr)"
                      : "repeat(3, 1fr)",
                  gap: "1px",
                  backgroundColor: "#E8DDD0",
                  border: "1px solid #E8DDD0",
                }}
              >
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    style={{
                      display: "block",
                      backgroundColor: "#FDFAF5",
                      padding: isMobile ? "26px 22px" : "32px 28px",
                      textDecoration: "none",
                      transition: "background-color 0.25s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#F9F5F0";
                      e.currentTarget.querySelector(".bacc").style.width =
                        "100%";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FDFAF5";
                      e.currentTarget.querySelector(".bacc").style.width = "0%";
                    }}
                  >
                    <div
                      className="bacc"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "2px",
                        width: "0%",
                        backgroundColor: "#C9896A",
                        transition: "width 0.4s ease",
                      }}
                    />
                    <div
                      style={{
                        display: "inline-block",
                        padding: "2px 9px",
                        backgroundColor: "#F5EFE6",
                        fontFamily: "var(--font-body)",
                        fontSize: "9px",
                        fontWeight: "600",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#C9896A",
                        marginBottom: "14px",
                      }}
                    >
                      {post.tag}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: isMobile ? "19px" : "21px",
                        fontWeight: "500",
                        color: "#2D2D2D",
                        lineHeight: 1.3,
                        letterSpacing: "-0.01em",
                        marginBottom: "9px",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        lineHeight: 1.65,
                        color: "#6B6B6B",
                        fontWeight: "300",
                        marginBottom: "18px",
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "12px",
                        borderTop: "1px solid #F5EFE6",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "11px",
                          color: "#7D9B76",
                        }}
                      >
                        {post.date}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "11px",
                          color: "#6B6B6B",
                        }}
                      >
                        {post.readTime} read
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
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
