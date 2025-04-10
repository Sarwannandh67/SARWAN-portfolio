import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import ScrollReveal from "../ui/ScrollReveal";
import ParticlesBackground from "../ui/ParticlesBackground";
import { ArrowDown, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import GlassCard from "../ui/GlassCard";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [titleComplete, setTitleComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate title after page loads
    if (isLoaded) {
      const timer = setTimeout(() => {
        setTitleComplete(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      const interval = setInterval(() => {
        setPathLength((prev) => {
          if (prev >= 1) {
            clearInterval(interval);
            return 1;
          }
          return prev + 0.02;
        });
      }, 20);

      return () => clearInterval(interval);
    }
  }, [isLoaded]);

  const name = "Sarwan Nandh";

  return (
    <section className="min-h-screen pt-20 px-4 flex flex-col justify-between relative">
      <div className="container mx-auto max-w-6xl flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
          <div className="md:w-1/2">
            <ScrollReveal>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                I'm <span className="gradient-text">Sarwan Nandh</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                A passionate Full Stack Developer specializing in building modern web applications
                with cutting-edge technologies.
              </p>
              <div className="flex justify-start">
                <Button
                  asChild
                  className="group relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground px-10 py-7 rounded-2xl transition-all duration-700 hover:scale-105 hover:rotate-1"
                >
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="relative overflow-hidden">
                        <span className="inline-block font-medium text-lg group-hover:translate-y-[-150%] transition-transform duration-500 ease-in-out">Say Hi</span>
                        <span className="inline-block font-medium text-lg absolute top-[150%] left-0 group-hover:translate-y-[-150%] transition-transform duration-500 ease-in-out">Let's Chat</span>
                      </div>
                      <span className="animate-wave text-2xl group-hover:scale-125 transition-transform duration-500">👋</span>
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--primary),0.3),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/[0.12] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute -inset-px bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 -z-10 group-hover:scale-110" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="md:w-1/2">
            <ScrollReveal delay={200}>
              <GlassCard className="p-4">
                <Player
                  autoplay
                  loop
                  src="https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json"
                  className="w-full h-[400px]"
                  background="transparent"
                />
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
        
        <ScrollReveal delay={400}>
          <div className="flex justify-center mb-8">
            <a 
              href="#about" 
              className="group flex flex-col items-center gap-2 p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="text-sm font-medium">Scroll Down</span>
              <div className="p-2 rounded-full bg-muted/50 group-hover:bg-primary/20 transition-colors">
                <ArrowDown className="h-5 w-5 group-hover:text-primary animate-bounce" />
              </div>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;
