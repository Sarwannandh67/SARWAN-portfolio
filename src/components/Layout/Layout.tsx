import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingNav from "../Navigation/FloatingNav";
import VantaBackground from "../ui/VantaBackground";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isBackgroundReady, setIsBackgroundReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsBackgroundReady(false);
    setError(null);
    const timer = setTimeout(() => {
      setIsBackgroundReady(true);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname]);

  const handleBackgroundError = (error: string) => {
    setError(error);
  };

  return (
    <div className="min-h-screen flex flex-col relative isolate">
      {/* Background Layers */}
      <div className="fixed inset-0 -z-20">
        {isBackgroundReady && (
          <VantaBackground 
            className="w-full h-full" 
            onError={handleBackgroundError}
          />
        )}
      </div>
      
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 -z-10 bg-pattern opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="fixed inset-0 -z-10 bg-gradient-overlay opacity-80"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3))'
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <FloatingNav />
        <main className="flex-grow">
          {error && (
            <div className="fixed top-4 right-4 bg-destructive/90 text-destructive-foreground p-4 rounded-lg shadow-lg">
              <p>Background error: {error}</p>
            </div>
          )}
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
