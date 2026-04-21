import { useState, useEffect } from "react";

export default function useResponsive() {
  const getVals = (w) => ({
    isMobile: w < 768,
    isTablet: w >= 768 && w < 1024,
    isDesktop: w >= 1024,
    width: w,
  });

  const [screen, setScreen] = useState(() =>
    getVals(typeof window !== "undefined" ? window.innerWidth : 1200),
  );

  useEffect(() => {
    const update = () => setScreen(getVals(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return screen;
}
