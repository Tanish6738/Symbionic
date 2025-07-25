import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAutoHidden, setIsAutoHidden] = useState(false);
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.navbar-logo, .nav-item, .navbar-cta', {
      duration: 1,
      opacity: 0,
      y: -50,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: container });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const scrollThreshold = 50;
      const hideThreshold = 100;

      setIsScrolled(currentScrollY > scrollThreshold);

      if (currentScrollY > hideThreshold) {
        if (currentScrollY > lastScrollY && !isNavbarHidden) {
          setIsAutoHidden(true);
        } else if (currentScrollY < lastScrollY && isAutoHidden) {
          setIsAutoHidden(false);
        }
      } else {
        setIsAutoHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isNavbarHidden, isAutoHidden]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleNavbar = () => {
    setIsNavbarHidden(!isNavbarHidden);
    if (isNavbarHidden) {
      setIsAutoHidden(false);
    }
  };

  const showNavbar = () => {
    setIsNavbarHidden(false);
    setIsAutoHidden(false);
  };

  const handleRedirect = () => {
    window.location.href = '/Login';
  };

  const shouldHideNavbar = isNavbarHidden || isAutoHidden;

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'product', label: 'Product' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${shouldHideNavbar ? 'hidden' : ''}`} ref={container}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <span className="logo-text">Symbionic</span>
          </div>

          {/* Navigation Links and Mobile CTA */}
          <ul className={`navbar-nav ${isMobileMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.id} className="nav-item">
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.label}
                </button>
              </li>
            ))}

            {/* CTA inside mobile menu */}
            {isMobileMenuOpen && (
              <li className="nav-item mobile-cta">
                <button className="cta-button" onClick={handleRedirect}>
                  Get Started
                </button>
              </li>
            )}
          </ul>

          {/* CTA for desktop */}
          {!isMobileMenuOpen && (
            <div className="navbar-cta">
              <button className="cta-button" onClick={handleRedirect}>
                Get Started
              </button>
            </div>
          )}

          {/* Hide Navbar Button */}
          <button
            className="navbar-hide-button"
            onClick={toggleNavbar}
            title="Hide Navigation"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Show Navbar Toggle Button */}
      <button
        className={`navbar-toggle-button ${shouldHideNavbar ? 'show' : 'hide'}`}
        onClick={showNavbar}
        title="Show Navigation"
      >
        <ChevronRight size={20} />
      </button>
    </>
  );
};

export default Navbar;
