import { useParams, Link } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";

const POSTS = {
  "immune-boosting-foods": {
    title: "7 Foods That Naturally Boost Your Immune System",
    tag: "Nutrition",
    date: "April 8, 2026",
    readTime: "5 min",
    content: `Your immune system is your body's most sophisticated defense network. The good news? The foods you eat every day can powerfully influence how well it functions.\n\n**1. Citrus Fruits** — Rich in Vitamin C, which increases the production of white blood cells. Try oranges, lemons, and grapefruits daily.\n\n**2. Garlic** — Contains allicin, a compound with potent immune-boosting and antimicrobial properties.\n\n**3. Ginger** — Helps reduce inflammation and can help decrease a sore throat. Ginger may also help with nausea.\n\n**4. Spinach** — Packed with Vitamin C, antioxidants, and beta carotene, which may increase the infection-fighting ability of our immune systems.\n\n**5. Yogurt** — Look for labels that have "live and active cultures." These cultures may stimulate your immune system to help fight diseases.\n\n**6. Almonds** — Vitamin E is key to a healthy immune system. Almonds are packed with the vitamin and also have healthy fats.\n\n**7. Turmeric** — The key ingredient curcumin has antioxidant and anti-inflammatory properties that boost immune function.`,
  },
};

export default function BlogDetail() {
  const { slug } = useParams();
  const { isMobile, isTablet } = useResponsive();
  const post = POSTS[slug];

  if (!post)
    return (
      <main
        style={{
          backgroundColor: "#FDFAF5",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "48px",
            color: "#E8DDD0",
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "28px",
            color: "#2D2D2D",
            fontWeight: "400",
          }}
        >
          Article not found
        </h1>
        <Link
          to="/blog"
          style={{
            padding: "12px 28px",
            backgroundColor: "#7D9B76",
            color: "#FDFAF5",
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          All Articles
        </Link>
      </main>
    );

  return (
    <main style={{ backgroundColor: "#FDFAF5", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          backgroundColor: "#F5EFE6",
          borderBottom: "1px solid #E8DDD0",
          padding: isMobile ? "48px 24px 36px" : "72px 48px 52px",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <Link
            to="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "#7D9B76",
              textDecoration: "none",
              marginBottom: "20px",
              letterSpacing: "0.04em",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 3L5 8l5 5"
                stroke="#7D9B76"
                strokeWidth="1.2"
                strokeLinecap="square"
              />
            </svg>
            Back to Blog
          </Link>
          <div
            style={{
              display: "inline-block",
              padding: "2px 10px",
              backgroundColor: "#7D9B76",
              fontFamily: "var(--font-body)",
              fontSize: "9px",
              fontWeight: "600",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#FDFAF5",
              marginBottom: "16px",
            }}
          >
            {post.tag}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: isMobile
                ? "clamp(28px,7vw,40px)"
                : "clamp(32px,4vw,52px)",
              fontWeight: "400",
              color: "#2D2D2D",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              animation: "slideUp 0.5s ease-out both",
            }}
          >
            {post.title}
          </h1>
          <div
            style={{
              display: "flex",
              gap: "16px",
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "#6B6B6B",
            }}
          >
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} read</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: isMobile ? "36px 24px 60px" : "56px 48px 80px",
        }}
      >
        {post.content.split("\n\n").map((para, i) => {
          if (para.startsWith("**") && para.includes("**")) {
            const [title, ...rest] = para.split("** — ");
            return (
              <div key={i} style={{ marginBottom: "22px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "22px",
                    fontWeight: "500",
                    color: "#2D2D2D",
                    marginBottom: "6px",
                  }}
                >
                  {title.replace(/\*\*/g, "")}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    lineHeight: 1.85,
                    color: "#4A4A4A",
                    fontWeight: "300",
                  }}
                >
                  {rest.join(" — ")}
                </p>
              </div>
            );
          }
          return (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                lineHeight: 1.85,
                color: "#4A4A4A",
                fontWeight: "300",
                marginBottom: "20px",
              }}
            >
              {para}
            </p>
          );
        })}

        {/* CTA */}
        <div
          style={{
            marginTop: "48px",
            padding: "32px",
            backgroundColor: "#F5EFE6",
            border: "1px solid #E8DDD0",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: "600",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9896A",
              marginBottom: "10px",
            }}
          >
            Ready to Begin?
          </div>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "26px",
              fontWeight: "400",
              color: "#2D2D2D",
              marginBottom: "16px",
            }}
          >
            Speak with a Wellness Specialist
          </h3>
          <Link
            to="/appointment"
            style={{
              display: "inline-block",
              padding: "13px 28px",
              backgroundColor: "#7D9B76",
              color: "#FDFAF5",
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: "1px solid #7D9B76",
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
            Book Appointment
          </Link>
        </div>
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </main>
  );
}
