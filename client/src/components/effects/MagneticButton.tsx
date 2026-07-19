import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  strength?: number;
  dataHoverTarget?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.25,
  dataHoverTarget = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const magneticX = useSpring(x, springConfig);
  const magneticY = useSpring(y, springConfig);

  useEffect(() => {
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (touchQuery.matches || motionQuery.matches) {
      setIsDisabled(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    // Cap at +/- 12px
    const cappedX = Math.max(-12, Math.min(12, distanceX));
    const cappedY = Math.max(-12, Math.min(12, distanceY));

    x.set(cappedX);
    y.set(cappedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={isDisabled ? undefined : { x: magneticX, y: magneticY }}
      className={`inline-block ${className}`}
      {...(dataHoverTarget ? { "data-hover-target": "true" } : {})}
    >
      {children}
    </motion.div>
  );
}
