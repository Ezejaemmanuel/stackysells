// types/layout.ts
import { ReactNode } from "react";

const MobileNav = dynamic(() => import("./_components/mobile-nav"));

import dynamic from "next/dynamic";

const Navigation = dynamic(() => import("./_components/navigation"));

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="">
      <Navigation />
      <main className="ml-20 mt-10">{children}</main>
      <MobileNav />
    </div>
  );
};

export default Layout;
