// This file contains type declarations for modules that don't have their own type definitions

declare module 'react' {
  export * from 'react';
  export const useCallback: <T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>) => T;
  export const useMemo: <T>(factory: () => T, deps: ReadonlyArray<any>) => T;
  export interface MouseEvent<T = Element> extends SyntheticEvent<T> {}
}

declare module 'react/jsx-runtime' {
  export * from 'react/jsx-runtime';
}

declare module 'react-router-dom' {
  export * from 'react-router-dom';
}

declare module '@tanstack/react-query' {
  export * from '@tanstack/react-query';
}

declare module 'lucide-react' {
  import { LucideIcon } from 'lucide-react';
  
  export const ChevronDown: LucideIcon;
  export const User: LucideIcon;
  export const User2: LucideIcon;
  export const UserCircle: LucideIcon;
  export const UserCircle2: LucideIcon;
  export const Briefcase: LucideIcon;
  export const BriefcaseIcon: LucideIcon;
  export const Mail: LucideIcon;
  export const MailIcon: LucideIcon;
  export const Code: LucideIcon;
  export const Code2: LucideIcon;
  export const CodeIcon: LucideIcon;
  export const Menu: LucideIcon;
  export const MenuIcon: LucideIcon;
  export const X: LucideIcon;
  export const XIcon: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const LightbulbIcon: LucideIcon;
  export const BookOpen: LucideIcon;
  export const BookOpenIcon: LucideIcon;
  
  export interface LucideIcon {
    (props: any): JSX.Element;
    displayName?: string;
  }
}

declare module '@lottiefiles/react-lottie-player' {
  export * from '@lottiefiles/react-lottie-player';
}

declare module 'embla-carousel-react' {
  export * from 'embla-carousel-react';
}

declare module 'react-tsparticles' {
  export * from 'react-tsparticles';
}

declare module 'tsparticles' {
  export * from 'tsparticles';
}

declare module 'tsparticles-engine' {
  export * from 'tsparticles-engine';
}

declare module '@radix-ui/react-slot' {
  export * from '@radix-ui/react-slot';
}

declare module 'class-variance-authority' {
  export type VariantProps<T extends (...args: any) => any> = {
    [K in keyof Parameters<T>[0]]: Parameters<T>[0][K]
  }
  export function cva(...args: any[]): any
}

declare module './button' {
  import { HTMLAttributes } from 'react';
  
  type ButtonBaseProps = {
    asChild?: boolean;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
    children?: React.ReactNode;
  };

  type ButtonProps = ButtonBaseProps & Omit<HTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;
  
  export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
}

// Add NodeJS namespace if it's missing
declare namespace NodeJS {
  interface Timeout {}
} 