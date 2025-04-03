
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="font-bold text-lg gradient-text">Portfolio</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              {["Projects", "Skills", "Testimonials", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={`/#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            Resume <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
