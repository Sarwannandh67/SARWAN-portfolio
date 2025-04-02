
import { useEffect, useState } from "react";
import ScrollReveal from "../UI/ScrollReveal";
import { ArrowDown, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const HeroSection = () => {
  const [titleComplete, setTitleComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800); // Increased from 500 to 800
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate title after page loads
    if (isLoaded) {
      const timer = setTimeout(() => {
        setTitleComplete(true);
      }, 2500); // Increased from 1500 to 2500
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
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="md:w-1/2 text-center md:text-left">
            {isLoaded && (
              <div className="inline-block relative">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  {titleWords.map((word, index) => (
                    <span 
                      key={index}
                      className={cn(
                        "inline-block mr-4 transition-all duration-700 transform opacity-0 translate-y-10",
                        isLoaded && `animate-[fade-in_0.7s_ease-out_${index * 0.3}s_forwards,slide-up_0.7s_ease-out_${index * 0.3}s_forwards]`
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

            <h2 className={cn(
              "text-2xl md:text-3xl font-bold mb-6 transition-all duration-700 transform opacity-0 translate-y-10",
              isLoaded && "animate-[fade-in_0.7s_ease-out_1.2s_forwards,slide-up_0.7s_ease-out_1.2s_forwards]"
            )}>
              <span className="text-secondary">Full Stack Developer</span> & UI Designer
            </h2>

            <ScrollReveal delay={2800}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
                I'm a full-stack developer passionate about crafting beautiful, functional, and user-centered digital experiences.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <ScrollReveal delay={2000}>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full" style={{ animationDuration: '4s' }}></div>
                <div className="absolute inset-2 rounded-full overflow-hidden glass border-2 border-white/20">
                  <img 
                    src="https://via.placeholder.com/400x400?text=Profile" 
                    alt="Developer Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/80 rounded-full"></div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={3200}>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
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
            <Button 
              variant="outline"
              className="rounded-full border-secondary text-secondary hover:bg-secondary/10 flex items-center gap-2"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              Download Resume <Download className="h-4 w-4" />
            </Button>
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
