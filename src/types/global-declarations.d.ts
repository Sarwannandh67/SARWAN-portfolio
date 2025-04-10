// This file contains global type declarations for the project

// React declarations
declare module 'react' {
  export type ReactNode = React.ReactNode;
  export function useRef<T>(initialValue: T): { current: T };
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;
  export function createContext<T>(defaultValue: T): ReactContext<T>;
  export function useContext<T>(context: ReactContext<T>): T;
  export function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): React.ForwardRefExoticComponent<P & { ref?: React.Ref<T> }>;
  
  export interface ForwardRefExoticComponent<P> extends React.ForwardRefRenderFunction<any, P> {
    displayName?: string;
  }
  
  export interface ForwardRefRenderFunction<T, P> {
    (props: P, ref: React.Ref<T>): React.ReactElement | null;
  }
  
  export type ElementRef<T extends React.ComponentType<any>> = T extends React.ComponentType<infer P> ? P extends { ref?: infer R } ? R : never : never;
  
  export type ComponentPropsWithoutRef<T extends React.ElementType> = Omit<React.ComponentProps<T>, 'ref'>;
  
  // Add HTMLAttributes type
  export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    className?: string;
    id?: string;
    style?: CSSProperties;
    [key: string]: any;
  }
  
  export interface AriaAttributes {
    [key: string]: any;
  }
  
  export interface DOMAttributes<T> {
    children?: ReactNode;
    dangerouslySetInnerHTML?: {
      __html: string;
    };
    [key: string]: any;
  }
  
  export interface CSSProperties {
    [key: string]: any;
  }
  
  export interface ReactContext<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string;
  }
  
  export interface Provider<T> {
    (props: { value: T; children: ReactNode }): ReactElement | null;
  }
  
  export interface Consumer<T> {
    (props: { children: (value: T) => ReactNode }): ReactElement | null;
  }
}

// React JSX Runtime
declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

// Lucide React declarations
declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';
  
  export const Code: ComponentType<SVGProps<SVGSVGElement>>;
  export const Terminal: ComponentType<SVGProps<SVGSVGElement>>;
  export const Monitor: ComponentType<SVGProps<SVGSVGElement>>;
  export const Server: ComponentType<SVGProps<SVGSVGElement>>;
  export const ChevronLeft: ComponentType<SVGProps<SVGSVGElement>>;
  export const ChevronRight: ComponentType<SVGProps<SVGSVGElement>>;
  export const Download: ComponentType<SVGProps<SVGSVGElement>>;
  export const ArrowDown: ComponentType<SVGProps<SVGSVGElement>>;
}

// React Router DOM declarations
declare module 'react-router-dom' {
  export const BrowserRouter: any;
  export const Routes: any;
  export const Route: any;
  export const Link: any;
  export const useNavigate: any;
  export const useLocation: any;
}

// Lottie Player declarations
declare module '@lottiefiles/react-lottie-player' {
  export const Player: any;
}

// Embla Carousel declarations
declare module 'embla-carousel-react' {
  export function useEmblaCarousel(options?: any): [any, any];
}

// TSParticles declarations
declare module 'react-tsparticles' {
  export const Particles: any;
  export function loadFull(engine: any): Promise<void>;
}

declare module 'tsparticles' {
  export const tsParticles: any;
}

declare module 'tsparticles-engine' {
  export interface Engine {
    load: (options: any) => Promise<void>;
  }
}

// Radix UI declarations
declare module '@radix-ui/react-slot' {
  export const Slot: any;
}

// Class Variance Authority declarations
declare module 'class-variance-authority' {
  export function cva(base: string, config?: any): any;
}

// NodeJS namespace
declare namespace NodeJS {
  interface Timeout {}
}

// D3 declarations
declare module 'd3-array' {}
declare module 'd3-color' {}
declare module 'd3-ease' {}
declare module 'd3-interpolate' {}
declare module 'd3-path' {}
declare module 'd3-scale' {}
declare module 'd3-shape' {}
declare module 'd3-time' {}
declare module 'd3-timer' {}

// ESTree declarations
declare module 'estree' {}

// Add declarations for THREE and VANTA
declare global {
  interface Window {
    THREE?: any;
    VANTA?: {
      NET: (config: any) => any;
      [key: string]: any;
    };
  }
}

declare module "@tanstack/react-query" {
  export class QueryClient {
    constructor(options?: QueryClientOptions);
  }
  
  export interface QueryClientOptions {
    defaultOptions?: {
      queries?: QueryOptions;
      mutations?: MutationOptions;
    };
  }
  
  export interface QueryOptions {
    staleTime?: number;
    cacheTime?: number;
    retry?: boolean | number;
    refetchOnWindowFocus?: boolean;
  }
  
  export interface MutationOptions {
    retry?: boolean | number;
  }
  
  export function QueryClientProvider(props: { 
    client: QueryClient; 
    children: ReactNode;
  }): ReactElement;
} 