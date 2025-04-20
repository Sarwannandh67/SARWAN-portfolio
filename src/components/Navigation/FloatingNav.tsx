import { useState, useEffect, useRef } from "react";
import { 
  UserCircle2, 
  BriefcaseIcon, 
  MailIcon, 
  CodeIcon, 
  MenuIcon, 
  XIcon, 
  LightbulbIcon, 
  BookOpenIcon,
  Monitor
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navigation = [
  { 
    name: "Home", 
    href: "/", 
    icon: UserCircle2, 
    exact: true,
    animation: "group-hover:scale-110 group-hover:rotate-6 group-hover:text-primary transition-all duration-300 ease-in-out"
  },
  { 
    name: "Projects", 
    href: "/#projects", 
    icon: BriefcaseIcon, 
    exact: false,
    animation: "group-hover:scale-110 group-hover:-rotate-6 group-hover:text-primary transition-all duration-300 ease-in-out"
  },
  { 
    name: "Skills", 
    href: "/#skills", 
    icon: LightbulbIcon, 
    exact: false,
    animation: "group-hover:scale-110 group-hover:rotate-6 group-hover:text-primary transition-all duration-300 ease-in-out"
  },
  { 
    name: "About", 
    href: "/#about", 
    icon: CodeIcon, 
    exact: false,
    animation: "group-hover:scale-110 group-hover:-rotate-6 group-hover:text-primary transition-all duration-300 ease-in-out"
  },
  { 
    name: "Contact", 
    href: "/contact", 
    icon: MailIcon, 
    exact: true,
    animation: "group-hover:scale-110 group-hover:rotate-6 group-hover:text-primary transition-all duration-300 ease-in-out"
  },
  { 
    name: "Blog", 
    href: "/blog", 
    icon: BookOpenIcon, 
    exact: true,
    animation: "group-hover:scale-110 group-hover:-rotate-6 group-hover:text-primary transition-all duration-300 ease-in-out"
  },
  { 
    name: "GradePro", 
    href: "/gradepro", 
    icon: Monitor, 
    exact: true,
    animation: "group-hover:scale-110 group-hover:rotate-6 group-hover:text-primary transition-all duration-300 ease-in-out"
  },
];

const FloatingNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTimeout = useRef(null);
  const isScrolling = useRef(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      const currentScrollY = window.scrollY;
      
      if (!isHovered && !isScrolling.current) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
      
      if (location.pathname === '/') {
        scrollTimeout.current = setTimeout(() => {
          const sections = ["hero", "projects", "skills", "about"];
          let active = "hero";
          let minDistance = Infinity;
          
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              const distance = Math.abs(rect.top - 100);
              
              if (distance < minDistance && rect.top <= 200) {
                minDistance = distance;
                active = section;
              }
            }
          }
          
          setActiveSection(active);
        }, 100);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [lastScrollY, location.pathname, isHovered]);

  const handleNavigationClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href.startsWith('/#')) {
      const section = href.substring(2);
      const element = document.getElementById(section);
      if (element) {
        isScrolling.current = true;
        setVisible(true);
        
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        setActiveSection(section);
        
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    } else {
      setVisible(false);
      setTimeout(() => {
        navigate(href);
      }, 300);
    }
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div 
        className="nav-hover-area"
        onMouseEnter={() => {
          setIsHovered(true);
          setVisible(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (lastScrollY > 100 && !isScrolling.current) {
            setVisible(false);
          }
        }}
      />
      <nav 
        ref={navRef}
        className={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 hidden md:block",
          visible ? "nav-slide-up" : "nav-slide-down"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-background/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-border/50">
          <div className="flex items-center justify-center space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavigationClick(e, item.href)}
                className={cn(
                  "group flex flex-col items-center justify-center w-12 h-12 rounded-full hover:bg-muted transition-colors relative",
                  isActive(item) && "bg-muted text-primary"
                )}
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      item.animation
                    )}
                  />
                )}
                <span className="sr-only">{item.name}</span>
                <div className="absolute -top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                  {item.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </nav>
      
      <button
        onClick={toggleMobileMenu}
        className={cn(
          "md:hidden fixed bottom-8 right-8 z-50 bg-background/80 backdrop-blur-md p-4 rounded-full shadow-lg border border-border/50 transition-all duration-300",
          visible ? "translate-y-0 opacity-100" : "translate-y-28 opacity-0"
        )}
      >
        {mobileMenuOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={toggleMobileMenu} />
        <nav className="absolute bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-background rounded-lg shadow-lg border border-border/50 p-6">
          <div className="grid grid-cols-3 gap-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  handleNavigationClick(e, item.href);
                  toggleMobileMenu();
                }}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-lg hover:bg-muted transition-colors text-center",
                  isActive(item) && "bg-muted text-primary"
                )}
              >
                {item.icon && <item.icon className="h-6 w-6 mb-2" />}
                <span className="text-sm">{item.name}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default FloatingNav;
