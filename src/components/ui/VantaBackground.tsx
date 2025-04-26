import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VantaBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  onError?: (error: string) => void;
}

// Declare global window types for TypeScript
declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

const VantaBackground = ({ className, children, onError }: VantaBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const effectRef = useRef<any>(null);
  const mountedRef = useRef<boolean>(true);
  const initAttemptsRef = useRef<number>(0);
  const maxInitAttempts = 3;

  useEffect(() => {
    console.log("VantaBackground: Component mounted");
    mountedRef.current = true;
    initAttemptsRef.current = 0;
    
    // Function to check if scripts are already loaded
    const areScriptsLoaded = () => {
      const hasThree = typeof window.THREE !== 'undefined' && window.THREE.Group !== undefined;
      const hasVanta = typeof window.VANTA !== 'undefined';
      console.log("VantaBackground: Scripts loaded check", { hasThree, hasVanta });
      return hasThree && hasVanta;
    };

    // Function to load a script
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        try {
          // Check if script already exists
          const existingScript = document.querySelector(`script[src="${src}"]`);
          if (existingScript) {
            console.log(`VantaBackground: Script ${src} already loaded`);
            resolve();
            return;
          }

          console.log(`VantaBackground: Loading script: ${src}`);
          const script = document.createElement("script");
          script.src = src;
          script.async = true;
          script.onload = () => {
            console.log(`VantaBackground: Script ${src} loaded successfully`);
            // Add a small delay to ensure the script is fully initialized
            setTimeout(resolve, 100);
          };
          script.onerror = (e) => {
            console.error(`VantaBackground: Failed to load script: ${src}`, e);
            reject(new Error(`Failed to load script: ${src}`));
          };
          document.head.appendChild(script);
        } catch (err) {
          console.error(`VantaBackground: Error loading script: ${src}`, err);
          reject(err);
        }
      });
    };

    // Function to initialize Vanta effect
    const initVanta = () => {
      console.log("VantaBackground: Initializing Vanta effect");
      if (!containerRef.current) {
        console.error("VantaBackground: Container ref is not available");
        return;
      }
      
      if (!window.VANTA || !window.THREE || !window.THREE.Group) {
        console.error("VantaBackground: VANTA or THREE is not available");
        // If initialization fails, try again after a delay
        if (initAttemptsRef.current < maxInitAttempts) {
          initAttemptsRef.current += 1;
          console.log(`VantaBackground: Retrying initialization (attempt ${initAttemptsRef.current}/${maxInitAttempts})`);
          setTimeout(initVanta, 1000);
          return;
        }
        return;
      }

      try {
        // Clean up previous effect if it exists
        if (effectRef.current) {
          console.log("VantaBackground: Cleaning up previous effect");
          effectRef.current.destroy();
          effectRef.current = null;
        }

        console.log("VantaBackground: Creating new Vanta effect");
        // Create new Vanta effect with optimized settings
        const effect = window.VANTA.NET({
          el: containerRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x6d00aa,
          backgroundColor: 0x0,
          points: 8.00,
          maxDistance: 25.00,
          spacing: 20.00,
          showLines: true,
          lineColor: 0x6d00aa,
          lineWidth: 1.0,
          damping: 0.95,
          opacity: 0.5
        });

        if (mountedRef.current) {
          console.log("VantaBackground: Vanta effect created successfully");
          effectRef.current = effect;
          setIsLoading(false);
        }
      } catch (err) {
        console.error("VantaBackground: Error creating Vanta effect:", err);
        if (mountedRef.current) {
          const errorMessage = err instanceof Error ? err.message : "Failed to initialize Vanta effect";
          setError(errorMessage);
          onError?.(errorMessage);
          setIsLoading(false);
        }
      }
    };

    // Function to load scripts and initialize Vanta
    const setupVanta = async () => {
      try {
        console.log("VantaBackground: Setting up Vanta");
        setIsLoading(true);
        setError(null);
        
        // If scripts are already loaded, just initialize Vanta
        if (areScriptsLoaded()) {
          console.log("VantaBackground: Scripts already loaded, initializing Vanta");
          initVanta();
          return;
        }
        
        // Load Three.js if not already loaded
        if (!window.THREE || !window.THREE.Group) {
          console.log("VantaBackground: Loading Three.js");
          await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js");
          // Add a small delay to ensure Three.js is fully initialized
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        // Load Vanta.js if not already loaded
        if (!window.VANTA) {
          console.log("VantaBackground: Loading Vanta.js");
          await loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js");
          // Add a small delay to ensure Vanta.js is fully initialized
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        // Initialize Vanta after scripts are loaded
        if (mountedRef.current) {
          console.log("VantaBackground: Scripts loaded, initializing Vanta");
          initVanta();
        }
      } catch (err) {
        console.error("VantaBackground: Error in setupVanta:", err);
        if (mountedRef.current) {
          const errorMessage = err instanceof Error ? err.message : "Failed to load Vanta.js";
          setError(errorMessage);
          onError?.(errorMessage);
          setIsLoading(false);
        }
      }
    };

    // Handle window resize
    const handleResize = () => {
      if (effectRef.current) {
        effectRef.current.resize();
      }
    };

    // Set up Vanta and event listeners
    console.log("VantaBackground: Starting Vanta setup");
    setupVanta();
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      console.log("VantaBackground: Cleaning up Vanta");
      mountedRef.current = false;
      window.removeEventListener('resize', handleResize);
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, [onError]);

  return (
    <div 
      ref={containerRef} 
      className={cn(
        "w-full h-full relative",
        "bg-gradient-to-br from-background to-background/80",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_1px_1px,var(--foreground)_1px,transparent_0)] before:bg-[length:40px_40px] before:opacity-10",
        className
      )}
    >
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 text-destructive">
          <p>Failed to load background animation: {error}</p>
        </div>
      )}
    </div>
  );
};

export default VantaBackground; 