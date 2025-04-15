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
        <div className="glass px-6 py-3 rounded-full flex items-center space-x-4 hover:scale-105 transition-all duration-300 ease-out">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavigationClick(e, item.href)}
              className={cn(
                "nav-item flex items-center space-x-1 group relative",
                isActive(item) && "active"
              )}
            >
              <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              <item.icon className={cn("h-4 w-4 relative z-10", item.animation)} />
              <span className="group-hover:scale-105 group-hover:translate-x-1 transition-all duration-300 relative z-10">{item.name}</span>
            </a>
          ))}
        </div>
      </nav>

      <button
        onClick={toggleMobileMenu}
        className={cn(
          "fixed bottom-8 right-4 z-50 p-3 rounded-full md:hidden transition-all duration-300",
          "glass hover:scale-110"
        )}
      >
        {mobileMenuOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMobileMenu} />
          <nav className="fixed bottom-24 right-4 p-4 rounded-lg glass">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    handleNavigationClick(e, item.href);
                    toggleMobileMenu();
                  }}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200",
                    isActive(item) 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default FloatingNav;
