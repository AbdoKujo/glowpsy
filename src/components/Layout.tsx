import { ReactNode } from "react";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import SkipLink from "./SkipLink";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";
import Navbar from "./Navbar";
import { useAnimatedBackground } from "@/hooks/useAnimatedBackground";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Enable animated background
  useAnimatedBackground();

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <SmoothScroll />
      <ScrollProgress />
      <SkipLink />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
