import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Importing icons

const links = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Programs", href: "/programs" },
//   { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function NavLinks() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const logoSize = windowWidth < 640 ? 50 : 80;

  return (
    <nav className="flex justify-between items-center sm:px-4 sm:py-2 fixed w-full top-0 z-50 bg-white shadow-md">
      <Link to="/" className="logo">
        <img src="/BBC LOGO.png" alt="My Logo" width={logoSize} height={logoSize} />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4 font-Montserrat">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`px-4 py-2 text-h6 hover:text-[#be9611] hover:scale-110 rounded-md ${
              currentPath === link.href ? "text-[#be9611] font-bold" : "text-[#071125] font-medium"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 rounded-md focus:outline-none">
        <Menu size={32} />
      </button>

      {/* Mobile Sliding Menu */}
      <motion.div
        ref={menuRef}
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center text-black"
      >
        <button onClick={() => setMenuOpen(false)} className="absolute top-3 right-3">
          <X size={40} className="text-black" />
        </button>

        <div className="space-y-6 text-center flex flex-col justify-center">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-xl font-semibold hover:text-[#be9611] transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}