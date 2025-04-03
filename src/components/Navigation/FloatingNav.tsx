
import { useState, useEffect } from "react";
import { User, Briefcase, Mail, Code, Menu, X, Lightbulb, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/", icon: User, exact: true },
  { name: "Projects", href: "/#projects", icon: Briefcase, exact: false },
  { name: "Skills", href: "/#skills", icon: Lightbulb, exact: false },
  { name: "Testimonials", href: "/#testimonials", icon: Code, exact: false },
  { name: "About", href: "/#about", icon: Code, exact: false },
  { name: "Contact", href: "/#contact", icon: Mail, exact: false },
  { name: "Blog", href: "/blog", icon: BookOpen, exact: true },
];

const FloatingNav = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide/show nav based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      
      // Only determine active section on homepage
      if (location.pathname === '/') {
        // Determine active section
        const sections = ["hero", "projects", "skills", "testimonials", "about", "contact"];
        
        for (const section of sections.reverse()) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (item) => {
    if (item.exact) {
      return item.href === location.pathname;
    } else if (item.href.startsWith('/#')) {
      const section = item.href.substring(2);
      return location.pathname === '/' && activeSection === section;
    }
    return false;
  };

  return (
    <>
      {/* Desktop navigation */}
      <nav 
        className={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-transform duration-300 hidden md:block",
          !visible && "translate-y-24"
        )}
      >
        <div className="glass px-4 py-3 rounded-full flex items-center space-x-2">
          {navigation.map((item) => (
            item.href.startsWith('/#') ? (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "nav-item flex items-center space-x-1",
                  isActive(item) && "active"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "nav-item flex items-center space-x-1",
                  isActive(item) && "active"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          ))}
        </div>
      </nav>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-8 right-8 z-50">
        <button
          onClick={toggleMobileMenu}
          className="glass p-4 rounded-full flex items-center justify-center"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <nav className="absolute bottom-24 right-8 glass p-4 rounded-xl flex flex-col space-y-2">
          {navigation.map((item) => (
            item.href.startsWith('/#') ? (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "nav-item flex items-center space-x-2 px-4 py-2",
                  isActive(item) && "active"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "nav-item flex items-center space-x-2 px-4 py-2",
                  isActive(item) && "active"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          ))}
        </nav>
      </div>
    </>
  );
};

export default FloatingNav;
