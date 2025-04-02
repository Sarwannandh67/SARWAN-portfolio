
import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverEffect?: boolean;
  glowEffect?: boolean;
}

const GlassCard = ({ 
  children, 
  className,
  hoverEffect = true,
  glowEffect = false,
  ...props 
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card", 
        hoverEffect && "hover:scale-[1.02]", 
        glowEffect && "animate-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
