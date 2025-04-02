
import { ReactNode } from "react";
import FloatingNav from "../Navigation/FloatingNav";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="bg-pattern" />
      <div className="bg-gradient-overlay" />
      <Header />
      <FloatingNav />
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default Layout;
