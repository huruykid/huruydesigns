import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBubble from "./ChatBubble";

/**
 * Site chrome. Mounted once in App around all routes so the navbar, footer and
 * chat panel survive navigation. Pages render into the Outlet.
 */
const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-accent-foreground focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main-content" className="flex-1 pt-16">
      <Outlet />
    </main>
    <Footer />
    <ChatBubble />
  </div>
);

export default Layout;
