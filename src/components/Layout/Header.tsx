import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { Button } from "../UI/button";
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
        scrolled 
          ? "bg-background/40 backdrop-blur-md border-b border-border/5 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="h-10 relative">
            <img 
              src="/images/sarwan-logo.jpg" 
              alt="SARWAN - Born to Invent" 
              className="h-full w-auto object-contain rounded-sm"
              style={{
                filter: 'brightness(1.15) contrast(1.1)',
                mixBlendMode: 'screen'
              }}
            />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
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
