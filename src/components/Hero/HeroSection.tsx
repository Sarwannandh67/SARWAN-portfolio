
import { useEffect, useState } from "react";
import ScrollReveal from "../UI/ScrollReveal";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const [titleComplete, setTitleComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate title after page loads
    if (isLoaded) {
      const timer = setTimeout(() => {
        setTitleComplete(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  const title = "Creating Digital Experiences";
  const titleWords = title.split(" ");

  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col justify-center items-center relative px-4 py-20"
    >
      <div className="container max-w-4xl mx-auto text-center">
        <div className="mb-8">
          {isLoaded && (
            <div className="inline-block relative">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {titleWords.map((word, index) => (
                  <span 
                    key={index}
                    className={cn(
                      "inline-block mr-4 transition-all duration-700 transform opacity-0 translate-y-10",
                      isLoaded && `animate-[fade-in_0.7s_ease-out_${index * 0.2}s_forwards,slide-up_0.7s_ease-out_${index * 0.2}s_forwards]`
                    )}
                  >
                    {index === 0 ? (
                      <span className="gradient-text">{word}</span>
                    ) : (
                      word
                    )}
                  </span>
                ))}
              </h1>
            </div>
          )}

          <ScrollReveal delay={1500}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              I'm a full-stack developer passionate about crafting beautiful, functional, and user-centered digital experiences.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={2000}>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a 
              href="#projects"
              className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-full px-8 py-3 font-medium transition-all"
            >
              View My Work
            </a>
            <a 
              href="#contact"
              className="bg-transparent border border-primary text-primary hover:bg-primary/10 rounded-full px-8 py-3 font-medium transition-all"
            >
              Get in Touch
            </a>
          </div>
        </ScrollReveal>
      </div>

      <div className={cn(
        "absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000",
        titleComplete ? "opacity-100" : "opacity-0"
      )}>
        <a 
          href="#projects" 
          className="flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="mb-2">Scroll Down</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
