// This file contains type declarations for the GlassCard component

declare module "@/components/ui/GlassCard" {
  import { ReactNode } from "react";
  
  interface GlassCardProps {
    children: ReactNode;
    hoverEffect?: boolean;
    glowEffect?: boolean;
    className?: string;
    [key: string]: any;
  }
  
  const GlassCard: React.FC<GlassCardProps>;
  export default GlassCard;
} 