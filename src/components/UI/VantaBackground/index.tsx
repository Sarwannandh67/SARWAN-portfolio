import { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.net.min";
import { useTheme } from "next-themes";

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: isDark ? 0x3b82f6 : 0x3b82f6,
          backgroundColor: isDark ? 0x030711 : 0xffffff,
          points: 15.0,
          maxDistance: 25.0,
          spacing: 16.0,
          showDots: false,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Update the effect when theme changes
  useEffect(() => {
    if (vantaEffect) {
      vantaEffect.setOptions({
        color: isDark ? 0x3b82f6 : 0x3b82f6,
        backgroundColor: isDark ? 0x030711 : 0xffffff,
      });
    }
  }, [isDark, vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
};

export default VantaBackground;
