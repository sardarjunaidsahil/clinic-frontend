import { useState, useEffect } from "react";

export default function useNavHeight() {
  const [heights, setHeights] = useState({
    topBarH: 34,
    navH: 70,
    totalH: 104,
    isSmall: false,
  });

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const isSmall = w < 1024;
      const topBarH = isSmall ? 0 : 34;
      const navH = isSmall ? 58 : 70;
      setHeights({ topBarH, navH, totalH: topBarH + navH, isSmall });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return heights;
}
