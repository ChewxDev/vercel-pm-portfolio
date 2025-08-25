import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
    } border-b border-gray-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Nicholas Njoku Logo" 
                className="h-10 w-10 mr-3 cursor-pointer"
                data-testid="logo-image"
              />
              <h1 className="text-xl font-bold text-gray-900 cursor-pointer" data-testid="logo">
                Nicholas Njoku
              </h1>
            </Link>
            <span className="ml-3 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
              Certified PM
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("overview")}
                className="text-neutral hover:text-primary transition-colors"
                data-testid="nav-overview"
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-neutral hover:text-primary transition-colors"
                data-testid="nav-projects"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("methodology")}
                className="text-neutral hover:text-primary transition-colors"
                data-testid="nav-methodology"
              >
                Methodology
              </button>
              <button
                onClick={() => scrollToSection("resources")}
                className="text-neutral hover:text-primary transition-colors"
                data-testid="nav-resources"
              >
                Resources
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                data-testid="nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-neutral hover:text-primary" 
              data-testid="mobile-menu-btn"
              aria-label="Toggle mobile menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl transition-transform duration-200`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            <button
              onClick={() => scrollToSection("overview")}
              className="block px-3 py-2 text-neutral hover:text-primary hover:bg-gray-50 transition-colors w-full text-left"
              data-testid="mobile-nav-overview"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block px-3 py-2 text-neutral hover:text-primary hover:bg-gray-50 transition-colors w-full text-left"
              data-testid="mobile-nav-projects"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("methodology")}
              className="block px-3 py-2 text-neutral hover:text-primary hover:bg-gray-50 transition-colors w-full text-left"
              data-testid="mobile-nav-methodology"
            >
              Methodology
            </button>
            <button
              onClick={() => scrollToSection("resources")}
              className="block px-3 py-2 text-neutral hover:text-primary hover:bg-gray-50 transition-colors w-full text-left"
              data-testid="mobile-nav-resources"
            >
              Resources
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block px-3 py-2 bg-primary text-white hover:bg-blue-700 transition-colors w-full text-left rounded-md mx-3 mt-3"
              data-testid="mobile-nav-contact"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
