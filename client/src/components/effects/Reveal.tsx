import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  index?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  delayOffset?: number;
}

export default function Reveal({
  children,
  className = "",
  index = 0,
  direction = "up",
  delayOffset = 0,
}: RevealProps) {
  const getInitialOffset = () => {
    switch (direction) {
      case "up":
        return { y: 24, x: 0 };
      case "down":
        return { y: -24, x: 0 };
      case "left":
        return { x: 24, y: 0 };
      case "right":
        return { x: -24, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08 + delayOffset,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
