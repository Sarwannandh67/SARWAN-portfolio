import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimationType = "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "bounce";

interface EntranceAnimationProps {
  children: ReactNode;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
}

const EntranceAnimation = ({
  children,
  type = "fade",
  delay = 0,
  duration = 0.5,
  className = "",
}: EntranceAnimationProps) => {
  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };

    switch (type) {
      case "fade":
        return baseVariants;
      case "slide-up":
        return {
          hidden: { ...baseVariants.hidden, y: 20 },
          visible: { ...baseVariants.visible, y: 0 },
        };
      case "slide-down":
        return {
          hidden: { ...baseVariants.hidden, y: -20 },
          visible: { ...baseVariants.visible, y: 0 },
        };
      case "slide-left":
        return {
          hidden: { ...baseVariants.hidden, x: 20 },
          visible: { ...baseVariants.visible, x: 0 },
        };
      case "slide-right":
        return {
          hidden: { ...baseVariants.hidden, x: -20 },
          visible: { ...baseVariants.visible, x: 0 },
        };
      case "scale":
        return {
          hidden: { ...baseVariants.hidden, scale: 0.8 },
          visible: { ...baseVariants.visible, scale: 1 },
        };
      case "bounce":
        return {
          hidden: { ...baseVariants.hidden, y: 20 },
          visible: { 
            ...baseVariants.visible, 
            y: 0,
            transition: {
              type: "spring",
              bounce: 0.4,
              duration: 0.8,
            }
          },
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={getAnimationVariants()}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default EntranceAnimation; 