
import { useEffect, useRef, ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  animation?: "fade-in" | "slide-up" | "both";
  once?: boolean;
};

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  animation = "both",
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    let observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: threshold,
    };
    
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (animation === "fade-in") {
              entry.target.classList.add("animate-fade-in");
            } else if (animation === "slide-up") {
              entry.target.classList.add("animate-slide-up");
            } else {
              entry.target.classList.add("animate-fade-in", "animate-slide-up");
            }
          }, delay);
          
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          if (animation === "fade-in") {
            entry.target.classList.remove("animate-fade-in");
          } else if (animation === "slide-up") {
            entry.target.classList.remove("animate-slide-up");
          } else {
            entry.target.classList.remove("animate-fade-in", "animate-slide-up");
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animation, delay, once, threshold]);
  
  const animationClass = animation === "both" ? "opacity-0 translate-y-10" : 
                         animation === "fade-in" ? "opacity-0" : 
                         animation === "slide-up" ? "translate-y-10" : "";
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out ${animationClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
