import React, { useState, useEffect } from "react";
import { AnkletLogo } from "./AnkletLogo";
import { Menu, X, CalendarDays } from "lucide-react";
import { motion } from "motion/react";

interface NavbarProps {
  activeView?: string;
  setActiveView?: (view: string) => void;
  setContactTab?: (tab: "quote" | "consult") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView = "home", setActiveView, setContactTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Services", href: "services" },
    { name: "Projects", href: "projects" },
    { name: "Why ANKLET", href: "why-choose-anklet" },
    { name: "Process", href: "process" },
    { name: "Testimonials", href: "testimonials" },
    { name: "Contact", href: "contact" },
  ];

  const handleNavClick = (viewId: string) => {
    setMobileMenuOpen(false);
    
    // Default contact page clicks to the Quote tab unless overridden
    if (viewId === "contact" && setContactTab) {
      setContactTab("quote");
    }

    if (setActiveView) {
      setActiveView(viewId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(viewId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-1 border-b border-gray-100 dark:border-slate-800"
            : "bg-transparent py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? "h-14 lg:h-16" : "h-18 lg:h-22"
          }`}>
            {/* Logo - blends perfectly without white canvas */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("home");
              }}
              className="flex items-center"
              id="nav-logo-link"
            >
              <AnkletLogo
                height={isScrolled ? 44 : 54}
                showText={true}
                lightText={!isScrolled} // Light text when transparent background (hero or subpage header are both dark)
                className="transform hover:scale-105 transition-transform duration-200"
              />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => {
                const isActive = activeView === link.href;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-xs xl:text-sm font-bold tracking-wider transition-colors duration-200 cursor-pointer relative py-2 ${
                      isActive
                        ? "text-brand-orange"
                        : isScrolled
                        ? "text-gray-700 hover:text-brand-orange dark:text-gray-300 dark:hover:text-brand-orange"
                        : "text-white/90 hover:text-brand-orange drop-shadow-sm"
                    }`}
                    id={`nav-link-${link.name.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center ml-4 xl:ml-6">
              <button
                onClick={() => {
                  if (setContactTab) setContactTab("consult");
                  if (setActiveView) {
                    setActiveView("contact");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="flex items-center gap-1.5 bg-brand-orange text-white px-3 py-2 xl:px-5 xl:py-2.5 rounded-full text-[10px] xl:text-xs font-black tracking-widest uppercase shadow-lg shadow-orange-500/20 hover:bg-orange-600 hover:shadow-orange-500/30 active:scale-95 transition-all duration-200 cursor-pointer"
                id="nav-consultation-btn"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                Free Consultation
              </button>
            </div>

            {/* Mobile Hamburger menu */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md ${
                  isScrolled
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-white"
                } focus:outline-none`}
                aria-label="Toggle navigation menu"
                id="nav-mobile-hamburger"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          } bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-xl`}
          id="nav-mobile-menu"
        >
          <div className="px-4 pt-4 pb-6 space-y-3 sm:px-3">
            {navLinks.map((link) => {
              const isActive = activeView === link.href;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`block w-full text-left px-3 py-3 rounded-md text-base font-semibold transition-colors ${
                    isActive
                      ? "text-brand-orange bg-orange-500/5 dark:bg-orange-500/10"
                      : "text-gray-800 hover:text-brand-orange hover:bg-gray-50 dark:text-gray-200 dark:hover:text-brand-orange dark:hover:bg-slate-800/50"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
              <button
                onClick={() => {
                  if (setContactTab) setContactTab("consult");
                  handleNavClick("contact");
                }}
                className="flex w-full items-center justify-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-xl text-sm font-bold tracking-wider uppercase shadow-md hover:bg-orange-600 transition-all duration-200"
              >
                <CalendarDays className="w-5 h-5" />
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
