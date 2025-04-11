import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  className?: string;
  [key: string]: any; // Allow any other props
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
