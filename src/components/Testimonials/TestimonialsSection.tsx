
import { useRef, useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useEmblaCarousel } from "embla-carousel-react";
import ScrollReveal from "../UI/ScrollReveal";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    content: "Working with this developer was an absolute pleasure. They delivered top-notch code and were extremely responsive to feedback.",
    author: "Sarah Johnson",
    position: "Product Manager at TechCorp",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    content: "Exceptional problem-solving skills and attention to detail. Our project was delivered ahead of schedule with zero bugs.",
    author: "Michael Chen",
    position: "CTO at StartupX",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    content: "The level of expertise and creativity brought to our project was outstanding. Would definitely hire again and recommend to others.",
    author: "Emily Rodriguez",
    position: "Marketing Director at CreativeHub",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg"
  },
  {
    content: "Incredible technical skills combined with an understanding of user experience made all the difference in our web application.",
    author: "David Kim",
    position: "Lead Designer at DesignLabs",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    content: "Delivered a complex project on time and within budget. Communication was clear throughout the entire process.",
    author: "Jennifer Lee",
    position: "Project Manager at InnovateCo",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const TestimonialsSection = () => {
  const [scrollingUp, setScrollingUp] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle auto-scrolling
  useEffect(() => {
    if (!emblaApi) return;
    
    const autoplay = () => {
      if (!emblaApi || !emblaApi.canScrollNext()) return;
      emblaApi.scrollNext();
    };
    
    // Start autoplay when component mounts
    const startAutoplay = () => {
      stopAutoplay();
      autoplayRef.current = setInterval(autoplay, 4000); // Scroll every 4 seconds
    };
    
    // Stop autoplay
    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
    
    // Update active slide index
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    
    // Add event listeners
    emblaApi.on("select", onSelect);
    
    // Pause autoplay on hover/touch
    const onPointerDown = () => stopAutoplay();
    const onPointerUp = () => startAutoplay();
    
    emblaApi.rootNode().addEventListener("pointerdown", onPointerDown);
    emblaApi.rootNode().addEventListener("pointerup", onPointerUp);
    
    // Start autoplay initially
    startAutoplay();
    
    // Cleanup
    return () => {
      stopAutoplay();
      if (emblaApi) {
        emblaApi.off("select", onSelect);
        emblaApi.rootNode().removeEventListener("pointerdown", onPointerDown);
        emblaApi.rootNode().removeEventListener("pointerup", onPointerUp);
      }
    };
  }, [emblaApi]);

  // Handle scroll direction animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      
      // Check if section is in viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Determine scroll direction
        if (currentScrollY > lastScrollY) {
          setScrollingDown(true);
          setScrollingUp(false);
        } else if (currentScrollY < lastScrollY) {
          setScrollingUp(true);
          setScrollingDown(false);
        }
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div 
        className={cn(
          "absolute inset-0 transition-transform duration-1000",
          scrollingUp && "translate-y-10",
          scrollingDown && "-translate-y-10"
        )}
      >
        <div className="bg-pattern opacity-30" />
      </div>
      
      <div className="absolute inset-0 opacity-20">
        <div className={cn(
          "w-40 h-40 rounded-full bg-primary/30 absolute top-10 left-10 blur-3xl transition-all duration-1000",
          scrollingUp && "scale-125 translate-x-5",
          scrollingDown && "scale-90 -translate-x-5"
        )} />
        <div className={cn(
          "w-60 h-60 rounded-full bg-secondary/20 absolute bottom-10 right-10 blur-3xl transition-all duration-1000",
          scrollingUp && "scale-90 -translate-y-5",
          scrollingDown && "scale-125 translate-y-5"
        )} />
      </div>
      
      <div className="container mx-auto px-4">
        <ScrollReveal className="mb-16 text-center" animation="fade-in" delay={200}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what clients have to say about working with me.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-in" delay={400} threshold={0.1}>
          <div className="relative">
            {/* Custom carousel navigation buttons for larger screens */}
            <button 
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-background/80 backdrop-blur border border-border hover:bg-primary/20 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-background/80 backdrop-blur border border-border hover:bg-primary/20 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Embla Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]",
                      activeIndex === index ? "opacity-100" : "opacity-70"
                    )}
                  >
                    <Card className={cn(
                      "glass-card h-full transition-all duration-500 overflow-hidden",
                      scrollingUp && "translate-y-4",
                      scrollingDown && "-translate-y-4",
                      activeIndex === index && "scale-105 shadow-lg shadow-primary/10"
                    )}>
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="mb-4 flex-grow">
                          <svg className="h-8 w-8 text-primary opacity-50 mb-2" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M14.001 7.001v8h-8v-8h8zM14.001 23.001v-6h-8v8h6v-2h2zM26.001 7.001v8h-8v-8h8zM26.001 23.001v-6h-8v8h6v-2h2z" />
                          </svg>
                          <p className="text-foreground">{testimonial.content}</p>
                        </div>
                        <div className="flex items-center mt-4">
                          <Avatar className={cn(
                            "h-12 w-12 border-2 transition-all duration-500",
                            activeIndex === index ? "border-primary scale-110" : "border-primary/20"
                          )}>
                            <img src={testimonial.avatar} alt={testimonial.author} />
                          </Avatar>
                          <div className="ml-4">
                            <p className="font-semibold">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pagination dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    activeIndex === index 
                      ? "w-8 bg-primary" 
                      : "bg-primary/30 hover:bg-primary/50"
                  )}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
