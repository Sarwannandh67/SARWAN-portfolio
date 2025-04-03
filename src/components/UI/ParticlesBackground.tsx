
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; // Using loadFull instead of loadSlim

interface ParticlesBackgroundProps {
  className?: string;
}

const ParticlesBackground = ({ className }: ParticlesBackgroundProps) => {
  const particlesInit = useCallback(async (engine: any) => {
    // This will load the full tsParticles package
    await loadFull(engine);
  }, []);

  return (
    <Particles
      className={className}
      id="tsparticles"
      init={particlesInit}
      options={{
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#8B5CF6", "#6366F1", "#3B82F6", "#0EA5E9"],
          },
          links: {
            color: "#8B5CF6",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.4,
            random: true,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
            random: true,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 180,
              links: {
                opacity: 0.5,
              },
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
