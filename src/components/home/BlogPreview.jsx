import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useResponsive from "../../hooks/useResponsive";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    tag: "Nutrition",
    title: "7 Foods That Naturally Boost Your Immune System",
    excerpt:
      "Discover the power of whole foods in building a resilient immune system. Simple dietary changes that make a profound difference.",
    date: "April 8, 2026",
    readTime: "5 min read",
    slug: "immune-boosting-foods",
  },
  {
    tag: "Mental Health",
    title: "The Science of Mindfulness: Why It Actually Works",
    excerpt:
      "Backed by decades of research, mindfulness transforms brain chemistry. Here is what happens when you commit to a daily practice.",
    date: "April 4, 2026",
    readTime: "7 min read",
    slug: "mindfulness-science",
  },
  {
    tag: "Wellness",
    title: "Understanding Your Body's Natural Healing Rhythms",
    excerpt:
      "Your body follows innate cycles of repair and renewal. Learning to work with these rhythms can dramatically accelerate recovery.",
    date: "March 28, 2026",
    readTime: "6 min read",
    slug: "healing-rhythms",
  },
];

export default function BlogPreview() {
  const { isMobile, isTablet } = useResponsive();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        },
      );
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#F5EFE6",
        padding: isMobile ? "60px 24px" : isTablet ? "80px 40px" : "100px 48px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Title */}
        <div
          ref={titleRef}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: isMobile ? "36px" : "56px",
            opacity: 0,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "14px",
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
                Wellness Journal
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: isMobile ? "34px" : "clamp(34px, 4vw, 52px)",
                fontWeight: "400",
                color: "#2D2D2D",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Latest{" "}
              <em style={{ fontStyle: "italic", color: "#7D9B76" }}>
                Insights
              </em>
            </h2>
          </div>
          <Link
            to="/blog"
            style={{
              padding: "10px 26px",
              border: "1px solid #2D2D2D",
              color: "#2D2D2D",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "all 0.3s",
              alignSelf: isMobile ? "flex-start" : "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2D2D2D";
              e.currentTarget.style.color = "#FDFAF5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#2D2D2D";
            }}
          >
            All Articles
          </Link>
        </div>

        {/* Posts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "repeat(2, 1fr)"
                : "repeat(3, 1fr)",
            gap: isMobile ? "24px" : "1px",
            backgroundColor: isMobile ? "transparent" : "#E8DDD0",
            border: isMobile ? "none" : "1px solid #E8DDD0",
          }}
        >
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{
                display: "block",
                backgroundColor: "#FDFAF5",
                padding: isMobile ? "28px 24px" : "36px 32px",
                textDecoration: "none",
                transition: "background-color 0.3s",
                opacity: 0,
                border: isMobile ? "1px solid #E8DDD0" : "none",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FDFAF5";
                const accent = e.currentTarget.querySelector(".blog-accent");
                if (accent) accent.style.width = "100%";
              }}
              onMouseLeave={(e) => {
                const accent = e.currentTarget.querySelector(".blog-accent");
                if (accent) accent.style.width = "0%";
              }}
            >
              <div
                className="blog-accent"
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

              {/* Tag */}
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 10px",
                  backgroundColor: "#F5EFE6",
                  fontFamily: "var(--font-body)",
                  fontSize: "9px",
                  fontWeight: "600",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9896A",
                  marginBottom: "18px",
                }}
              >
                {post.tag}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: isMobile ? "20px" : "23px",
                  fontWeight: "500",
                  color: "#2D2D2D",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  marginBottom: "12px",
                }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  lineHeight: 1.7,
                  color: "#6B6B6B",
                  fontWeight: "300",
                  marginBottom: "24px",
                }}
              >
                {post.excerpt}
              </p>

              {/* Meta */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "16px",
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
                  {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
