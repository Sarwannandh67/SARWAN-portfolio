declare global {
  interface Window {
    THREE: any;
    VANTA: {
      NET: (config: {
        el: HTMLElement;
        mouseControls?: boolean;
        touchControls?: boolean;
        gyroControls?: boolean;
        minHeight?: number;
        minWidth?: number;
        scale?: number;
        scaleMobile?: number;
        color?: number;
        backgroundColor?: number;
        points?: number;
        maxDistance?: number;
        spacing?: number;
        showLines?: boolean;
        lineColor?: number;
        lineWidth?: number;
        damping?: number;
        opacity?: number;
      }) => {
        destroy: () => void;
      };
    };
  }
}

export {}; 