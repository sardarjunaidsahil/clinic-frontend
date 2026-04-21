import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useFadeUp(deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, deps);
  return ref;
}

export function useStaggerFadeUp(stagger = 0.1, deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, deps);
  return ref;
}

export function useParallax(speed = 0.5, deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, deps);
  return ref;
}

export function useEntranceAnimation(deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.2 },
      );
    }, ref);
    return () => ctx.revert();
  }, deps);
  return ref;
}
