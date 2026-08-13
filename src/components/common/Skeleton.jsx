export function Skeleton({
  width = "100%",
  height = "20px",
  style = {},
  className = "",
}) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        backgroundColor: "#F5EFE6",
        backgroundImage:
          "linear-gradient(90deg, #F5EFE6 0%, #E8DDD0 50%, #F5EFE6 100%)",
        backgroundSize: "200% 100%",
        animation: "skeletonShimmer 1.6s infinite ease-in-out",
        border: "1px solid #E8DDD0",
        ...style,
      }}
    >
      <style>{`
        @keyframes skeletonShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export function SkeletonText({ lines = 3, gap = "8px" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="14px"
          width={i === lines - 1 && lines > 1 ? "65%" : "100%"}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div
      style={{
        backgroundColor: "#F5EFE6",
        border: "1px solid #E8DDD0",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton width="40%" height="24px" />
        <Skeleton width="70px" height="20px" />
      </div>
      <SkeletonText lines={2} />
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "8px",
          paddingTop: "16px",
          borderTop: "1px solid #E8DDD0",
        }}
      >
        <Skeleton width="100px" height="32px" />
        <Skeleton width="80px" height="32px" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #E8DDD0",
        backgroundColor: "#FDFAF5",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "16px",
          padding: "16px 20px",
          backgroundColor: "#F5EFE6",
          borderBottom: "1px solid #E8DDD0",
        }}
      >
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} height="16px" width="70%" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: "16px",
            padding: "16px 20px",
            borderBottom: r === rows - 1 ? "none" : "1px solid #E8DDD0",
          }}
        >
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} height="16px" width={c === 0 ? "85%" : "60%"} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
