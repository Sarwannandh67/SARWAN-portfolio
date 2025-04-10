// This file contains type declarations for modules used in the About section

declare module 'react' {
  export type ReactNode = React.ReactNode;
}

declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';
  
  export const Code: ComponentType<SVGProps<SVGSVGElement>>;
  export const Monitor: ComponentType<SVGProps<SVGSVGElement>>;
  export const Server: ComponentType<SVGProps<SVGSVGElement>>;
}

// Add NodeJS namespace if it's missing
declare namespace NodeJS {
  interface Timeout {}
} 