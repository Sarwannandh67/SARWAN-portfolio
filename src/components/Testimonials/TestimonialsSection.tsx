
import { useRef, useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import ScrollReveal from "../UI/ScrollReveal";
import { cn } from "@/lib/utils";

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
        } else {
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
      <div 
        className={cn(
          "absolute inset-0 transition-transform duration-1000",
          scrollingUp && "translate-y-10",
          scrollingDown && "-translate-y-10"
        )}
      >
        <div className="bg-pattern opacity-30" />
      </div>
      
      <div className="container mx-auto px-4">
        <ScrollReveal className="mb-16 text-center" animation="fade-in" delay={200}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what clients have to say about working with me.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-in" delay={400} threshold={0.1}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className={cn(
                    "glass-card h-full transition-all duration-500",
                    scrollingUp && "translate-y-4",
                    scrollingDown && "-translate-y-4"
                  )}>
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4 flex-grow">
                        <svg className="h-8 w-8 text-primary opacity-50 mb-2" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M14.001 7.001v8h-8v-8h8zM14.001 23.001v-6h-8v8h6v-2h2zM26.001 7.001v8h-8v-8h8zM26.001 23.001v-6h-8v8h6v-2h2z" />
                        </svg>
                        <p className="text-foreground">{testimonial.content}</p>
                      </div>
                      <div className="flex items-center mt-4">
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                          <img src={testimonial.avatar} alt={testimonial.author} />
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
