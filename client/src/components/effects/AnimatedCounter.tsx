import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1.5,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Parse numeric part, prefix, and suffix
  const strValue = String(value);
  const match = strValue.match(/^([^0-[#\d]*)([\d,.]+)(.*)$/);

  const prefix = match ? match[1] : "";
  const numericTarget = match ? parseFloat(match[2].replace(/,/g, "")) : 0;
  const suffix = match ? match[3] : strValue;
  const isNumeric = match && !isNaN(numericTarget);

  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (!isInView || !isNumeric) return;

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrentNumber(numericTarget);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const nextVal = Math.floor(easedProgress * numericTarget);
      setCurrentNumber(nextVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentNumber(numericTarget);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, isNumeric, numericTarget, duration]);

  if (!isNumeric) {
    return <span className={className}>{strValue}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {isInView ? currentNumber.toLocaleString() : 0}
      {suffix}
    </span>
  );
}
