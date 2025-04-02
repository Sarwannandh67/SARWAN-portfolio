
import { ReactNode } from "react";
import FloatingNav from "../Navigation/FloatingNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="animated-bg" />
      <FloatingNav />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
