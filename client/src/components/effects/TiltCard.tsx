import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 6,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const tiltX = useSpring(rotateX, springConfig);
  const tiltY = useSpring(rotateY, springConfig);

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
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    const percentX = (mouseX / width) - 0.5;
    const percentY = (mouseY / height) - 0.5;

    // Y mouse movement tilts around X axis (and vice-versa)
    rotateX.set(-percentY * maxTilt * 2);
    rotateY.set(percentX * maxTilt * 2);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  if (isDisabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className="perspective-1000" style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
